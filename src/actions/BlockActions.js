/* eslint-disable no-underscore-dangle,camelcase */
import BN from 'bignumber.js';
import moment from 'moment';
import { Map } from 'immutable';
import _ from 'lodash';

import echo, { OPERATIONS_IDS } from 'echojs-lib';

import RoundReducer from '../reducers/RoundReducer';
import BlockReducer from '../reducers/BlockReducer';

import {
	MAX_AVERAGE_TRS_BLOCKS,
	START_AVERAGE_TRS_BLOCKS,
	PAGE_BLOCKS_COUNT,
	PAGE_ADD_BLOCKS_COUNT,
} from '../constants/GlobalConstants';

import Operations from '../constants/Operations';

import FormatHelper from '../helpers/FormatHelper';

const formatOperation = async (data, round) => {
	const [type, operation] = data;
	const feeAsset = await echo.api.getObject(operation.fee.asset_id);

	const { name, options } = Object.values(Operations).find((i) => i.value === type);
	const result = {
		fee: {
			amount: operation.fee.amount,
			precision: feeAsset.precision,
			symbol: feeAsset.symbol,
		},
		name,
		value: {},
		status: true,
	};

	if (options.from) {

		if (Array.isArray(options.from)) {
			if (options.from[1]) {
				const request = _.get(operation, options.from[0]);
				const response = await echo.api.getObject(request);
				result.subject = response[options.from[1]];
			} else {
				result.from = operation[options.from[0]];
			}
		} else {
			const request = _.get(operation, options.from);
			const response = await echo.api.getObject(request);
			result.from = response ? response.name : options.from;
		}
	}

	if (options.subject) {
		if (options.subject[1]) {
			const request = _.get(operation, options.subject[0]);
			const response = await echo.api.getObject(request);
			result.subject = response[options.subject[1]];
		} else {
			result.subject = operation[options.subject[0]];
		}
	}

	if (options.value) {
		result.value = {
			...result.value,
			amount: _.get(operation, options.value),
		};
	}

	if (options.asset) {
		const request = _.get(operation, options.asset);
		const response = await echo.api.getObject(request);
		result.value = {
			...result.value,
			precision: response.precision,
			symbol: response.symbol,
		};
	}

	if (
		type === OPERATIONS_IDS.CREATE_CONTRACT ||
			type === OPERATIONS_IDS.CALL_CONTRACT ||
			type === OPERATIONS_IDS.CONTRACT_TRANSFER
	) {
		result.status = true;
	}

	if (type === OPERATIONS_IDS.CALL_CONTRACT && round) {
		const contractHistory = await echo.api.getContractHistory(result.subject);
		const internalTransactions = contractHistory
			.filter(({ block_num }) => block_num === round)
			.map(({ op }) => formatOperation(op));

		result.internal = await Promise.all(internalTransactions);
	}

	// if (type === 0 && operation.memo && operation.memo.message) {
	// 	result.memo = operation.memo;
	// }

	// if (operation.code) {
	// 	result.bytecode = operation.code;
	// }

	{ return result; }
};

export const getBlockInformation = (round) => async (dispatch, getState) => {
	try {
		const planeBlock = await echo.api.getBlock(round);

		if (!planeBlock) {
			return;
			// redirect 404
		}

		const handledBlock = getState().block.getIn(['blocks', round]);

		const value = {};

		if (handledBlock) {
			value.producer = handledBlock.get('producer');
			value.reward = `${handledBlock.get('reward')} ${handledBlock.get('rewardCurrency')}`;
			value.size = `${FormatHelper.formatBlockSize(handledBlock.get('weight'))}
			 ${FormatHelper.formatByteSize(handledBlock.get('weight'))}`;
			value.blockNumber = handledBlock.get('blockNumber');
		} else {
			value.producer = (await echo.api.getObject(planeBlock.account)).name;
			value.reward = '10 ECHO';
			const weight = JSON.stringify(planeBlock).length;
			value.size = `${FormatHelper.formatBlockSize(weight)} ${FormatHelper.formatByteSize(weight)}`;
			value.blockNumber = FormatHelper.formatAmount(planeBlock.round, 0);
		}

		const verifiersIds = planeBlock.cert._signatures.map(({ _signer }) => `1.2.${_signer}`);

		const verifiers = await echo.api.getAccounts(verifiersIds);
		const planeOperations = planeBlock.transactions
			.reduce((acum, { operations }) => { acum.push(...operations); return acum; }, []);

		let operations = [];
		if (planeOperations.length !== 0) {
			const promiseOperations = planeOperations.map((op) => formatOperation(op, planeBlock.round));
			operations = await Promise.all(promiseOperations);
		}
		value.operations = operations;
		value.verifiers = verifiers.map(({ name }) => name);
		value.round = planeBlock.round;
		value.time = FormatHelper.timestampToBlockInformationTime(planeBlock.timestamp);

		dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map(value) }));

	} catch (error) {
		dispatch(BlockReducer.actions.set({ field: 'error', value: FormatHelper.formatError(error) }));
	}
};

export const clearBlockInformation = () => (dispatch) => {
	dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map({}) }));
};

export const setLatestBlock = () => (dispatch, getState) => {
	const prepBlock = getState().round.get('preparingBlock');

	if (!prepBlock) {
		return false;
	}

	dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: prepBlock }));

	return true;
};

export const updateAverageTransactions = (lastBlock, startBlock) => async (dispatch, getState) => {
	let transactions = getState().round.get('averageTransactions');
	const averageTransactions = transactions.get('transactions');
	const averageOperations = transactions.get('operations');

	const latestBlock = lastBlock || getState().round.get('latestBlock');

	let blocks = [];

	try {
		for (let i = startBlock || transactions.get('block') + 1; i <= latestBlock; i += 1) {
			blocks.push(echo.api.wsApi.database.getBlock(i));
		}

		blocks = await Promise.all(blocks);

		let trLengths = averageTransactions.get('lengthsList');
		let opLengths = averageOperations.get('lengthsList');
		let unixTimestamps = transactions.get('unixTimestamps');

		const sumResults = blocks
			.reduce(({ sum, sumOps }, block) => {
				trLengths = trLengths.push(block.transactions.length);

				const opLength = block.transactions.reduce((sumOper, tr) => sumOper.plus(tr.operations.length), new BN(0));
				opLengths = opLengths.push(opLength);

				unixTimestamps = unixTimestamps.push(moment(block.timestamp).unix());

				return ({
					sum: sum.plus(block.transactions.length),
					sumOps: sumOps.plus(opLength),
				});
			}, { sum: new BN(averageTransactions.get('sum')), sumOps: new BN(averageOperations.get('sum')) });


		if (trLengths.size > MAX_AVERAGE_TRS_BLOCKS) {
			sumResults.sum = sumResults.sum.minus(trLengths.get(0));
			trLengths = trLengths.shift();

			sumResults.sumOps = sumResults.sumOps.minus(opLengths.get(0));
			opLengths = opLengths.shift();

			unixTimestamps = unixTimestamps.shift();
		}

		let sumUnix = 0;

		for (let i = 0; i < unixTimestamps.size; i += 1) {
			if (!unixTimestamps.get(i + 1)) {
				break;
			}

			sumUnix += (unixTimestamps.get(i + 1) - unixTimestamps.get(i));
		}

		const averageTime = new BN(sumUnix).div(trLengths.size);

		if (Math.sign(averageTime.toNumber()) > 0) {
			transactions = transactions.set('averageTime', sumUnix / trLengths.size);
		}

		transactions = transactions
			.setIn(['transactions', 'value'], sumResults.sum.div(trLengths.size).toString())
			.setIn(['transactions', 'sum'], sumResults.sum.toString())
			.setIn(['transactions', 'lengthsList'], trLengths)
			.setIn(['operations', 'value'], sumResults.sumOps.div(trLengths.size).toString())
			.setIn(['operations', 'sum'], sumResults.sumOps.toString())
			.setIn(['operations', 'lengthsList'], opLengths)
			.set('count', trLengths.size)
			.set('block', latestBlock)
			.set('unixTimestamps', unixTimestamps);


		dispatch(RoundReducer.actions.set({
			field: 'averageTransactions',
			value: transactions,
		}));
	} catch (err) {
		dispatch(RoundReducer.actions.set({ field: 'error', value: FormatHelper.formatError(err) }));
	}
};

export const updateBlockList = (lastBlock, startBlock) => async (dispatch, getState) => {
	let blocks = getState().block.get('blocks');
	const latestBlock = lastBlock || getState().round.get('latestBlock');
	const maxBlocks = getState().block.get('blocksCount');

	const [...keys] = blocks.keys();
	const startedBlock = startBlock || Math.max(...keys);

	let blocksResult = [];

	for (let i = startedBlock + 1; i <= latestBlock; i += 1) {
		blocksResult.push(echo.api.getBlock(i));
	}

	blocksResult = await Promise.all(blocksResult);

	const accountIds = blocksResult.reduce((accounts, block, index) => {
		accounts[index] = block.account;
		return accounts;
	}, []);

	const accounts = await echo.api.getAccounts(accountIds);

	if (blocksResult.length && blocks.size >= maxBlocks) {
		blocks = blocks.withMutations((mapBlocks) => {
			for (let i = 0; i < blocksResult.length; i += 1) {
				const minBlockNum = Math.min(...keys);

				mapBlocks.delete(minBlockNum);

				keys.splice(keys.indexOf(minBlockNum), 1);
			}
		});
	}

	blocks = blocks.withMutations((mapBlocks) => {
		for (let i = 0; i < blocksResult.length; i += 1) {
			const blockNumber = blocksResult[i].round;
			mapBlocks
				.setIn([blockNumber, 'time'], moment.utc(blocksResult[i].timestamp).local().format('hh:mm:ss'))
				.setIn([blockNumber, 'producer'], accounts[i].name)
				.setIn([blockNumber, 'reward'], 0)
				.setIn([blockNumber, 'rewardCurrency'], 'ECHO')
				.setIn([blockNumber, 'weight'], JSON.stringify(blocksResult[i]).length)
				.setIn([blockNumber, 'weightSize'], 'bytes')
				.setIn([blockNumber, 'transactions'], blocksResult[i].transactions.length);
		}
	});

	dispatch(BlockReducer.actions.set({
		field: 'blocks',
		value: blocks,
	}));
};

export const initBlocks = () => async (dispatch) => {
	const obj = await echo.api.wsApi.database.getObjects(['2.1.0']);

	if (obj && obj[0]) {
		dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: obj[0].head_block_number }));
	}

	const startBlockAverage = obj[0].head_block_number - START_AVERAGE_TRS_BLOCKS;

	await dispatch(updateAverageTransactions(obj[0].head_block_number, startBlockAverage));

	const startBlockList = obj[0].head_block_number - PAGE_BLOCKS_COUNT;

	await dispatch(updateBlockList(obj[0].head_block_number, startBlockList));
};

export const setMaxDisplayedBlocks = () => async (dispatch, getState) => {
	const maxBlocks = getState().block.get('blocksCount');

	dispatch(BlockReducer.actions.set({
		field: 'blocksCount',
		value: maxBlocks + PAGE_ADD_BLOCKS_COUNT,
	}));

	const [...keys] = getState().block.get('blocks').keys();
	const startedBlock = Math.min(...keys) - PAGE_ADD_BLOCKS_COUNT;

	dispatch(BlockReducer.actions.set({ field: 'loading', value: true }));

	await dispatch(updateBlockList(0, startedBlock));

	dispatch(BlockReducer.actions.set({ field: 'loading', value: false }));
};

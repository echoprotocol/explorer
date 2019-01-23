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
	MAX_BLOCK_REQUESTS,
	ERC20_HASHES,
	DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES,
} from '../constants/GlobalConstants';

import Operations from '../constants/Operations';
import {
	ACCOUNT_OBJECT_PREFIX,
	CONTRACT_OBJECT_PREFIX,
} from '../constants/ObjectPrefixesConstants';

import { NOT_FOUND_PATH } from '../constants/RouterConstants';

import history from '../history';

import FormatHelper from '../helpers/FormatHelper';
import TypesHelper from '../helpers/TypesHelper';

/**
 *
 * @param {Object} log
 * @param {Object} data
 * @param {String} symbol
 * @returns {Promise.<{from: {id: string}, subject: {id: string}, value: {amount: string, symbol: string}, label: string}>}
 */
const _parseTransferEvent = async ({ log, data }, symbol = '', precision = 0) => {
	const [, hexFrom, hexTo] = log;
	const value = { amount: new BN(data, 16).toString(10), symbol, precision };
	const fromInt = parseInt(hexFrom.slice(26), 16);
	const toInt = parseInt(hexTo.slice(26), 16);

	let from = { id: `${CONTRACT_OBJECT_PREFIX}.${fromInt}` };
	let to = { id: `${CONTRACT_OBJECT_PREFIX}.${toInt}` };

	if (hexFrom[25] === 0) {
		const id = `${ACCOUNT_OBJECT_PREFIX}.${fromInt}`;
		const { name } = (await echo.api.getObject(id));
		from = { id, name };
	}

	if (hexTo[25] === 0) {
		const id = `${ACCOUNT_OBJECT_PREFIX}.${toInt}`;
		const { name } = (await echo.api.getObject(id));
		to = { id, name };
	}

	return {
		from, subject: to, value, label: 'ERC 20 Token transfer',
	};
};

/**
 *
 * @param {Array} data
 * @param {Number} round
 * @param {Array} operationResult
 * @returns {Promise.<{type: *, fee: {amount, precision, symbol}, from: {id: string}, subject: {id: string}, name, value: {}, status: boolean}>}
 */
export const formatOperation = async (data, round = undefined, operationResult = []) => {
	const [type, operation] = data;
	const [, resId] = operationResult;
	const feeAsset = await echo.api.getObject(operation.fee.asset_id);

	const { name, options } = Object.values(Operations).find((i) => i.value === type);
	const result = {
		type,
		fee: {
			amount: operation.fee.amount,
			precision: feeAsset.precision,
			symbol: feeAsset.symbol,
		},
		from: {
			id: '',
		},
		subject: {
			id: '',
		},
		name,
		value: {},
		status: true,
		round,
	};

	if (options.from) {

		if (Array.isArray(options.from)) {
			if (options.from[1]) {
				const request = _.get(operation, options.from[0]);
				const response = await echo.api.getObject(request);
				result.from = { id: request, name: response[options.from[1]] };
			} else {
				result.from = { id: operation[options.from[0]] };
			}
		} else {
			const request = _.get(operation, options.from);
			const response = await echo.api.getObject(request);

			result.from = { id: request };
			if (response) {
				result.from.name = response.name;
			}
		}
	}


	if (options.subject) {
		if (options.subject[1]) {
			const request = _.get(operation, options.subject[0]);
			const response = await echo.api.getObject(request);
			result.subject = { id: request, name: response[options.subject[1]] };
		} else {
			result.subject = { id: operation[options.subject[0]] };
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

	if (type === OPERATIONS_IDS.CREATE_CONTRACT || type === OPERATIONS_IDS.CALL_CONTRACT) {

		const contractResult = await echo.api.getContractResult(resId);
		const [, { exec_res: { excepted }, tr_receipt: { log } }] = contractResult;
		result.status = excepted === 'None';

		if (type === OPERATIONS_IDS.CALL_CONTRACT && round) {

			const contractHistory = await echo.api.getContractHistory(result.subject.id);
			let internalOperations = contractHistory
				.filter(({ block_num }) => block_num === round)
				.map(({ op }) => formatOperation(op));

			internalOperations = await Promise.all(internalOperations);
			internalOperations = internalOperations.map((op) => { op.label = 'Subtransfer'; return op; });
			let internalTransactions = internalOperations;
			const [, { code }] = await echo.api.getContract(result.subject.id);

			if (log && Array.isArray(log) && TypesHelper.isErc20Contract(code)) {

				const symbol = FormatHelper
					.toUtf8((await echo.api.callContractNoChangingState(result.subject.id, '1.2.12', '1.3.0', ERC20_HASHES['symbol()'])).slice(128));
				const precision = parseInt(await echo.api.callContractNoChangingState(result.subject.id, '1.2.16', '1.3.0', ERC20_HASHES['decimals()']), 16);

				let internalTransfers = log
					.filter(({ address }) => `${CONTRACT_OBJECT_PREFIX}.${parseInt(address.slice(2), 16)}` === result.subject.id)
					// eslint-disable-next-line no-shadow
					.filter(({ log }) => log[0].indexOf(ERC20_HASHES['Transfer(address,address,uint256)']) === 0)
					.map((event) => _parseTransferEvent(event, symbol, precision));

				internalTransfers = await Promise.all(internalTransfers);
				internalTransactions = [...internalTransactions, ...internalTransfers];
			}

			result.internal = internalTransactions;
		}
	}

	// if (type === 0 && operation.memo && operation.memo.message) {
	// 	result.memo = operation.memo;
	// }

	// if (operation.code) {
	// 	result.bytecode = operation.code;
	// }

	return result;
};

/**
 *
 * @param {Number} round
 */
export const getBlockInformation = (round) => async (dispatch, getState) => {
	try {
		const planeBlock = await echo.api.getBlock(round);
		if (!planeBlock) {
			history.push(NOT_FOUND_PATH);
			return;
		}

		const handledBlock = getState().block.getIn(['blocks', round]);

		const value = {};

		if (handledBlock) {
			value.reward = `${handledBlock.get('reward')} ${handledBlock.get('rewardCurrency')}`;
			value.size = `${FormatHelper.formatBlockSize(handledBlock.get('weight'))}
			 ${FormatHelper.formatByteSize(handledBlock.get('weight'))}`;
			value.blockNumber = handledBlock.get('blockNumber');
		} else {
			value.reward = '0 ECHO';
			const weight = JSON.stringify(planeBlock).length;
			value.size = `${FormatHelper.formatBlockSize(weight)} ${FormatHelper.formatByteSize(weight)}`;
			value.blockNumber = FormatHelper.formatAmount(planeBlock.round, 0);
		}
		const producer = await echo.api.getObject(planeBlock.account);
		value.producer = { id: producer.id, name: producer.name };

		const verifiersIds = planeBlock.cert._signatures.map(({ _signer }) => `${ACCOUNT_OBJECT_PREFIX}.${_signer}`);

		const verifiers = await echo.api.getAccounts(verifiersIds);
		const { transactions } = planeBlock;

		let resultTransactions = [];
		if (transactions.length !== 0) {

			const promiseTransactions = transactions
				.map(({ operations, operation_results }) =>
					Promise.all(operations.map((op, i) =>
						formatOperation(op, planeBlock.round, operation_results[i]))));
			resultTransactions = await Promise.all(promiseTransactions);
		}

		value.transactions = resultTransactions;
		value.verifiers = verifiers.map(({ name, id }) => ({ id, name }));
		value.round = planeBlock.round;
		value.time = FormatHelper.timestampToBlockInformationTime(planeBlock.timestamp);

		dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map(value) }));
	} catch (error) {
		dispatch(BlockReducer.actions.set({ field: 'error', value: FormatHelper.formatError(error) }));
		history.push(NOT_FOUND_PATH);
	}
};

export const clearBlockInformation = () => (dispatch) => {
	dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map({}) }));
};

/**
 *  @method setLatestBlock
 *
 * 	Set latest block from blockchain to redux store
 */
export const setLatestBlock = () => (dispatch, getState) => {
	const prepBlock = getState().round.get('preparingBlock');

	if (!prepBlock) {
		return false;
	}

	dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: prepBlock }));

	return true;
};

/**
 *  @method updateAverageTransactions
 *
 * 	Update latest block time, average transactions/operations and average block time
 *
 * 	@param {Number?} lastBlock
 * 	@param {Number?} startBlock
 */
export const updateAverageTransactions = (lastBlock, startBlock) => async (dispatch, getState) => {
	let transactions = getState().round.get('averageTransactions');
	const averageTransactions = transactions.get('transactions');
	const averageOperations = transactions.get('operations');

	const latestBlock = lastBlock || getState().round.get('latestBlock');

	let blocks = [];

	let startedBlock = startBlock || transactions.get('block') + 1;

	if ((getState().round.get('latestBlock') - transactions.get('block')) > MAX_BLOCK_REQUESTS) {
		startedBlock = getState().round.get('latestBlock') - MAX_BLOCK_REQUESTS;
	}

	try {
		for (let i = startedBlock; i <= latestBlock; i += 1) {
			blocks.push(echo.api.getBlock(i));
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

				const unixTimeStamp = moment(block.timestamp).unix();

				if (Math.sign(unixTimeStamp) > 0) {
					unixTimestamps = unixTimestamps.push(unixTimeStamp);
				}

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
			transactions = transactions.set('averageTime', parseFloat(averageTime.toFixed(3)));
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

/**
 *  @method updateBlockList
 *
 * 	Update list of blocks on the recent blocks page
 *
 * 	@param {Number?} lastBlock
 * 	@param {Number?} startBlock
 * 	@param {Boolean?} isLoadMore
 */
export const updateBlockList = (lastBlock, startBlock, isLoadMore) => async (dispatch, getState) => {
	let blocks = getState().block.get('blocks');
	let latestBlock = lastBlock || getState().round.get('latestBlock');


	const [...keys] = blocks.keys();
	let startedBlock = startBlock || Math.max(...keys);

	let blocksResult = [];

	if (isLoadMore) {
		startedBlock -= 1;
		latestBlock -= 1;
	}

	for (let i = startedBlock + 1; i <= latestBlock; i += 1) {
		blocksResult.push(echo.api.getBlock(i));
	}

	blocksResult = await Promise.all(blocksResult);

	const accountIds = blocksResult.reduce((accounts, block, index) => {
		if (block) {
			accounts[index] = block.account;
		}

		return accounts;
	}, []);

	const accounts = await echo.api.getAccounts(accountIds);

	blocks = getState().block.get('blocks');

	const maxBlocks = getState().block.get('blocksCount');

	blocks = blocks.withMutations((mapBlocks) => {
		for (let i = 0; i < blocksResult.length; i += 1) {
			const blockNumber = blocksResult[i].round;
			mapBlocks
				.setIn([blockNumber, 'time'], moment.utc(blocksResult[i].timestamp).format('HH:mm:ss'))
				.setIn([blockNumber, 'producer'], accounts[i].name)
				.setIn([blockNumber, 'producerId'], blocksResult[i].account)
				.setIn([blockNumber, 'reward'], 0)
				.setIn([blockNumber, 'rewardCurrency'], 'ECHO')
				.setIn([blockNumber, 'weight'], JSON.stringify(blocksResult[i]).length)
				.setIn([blockNumber, 'weightSize'], 'bytes')
				.setIn([blockNumber, 'transactions'], blocksResult[i].transactions.length);
		}
	});

	const lastBlockStorage = blocksResult[blocksResult.length - 1];

	if (lastBlockStorage) {
		localStorage.setItem('lastBlock', JSON.stringify({
			number: lastBlockStorage.round,
			timestamp: moment.utc(lastBlockStorage.timestamp).local().unix(),
		}));

		dispatch(BlockReducer.actions.set({
			field: 'startTimestamp',
			value: 0,
		}));
	}

	const blocksToRemove = blocks.size - maxBlocks;

	if (Math.sign(blocksToRemove) > 0) {
		blocks = blocks.withMutations((mapBlocks) => {
			for (let i = 0; i < blocksToRemove; i += 1) {
				const [...blocksKeys] = mapBlocks.keys();
				const minBlockNum = Math.min(...blocksKeys);

				mapBlocks.delete(minBlockNum);

				keys.splice(keys.indexOf(minBlockNum), 1);
			}
		});
	}

	dispatch(BlockReducer.actions.set({
		field: 'blocks',
		value: blocks,
	}));
};

/**
 *  @method initBlocks
 *
 * 	Initialize recent blocks and starting timestamp of latest block
 */
export const initBlocks = () => async (dispatch) => {
	const obj = await echo.api.getObjects([DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES]);

	if (obj && obj[0]) {
		dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: obj[0].head_block_number }));
	}

	const startBlockAverage = obj[0].head_block_number - START_AVERAGE_TRS_BLOCKS;

	await dispatch(updateAverageTransactions(obj[0].head_block_number, startBlockAverage));

	const startBlockList = obj[0].head_block_number - PAGE_BLOCKS_COUNT;

	await dispatch(updateBlockList(obj[0].head_block_number, startBlockList));

	const lastBlock = JSON.parse(localStorage.getItem('lastBlock'));

	const dateNowUnix = new BN(Date.now()).div(1000);

	dispatch(BlockReducer.actions.set({
		field: 'startTimestamp',
		value: parseInt(dateNowUnix.minus(lastBlock.timestamp).toFixed(0), 10),
	}));
};

/**
 *  @method setMaxDisplayedBlocks
 *
 * 	Set maximum number of displayed blocks
 */
export const setMaxDisplayedBlocks = () => async (dispatch, getState) => {
	if (!echo._ws._connected || !echo.subscriber.subscriptions.echorand || !echo.subscriber.subscriptions.block) {
		return false;
	}

	const maxBlocks = getState().block.get('blocksCount');

	dispatch(BlockReducer.actions.set({
		field: 'blocksCount',
		value: maxBlocks + PAGE_ADD_BLOCKS_COUNT,
	}));

	const [...keys] = getState().block.get('blocks').keys();
	const startedBlock = Math.min(...keys) - PAGE_ADD_BLOCKS_COUNT;

	dispatch(BlockReducer.actions.set({ field: 'loading', value: true }));

	await dispatch(updateBlockList(Math.min(...keys), startedBlock, true));

	dispatch(BlockReducer.actions.set({ field: 'loading', value: false }));

	return true;
};

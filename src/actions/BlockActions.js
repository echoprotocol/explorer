/* eslint-disable no-underscore-dangle */
import BN from 'bignumber.js';
import moment from 'moment';
import { Map } from 'immutable';

import echo from 'echojs-lib';

import RoundReducer from '../reducers/RoundReducer';
import BlockReducer from '../reducers/BlockReducer';

import {
	MAX_AVERAGE_TRS_BLOCKS,
	START_AVERAGE_TRS_BLOCKS,
	PAGE_BLOCKS_COUNT,
	PAGE_ADD_BLOCKS_COUNT,
	MAX_BLOCK_REQUESTS,
} from '../constants/GlobalConstants';

import FormatHelper from '../helpers/FormatHelper';

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

		value.verifiers = verifiers.map(({ name }) => name);
		value.round = planeBlock.round;
		value.transactions = planeBlock.transactions;
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

	let startedBlock = startBlock || transactions.get('block') + 1;

	if ((getState().round.get('latestBlock') - transactions.get('block')) > MAX_BLOCK_REQUESTS) {
		startedBlock = getState().round.get('latestBlock') - MAX_BLOCK_REQUESTS;
	}

	try {
		for (let i = startedBlock; i <= latestBlock; i += 1) {
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
		if (block) {
			accounts[index] = block.account;
		}

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
				.setIn([blockNumber, 'time'], moment.utc(blocksResult[i].timestamp).local().format('HH:mm:ss'))
				.setIn([blockNumber, 'producer'], accounts[i].name)
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

	const lastBlock = JSON.parse(localStorage.getItem('lastBlock'));

	const dateNowUnix = new BN(Date.now()).div(1000);

	dispatch(BlockReducer.actions.set({
		field: 'startTimestamp',
		value: parseInt(dateNowUnix.minus(lastBlock.timestamp).toFixed(0), 10),
	}));
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

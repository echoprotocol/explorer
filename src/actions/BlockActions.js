/* eslint-disable no-underscore-dangle */
import BN from 'bignumber.js';
import echo from 'echojs-lib';
import moment from 'moment';
import { Map } from 'immutable';

import RoundReducer from '../reducers/RoundReducer';
import BlockReducer from '../reducers/BlockReducer';

import { MAX_AVERAGE_TRS_BLOCKS, START_AVERAGE_TRS_BLOCKS, PAGE_BLOCKS_COUNT } from '../constants/GlobalConstants';

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

	return true;
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


		transactions = transactions
			.setIn(['transactions', 'value'], sumResults.sum.div(trLengths.size).toString())
			.setIn(['transactions', 'sum'], sumResults.sum.toString())
			.setIn(['transactions', 'lengthsList'], trLengths)
			.setIn(['operations', 'value'], sumResults.sumOps.div(trLengths.size).toString())
			.setIn(['operations', 'sum'], sumResults.sumOps.toString())
			.setIn(['operations', 'lengthsList'], opLengths)
			.set('count', trLengths.size)
			.set('block', latestBlock)
			.set('unixTimestamps', unixTimestamps)
			.set('averageTime', sumUnix / trLengths.size);


		dispatch(RoundReducer.actions.set({
			field: 'averageTransactions',
			value: transactions,
		}));
	} catch (err) {
		dispatch(RoundReducer.actions.set({ field: 'error', value: FormatHelper.formatError(err) }));
	}
};

const _addSizeToBlock = (blocksResult, producer, mapBlocks) => {
	const blockNumber = blocksResult.round;
	mapBlocks
		.setIn([blockNumber, 'time'], moment.utc(blocksResult[i].timestamp).local().format('hh:mm:ss'))
		.setIn([blockNumber, 'producer'], accounts[i].name)
		.setIn([blockNumber, 'reward'], 10)
		.setIn([blockNumber, 'rewardCurrency'], 'ECHO')
		.setIn([blockNumber, 'weight'], JSON.stringify(blocksResult[i]).length)
		.setIn([blockNumber, 'weightSize'], 'bytes')
		.setIn([blockNumber, 'transactions'], blocksResult[i].transactions.length);
};

export const updateBlockList = (lastBlock, startBlock) => async (dispatch, getState) => {
	let blocks = getState().block.get('blocks');

	let blocksResult = [];

	for (let i = startBlock + 1; i <= lastBlock; i += 1) {
		blocksResult.push(echo.api.getBlock(i));
	}

	blocksResult = await Promise.all(blocksResult);

	const accountIds = blocksResult.reduce((accounts, block, index) => {
		accounts[index] = block.account;
		return accounts;
	}, []);

	const accounts = await echo.api.getAccounts(accountIds);

	blocks = blocks.withMutations((mapBlocks) => {
		for (let i = 0; i < blocksResult.length; i += 1) {
			const blockNumber = blocksResult[i].round;
			mapBlocks
				.setIn([blockNumber, 'time'], moment.utc(blocksResult[i].timestamp).local().format('hh:mm:ss'))
				.setIn([blockNumber, 'producer'], accounts[i].name)
				.setIn([blockNumber, 'reward'], 10)
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

import BN from 'bignumber.js';
import moment from 'moment';

import echo from 'echojs-lib';

import RoundReducer from '../reducers/RoundReducer';
import BlockReducer from '../reducers/BlockReducer';

import {
	MAX_AVERAGE_TRS_BLOCKS,
	START_AVERAGE_TRS_BLOCKS,
	PAGE_BLOCKS_COUNT,
	PAGE_ADD_BLOCKS_COUNT,
} from '../constants/GlobalConstants';

import FormatHelper from '../helpers/FormatHelper';

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

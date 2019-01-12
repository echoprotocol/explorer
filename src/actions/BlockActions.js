import BN from 'bignumber.js';
import echo from 'echojs-lib';

import RoundReducer from '../reducers/RoundReducer';
import GlobalReducer from '../reducers/GlobalReducer';

import { START_AVERAGE_TRS_BLOCKS } from '../constants/GlobalConstants';

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

		const sumResults = blocks
			.reduce(({ sum, sumOps }, block) => {
				trLengths = trLengths.push(block.transactions.length);

				return ({
					sum: sum.plus(block.transactions.length),
					sumOps: sumOps.plus(block.transactions.reduce((sumOper, tr) => sumOper.plus(tr.operations.length), new BN(0))),
				});
			}, { sum: new BN(averageTransactions.get('sum')), sumOps: new BN(averageOperations.get('sum')) });


		const blocksLength = transactions.get('count') + blocks.length;

		if (trLengths.size > 20) {
			sumResults.sum -= trLengths.get(0);
			trLengths = trLengths.shift();
		}

		transactions = transactions
			.setIn(['transactions', 'value'], sumResults.sum.div(blocksLength).toString())
			.setIn(['transactions', 'sum'], sumResults.sum.toString())
			.setIn(['transactions', 'lengthsList'], trLengths)
			.setIn(['operations', 'value'], sumResults.sumOps.div(blocksLength).toString())
			.setIn(['operations', 'sum'], sumResults.sumOps.toString())
			.set('count', blocksLength)
			.set('block', latestBlock);

		dispatch(RoundReducer.actions.set({
			field: 'averageTransactions',
			value: transactions,
		}));
	} catch (err) {
		dispatch(GlobalReducer.actions.set({ field: 'error', value: FormatHelper.formatError(err) }));
	}
};

export const initBlocks = () => async (dispatch) => {
	const obj = await echo.api.wsApi.database.getObjects(['2.1.0']);

	if (obj && obj[0]) {
		dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: obj[0].head_block_number }));
	}

	const startBlock = obj[0].head_block_number - START_AVERAGE_TRS_BLOCKS;

	await dispatch(updateAverageTransactions(obj[0].head_block_number, startBlock));
};

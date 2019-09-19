/* eslint-disable no-underscore-dangle,camelcase,no-shadow */
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
	DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES,
	ECHO_ASSET,
} from '../constants/GlobalConstants';
import { ACCOUNT_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';

import FormatHelper from '../helpers/FormatHelper';

import GlobalActions from './GlobalActions';
import TransactionActions from './TransactionActions';

import LocalStorageService from '../services/LocalStorageService';

/**
 *
 * @param {Number} round
 */
export const getBlockInformation = (round) => async (dispatch, getState) => {
	try {
		const planeBlock = await echo.api.getBlock(round);
		if (!planeBlock) {
			dispatch(GlobalActions.toggleErrorPath(true));
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
			value.reward = `0 ${ECHO_ASSET.SYMBOL}`;
			const weight = JSON.stringify(planeBlock).length;
			value.size = `${FormatHelper.formatBlockSize(weight)} ${FormatHelper.formatByteSize(weight)}`;
			value.blockNumber = FormatHelper.formatAmount(planeBlock.round, 0);
		}
		const producer = await echo.api.getObject(planeBlock.account);
		value.producer = { id: producer.id, name: producer.name };

		const verifiersIds = planeBlock.cert.map(({ _signer }) => `${ACCOUNT_OBJECT_PREFIX}.${_signer}`);

		const verifiers = await echo.api.getAccounts(verifiersIds);
		const { transactions } = planeBlock;

		let resultTransactions = [];
		if (transactions.length !== 0) {

			const promiseTransactions = transactions
				.map(({ operations, operation_results }, trIndex) =>
					Promise.all(operations.map((op, i) => TransactionActions.getOperation(
						op,
						planeBlock.round,
						trIndex,
						i,
						operation_results[i],
						i ? '' : trIndex + 1,
					))));
			resultTransactions = await Promise.all(promiseTransactions);
		}

		value.operations = resultTransactions.reduce((arr, ops) => ([...arr, ...ops]), []);
		value.verifiers = verifiers.map(({ name, id }) => ({ id, name }));
		value.round = planeBlock.round;
		value.time = FormatHelper.timestampToBlockInformationTime(planeBlock.timestamp);

		dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map(value) }));
	} catch (error) {
		dispatch(BlockReducer.actions.set({ field: 'error', value: FormatHelper.formatError(error) }));
		dispatch(GlobalActions.toggleErrorPath(true));
	}
};

export const clearBlockInformation = () => (dispatch) => {
	dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map({}) }));
};

/**
 *  @method setLatestBlock
 *  @param {Number} latestBlock
 *
 * 	Set latest block from blockchain to redux store
 */
export const setLatestBlock = (latestBlock) => (dispatch) => {
	dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: latestBlock }));
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
			.filter((block) => moment(block.timestamp).unix() - moment(new Date(null)).unix() > 0)
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
	const isShowEmptyBlocks = getState().block.get('isShowEmptyBlocks');

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
			if (!blocksResult[i]) {
				break;
			}

			const blockNumber = blocksResult[i].round;
			mapBlocks
				.setIn([blockNumber, 'time'], moment.utc(blocksResult[i].timestamp).local().format('hh:mm:ss A'))
				.setIn([blockNumber, 'producer'], accounts[i].name)
				.setIn([blockNumber, 'producerId'], blocksResult[i].account)
				.setIn([blockNumber, 'reward'], 0)
				.setIn([blockNumber, 'rewardCurrency'], 'ECHO')
				.setIn([blockNumber, 'weight'], JSON.stringify(blocksResult[i]).length)
				.setIn([blockNumber, 'weightSize'], 'bytes')
				.setIn([blockNumber, 'transactions'], blocksResult[i].transactions.length);
		}
	});

	let noEmptyBlocks = getState().block.get('noEmptyBlocks');
	noEmptyBlocks = noEmptyBlocks.merge(blocks.filter((block) => block.get('transactions')));

	if (!isShowEmptyBlocks && noEmptyBlocks.size < PAGE_BLOCKS_COUNT) {
		dispatch(BlockReducer.actions.set({ field: 'hasMore', value: false }));
	}

	if (noEmptyBlocks.size >= PAGE_BLOCKS_COUNT) {
		dispatch(BlockReducer.actions.set({ field: 'hasMore', value: true }));
	}

	dispatch(BlockReducer.actions.set({ field: 'noEmptyBlocks', value: noEmptyBlocks }));

	const lastBlockStorage = blocksResult[blocksResult.length - 1];

	if (lastBlockStorage) {
		dispatch(BlockReducer.actions.set({ field: 'startTimestamp', value: 0 }));
	}

	const blocksToRemove = blocks.size - maxBlocks;

	if (Math.sign(blocksToRemove) > 0) {
		let blocksKeys = blocks.keySeq();
		blocksKeys = blocksKeys.slice(0, blocksToRemove);
		blocks = blocks.deleteAll(blocksKeys);

		if (noEmptyBlocks.size > maxBlocks) {
			blocksKeys = noEmptyBlocks.keySeq();
			blocksKeys = blocksKeys.slice(0, Math.sign(blocksToRemove));
			noEmptyBlocks = noEmptyBlocks.deleteAll(blocksKeys);
			dispatch(BlockReducer.actions.set({ field: 'noEmptyBlocks', value: noEmptyBlocks }));
		}
	}

	dispatch(BlockReducer.actions.set({ field: 'blocks', value: blocks }));
};

/**
 *  @method initBlocks
 *
 * 	Initialize recent blocks and starting timestamp of latest block
 */
export const initBlocks = () => async (dispatch) => {
	const value = LocalStorageService.getData('isShowEmptyBlocks');
	dispatch(BlockReducer.actions.set({ field: 'isShowEmptyBlocks', value: value === null ? true : value }));

	const obj = await echo.api.getObject(DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES);

	dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: obj.head_block_number }));

	const startBlockAverage = obj.head_block_number - START_AVERAGE_TRS_BLOCKS;

	await dispatch(updateAverageTransactions(obj.head_block_number, startBlockAverage));

	const startBlockList = obj.head_block_number - PAGE_BLOCKS_COUNT;
	await dispatch(updateBlockList(obj.head_block_number, startBlockList));

	dispatch(BlockReducer.actions.set({
		field: 'startTimestamp',
		value: 0,
	}));
};
/**
 *  @method setMaxDisplayedBlocks
 *
 * 	Set maximum number of displayed blocks
 */
export const setMaxDisplayedBlocks = () => async (dispatch, getState) => {
	try {
		const hasMore = getState().block.get('hasMore');

		if (
			!echo._ws._connected
			|| !echo.subscriber.subscriptions.echorand
			|| !echo.subscriber.subscriptions.block
			|| !hasMore
		) {
			return false;
		}

		const maxBlocks = getState().block.get('blocksCount');

		dispatch(BlockReducer.actions.set({ field: 'loading', value: true }));
		dispatch(BlockReducer.actions.set({ field: 'blocksCount', value: maxBlocks + PAGE_ADD_BLOCKS_COUNT }));

		const [...keys] = getState().block.get('blocks').keys();

		let startedBlock = Math.min(...keys) - PAGE_ADD_BLOCKS_COUNT;

		if (startedBlock <= 0) {
			startedBlock = 1;
			dispatch(BlockReducer.actions.set({ field: 'hasMore', value: false }));
		}

		await dispatch(updateBlockList(Math.min(...keys), startedBlock, true));

		return true;

	} catch (_) {
		return false;
	} finally {
		dispatch(BlockReducer.actions.set({ field: 'loading', value: false }));
	}

};

/**
 *  @method resetDisplayedBlocks
 *
 * 	Reset number of displayed blocks
 */
export const resetDisplayedBlocks = () => async (dispatch, getState) => {
	try {
		if (!echo._ws._connected || !echo.subscriber.subscriptions.echorand || !echo.subscriber.subscriptions.block) {
			return false;
		}

		dispatch(BlockReducer.actions.set({
			field: 'blocksCount',
			value: PAGE_BLOCKS_COUNT,
		}));

		const [...keys] = getState().block.get('blocks').keys();
		const startedBlock = Math.min(...keys) - PAGE_BLOCKS_COUNT;

		await dispatch(updateBlockList(Math.min(...keys), startedBlock, true));

		return true;

	} catch (_) {
		return false;
	}

};

/**
 *
 * @param value
 * @returns {Function}
 */
export const toggleEmptyBlocks = (value) => (dispatch) => {
	LocalStorageService.setData('isShowEmptyBlocks', !value);

	dispatch(BlockReducer.actions.set({ field: 'hasMore', value: true }));
	dispatch(BlockReducer.actions.set({ field: 'isShowEmptyBlocks', value: !value }));
};

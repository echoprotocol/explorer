/* eslint-disable no-underscore-dangle,camelcase,no-shadow */
import BN from 'bignumber.js';
import { Map, List } from 'immutable';
import echo, { serializers, validators } from 'echojs-lib';

import RoundReducer from '../reducers/RoundReducer';
import BlockReducer from '../reducers/BlockReducer';

import {
	PAGE_BLOCKS_COUNT,
	MAX_BLOCK_REQUESTS,
	DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES,
	NETWORK_CONNECTED_ERROR,
	NULL_ACCOUNT,
} from '../constants/GlobalConstants';
import { ACCOUNT_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';

import FormatHelper from '../helpers/FormatHelper';

import GlobalActions from './GlobalActions';
import TransactionActions from './TransactionActions';

import GlobalReducer from '../reducers/GlobalReducer';
import GridActions from './GridActions';
import { BLOCK_GRID } from '../constants/TableConstants';

import { isSidechainEthDeposit } from '../helpers/ValidateHelper';
import { getLatestOperationsFromGQL } from '../services/queries/history';
import AccountActions from './AccountActions';

/**
 *
 * @param {Object} targetBlock
 * @param {Object|undefined} targetBlock
 * @param {Object|undefined} targetBlockReward
 */
const getRewardDistribution = async (targetBlock, nextBlock) => {
	if (!nextBlock) {
		return null;
	}

	const { account: producerId, delegate: delegateId } = targetBlock;

	const producer = {
		type: 'Producer',
		producer: undefined,
		delegate: undefined,
		producedByCommittee: false,
	};

	if (producerId) {
		const account = await echo.api.getObject(producerId);
		producer.producer = account ? account.name : undefined;
	}

	if (delegateId && delegateId !== NULL_ACCOUNT.ID) {
		const account = await echo.api.getObject(delegateId);
		producer.delegate = account ? account.name : undefined;
	}

	const verifiers = nextBlock.prev_signatures
		.map(async (s) => {
			const res = {
				type: 'Verifier',
				producer: undefined,
				delegate: undefined,
				producedByCommittee: !!s._fallback,
			};

			if (s._producer) {
				const id = `${ACCOUNT_OBJECT_PREFIX}.${s._producer}`;
				const account = await echo.api.getObject(id);

				res.producer = account ? account.name : undefined;
			}

			if (s._delegate) {
				const id = `${ACCOUNT_OBJECT_PREFIX}.${s._delegate}`;
				const account = await echo.api.getObject(id);

				res.delegate = account ? account.name : undefined;
			}

			return res;
		});

	const result = [producer, ...verifiers];

	return Promise.all(result);
};

/**
 * method loadBlockHistory
 * @return {function(...[*]=)}
 */
export const loadBlockHistory = () => async (dispatch, getState) => {
	try {
		const queryData = getState().grid.get(BLOCK_GRID).toJS();
		const { currentPage, sizePerPage } = queryData;
		let operations = getState().block.getIn(['blockInformation', 'operations']) || new List([]);
		const getObjectId = async (objectId) => {
			if (!objectId) { return null; }
			if (isSidechainEthDeposit(objectId) || validators.isContractId(objectId)) {
				return objectId;
			}
			let account = null;
			try {
				account = await echo.api.getAccountByName(objectId.trim());
				if (account) {
					account = account.id;
				}
				// eslint-disable-next-line no-empty
			} catch (err) {}
			return account;
		};
		const [fromFilter, toFilter] = await Promise.all([
			getObjectId(queryData.filters.from),
			getObjectId(queryData.filters.to),
		]);
		operations = operations.filter((operation) => {
			const isAllowFrom = fromFilter ? (fromFilter === operation.mainInfo.from.name || fromFilter === operation.mainInfo.from.id) : true;
			const isAllowTo = toFilter ? (toFilter === operation.mainInfo.subject.name || toFilter === operation.mainInfo.subject.id) : true;
			return isAllowFrom && isAllowTo;
		});

		dispatch(GridActions.setTotalDataSize(BLOCK_GRID, operations.size));
		operations = operations.slice((currentPage - 1) * sizePerPage, currentPage * sizePerPage);
		dispatch(BlockReducer.actions.set({ field: 'filteredOperations', value: operations }));
	} catch (error) {
		dispatch(BlockReducer.actions.set({ field: 'error', value: FormatHelper.formatError(error) }));
		dispatch(GlobalActions.toggleErrorPath(true));
	}
};

/**
 *
 * @param {Number} round
 */
export const getBlockInformation = (round) => async (dispatch, getState) => {
	try {
		let planeBlock = null;
		let nextPlaneBlock = null;
		try {
			planeBlock = await echo.api.getBlock(round);
			nextPlaneBlock = await echo.api.getBlock(new BN(round).plus(1).toString(10));
		} catch (err) {
			dispatch(GlobalReducer.actions.set({ field: 'error', value: NETWORK_CONNECTED_ERROR }));
			dispatch(GlobalActions.toggleErrorScreen(true));
			return;
		}

		if (!planeBlock) {
			dispatch(GlobalActions.toggleErrorPath(true));
			return;
		}

		const handledBlock = getState().block.getIn(['blocks', round]);
		const blockReward = new BN(getState().round.get('blockReward'));

		const value = {};

		if (handledBlock) {
			value.reward = `${handledBlock.get('reward')} ${handledBlock.get('rewardCurrency')}`;
			value.size = `${FormatHelper.formatBlockSize(handledBlock.get('weight'))}
			 ${FormatHelper.formatByteSize(handledBlock.get('weight'))}`;
			value.blockNumber = handledBlock.get('blockNumber');
		} else {
			const fee = planeBlock.transactions.reduce((trxAcc, trx) => {
				if (trx.fees_collected) {
					if (typeof trx.fees_collected === 'number') {
						return trxAcc.plus(trx.fees_collected);
					}
					trx.fees_collected.forEach(({ amount }) => {
						trxAcc.plus(amount);
					});
					return trxAcc;
				}
				return trxAcc;
			}, new BN(0));
			const reward = blockReward.plus(fee);
			value.reward = reward.toString(10);
			const weight = JSON.stringify(planeBlock).length;
			value.size = `${FormatHelper.formatBlockSize(weight)} ${FormatHelper.formatByteSize(weight)}`;
			value.blockNumber = FormatHelper.formatAmount(planeBlock.round, 0);
		}
		const producer = await echo.api.getObject(planeBlock.account);
		value.producer = { id: producer.id, name: producer.name };

		// remove after go to 0.10 testnet

		const { transactions } = planeBlock;

		let resultTransactions = [];
		if (transactions.length !== 0) {
			// TODO: didnt work with ops data
			// const ops = transactions.reduce((resultIds, { operations }) => resultIds.concat(operations), []);
			// await TransactionActions.fetchTransactionsObjects(ops);

			const promiseTransactions = transactions
				.map(({ operations, operation_results }, trIndex) =>
					Promise.all(operations.map((op, i) => TransactionActions.getOperation(
						op,
						planeBlock.round,
						planeBlock.timestamp,
						trIndex,
						i,
						operation_results[i],
						i ? '' : trIndex + 1,
					))));
			resultTransactions = await Promise.all(promiseTransactions);
		}
		value.transactionCount = resultTransactions.length;
		value.operations = new List(resultTransactions.reduce((arr, ops) => ([...arr, ...ops]), []));
		value.round = planeBlock.round;
		value.timestamp = planeBlock.timestamp;
		value.rewardDistribution = await getRewardDistribution(planeBlock, nextPlaneBlock);
		dispatch(GridActions.setTotalDataSize(BLOCK_GRID, resultTransactions.length));
		await dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map(value) }));
		dispatch(loadBlockHistory());
	} catch (error) {
		dispatch(BlockReducer.actions.set({ field: 'error', value: FormatHelper.formatError(error) }));
		dispatch(GlobalActions.toggleErrorPath(true));
	}
};

export const clearBlockInformation = () => (dispatch) => {
	dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map({}) }));
};

export const toggleRewardDistribution = () => (dispatch, getState) => {
	const isDistributionRewardOpen = getState().block.get('isDistributionRewardOpen');
	dispatch(BlockReducer.actions.set({ field: 'isDistributionRewardOpen', value: !isDistributionRewardOpen }));
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
	const blockReward = new BN(getState().round.get('blockReward'));

	const [...keys] = blocks.keys();
	let startedBlock = startBlock || Math.max(...keys);

	let blocksResult = [];

	if (isLoadMore) {
		startedBlock -= 1;
		latestBlock -= 1;
	}

	if (latestBlock - startedBlock > MAX_BLOCK_REQUESTS) {
		startedBlock = latestBlock - MAX_BLOCK_REQUESTS;
	}

	for (let i = startedBlock + 1; i <= latestBlock; i += 1) {
		blocksResult.push(echo.api.getBlock(i));
	}

	blocksResult = await Promise.all(blocksResult);
	const blocksRewards = {};
	const accountIds = blocksResult.reduce((accounts, block, index) => {
		if (block) {
			const { round, transactions } = block;

			const fee = transactions.reduce((trxAcc, trx) => {
				if (trx.fees_collected) {
					if (typeof trx.fees_collected === 'number') {
						return trxAcc.plus(trx.fees_collected);
					}
					trx.fees_collected.forEach(({ amount }) => {
						trxAcc.plus(amount);
					});
				}
				return trxAcc;
			}, new BN(0));
			accounts[index] = block.account;

			blocksRewards[round] = blockReward.plus(fee);
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

			// TODO remove!!!! try-catch after echojs-lib FIXED
			let weight = 0;
			try {
				weight = serializers.signedBlock.serialize(blocksResult[i]).length;
			} catch (e) {
				weight = JSON.stringify(blocksResult[i]).length;
				//
			}

			const blockNumber = blocksResult[i].round;
			mapBlocks
				.setIn([blockNumber, 'timestamp'], blocksResult[i].timestamp)
				.setIn([blockNumber, 'producer'], accounts[i].name)
				.setIn([blockNumber, 'producerId'], blocksResult[i].account)
				.setIn([blockNumber, 'reward'], blocksRewards[blockNumber] ? blocksRewards[blockNumber].toString(10) : 0)
				.setIn([blockNumber, 'rewardCurrency'], 'ECHO')
				.setIn([blockNumber, 'weight'], weight)
				.setIn([blockNumber, 'weightSize'], 'bytes')
				.setIn([blockNumber, 'transactions'], blocksResult[i].transactions.length)
				.setIn([blockNumber, 'transactionsInfo'], blocksResult[i].transactions);
		}
	});

	const blocksToRemove = blocks.size - maxBlocks;

	if (Math.sign(blocksToRemove) > 0) {
		let blocksKeys = blocks.keySeq();
		blocksKeys = blocksKeys.sort((a, b) => a - b);
		blocksKeys = blocksKeys.slice(0, blocksToRemove);
		blocks = blocks.deleteAll(blocksKeys);
	}

	dispatch(BlockReducer.actions.set({ field: 'blocks', value: blocks }));
};

/**
 *  @method initBlocks
 *
 * 	Initialize recent blocks and starting timestamp of latest block
 */
export const initBlocks = () => async (dispatch) => {

	const obj = await echo.api.getObject(DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES);

	dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: obj.head_block_number }));

	const startBlockList = obj.head_block_number - PAGE_BLOCKS_COUNT;
	await dispatch(updateBlockList(obj.head_block_number, startBlockList));
};

export const getLatestOperations = () => async (dispatch) => {
	let latestOperations = [];
	try {
		latestOperations = await getLatestOperationsFromGQL();
	} catch (err) {
		console.log('EchoDB error', err);
	}
	const operations = latestOperations.data.getHistory.items;
	const transactions = AccountActions.formatHistoryFromEchoDB(operations);
	const formattedOperations = await AccountActions.formatAccountHistory(null, transactions);
	dispatch(BlockReducer.actions.set({ field: 'latestOperations', value: formattedOperations }));
};

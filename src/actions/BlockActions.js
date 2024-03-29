/* eslint-disable no-underscore-dangle,camelcase,no-shadow */
import BN from 'bignumber.js';
import { Map, List, OrderedMap } from 'immutable';
import echo, { serializers, validators } from 'echojs-lib';

import RoundReducer from '../reducers/RoundReducer';
import BlockReducer from '../reducers/BlockReducer';

import {
	PAGE_BLOCKS_COUNT,
	MAX_BLOCK_REQUESTS,
	DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES,
	NETWORK_CONNECTED_ERROR,
	NULL_ACCOUNT,
	ECHO_ASSET,
} from '../constants/GlobalConstants';
import { ACCOUNT_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';

import FormatHelper from '../helpers/FormatHelper';

import GlobalActions from './GlobalActions';
import TransactionActions from './TransactionActions';

import GlobalReducer from '../reducers/GlobalReducer';
import GridActions from './GridActions';
import { BLOCK_GRID, BLOCKS_GRID } from '../constants/TableConstants';

import { isSidechainEthDeposit } from '../helpers/ValidateHelper';
import { getLatestOperationsFromGQL, getBlockHistory } from '../services/queries/history';
import AccountActions from './AccountActions';
import { getBlockReward, getBlockFromGraphQl } from '../services/queries/block';

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
 * Format block history
 * @param {Array} transactions
 * @returns {function}
 */
export const formatBlockHistory = async (transactions) => {

	let accountHistory = transactions.map(async (t) => {
		const { op: operation, result } = t;
		const block = await echo.api.getBlock(t.block_num);

		return TransactionActions.getOperation(
			operation,
			t.block_num,
			block ? block.timestamp : null,
			t.trx_in_block,
			t.op_in_trx,
			result,
			null,
			null,
			t.id,
			t.virtual,
			true,
		);
	});

	accountHistory = await Promise.all(accountHistory);

	return accountHistory.filter((t) => t);
};

/**
 * method loadBlockHistory
 * @return {function(...[*]=)}
 */
export const loadBlockHistory = () => async (dispatch, getState) => {
	try {
		let total = 0;
		let items = [];
		const queryData = getState().grid.get(BLOCK_GRID).toJS();
		const round = getState().block.getIn(['blockInformation', 'round']);
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
			} catch (err) { }
			return account;
		};
		const [fromFilter, toFilter] = await Promise.all([
			getObjectId(queryData.filters.from),
			getObjectId(queryData.filters.to),
		]);

		try {
			({ items, total } = await getBlockHistory({
				fromFilter: fromFilter || undefined,
				toFilter: toFilter || undefined,
				offset: (queryData.currentPage - 1) * queryData.sizePerPage,
				count: queryData.sizePerPage,
				block: Number(round),
			}));
		} catch (err) {
			console.log('EchoDb error', err);
		}
		dispatch(GridActions.setTotalDataSize(BLOCK_GRID, total));
		let transactions = AccountActions.formatHistoryFromEchoDB(items);
		transactions = await formatBlockHistory(transactions);

		dispatch(BlockReducer.actions.set({ field: 'filteredOperations', value: new List(transactions) }));
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

		const value = {};

		let assetsNames = [];
		if (handledBlock) {
			value.reward = `${handledBlock.get('reward')} ${handledBlock.get('rewardCurrency')}`;
			value.size = `${FormatHelper.formatBlockSize(handledBlock.get('weight'))}
			 ${FormatHelper.formatByteSize(handledBlock.get('weight'))}`;
			value.blockNumber = handledBlock.get('blockNumber');
		} else {
			const { data: { getBlock: block } } = await getBlockFromGraphQl(Number(round));
			const otherAssets = planeBlock.transactions.reduce((acc, tr) => {
				const notEchoFees = tr.fees_collected.filter((f) => f.asset_id !== ECHO_ASSET.ID && !acc.includes(f.asset_id))
					.map((el) => el.asset_id);
				return [...acc, ...notEchoFees];
			}, []);
			const getAssetNamePromises = otherAssets.map(async (el) => {
				const asset = await echo.api.getObject(el);
				return asset.symbol;
			});
			assetsNames = await Promise.all(getAssetNamePromises);
			const reward = new BN(block.block_reward);
			value.reward = reward.toString(10);
			const weight = JSON.stringify(planeBlock).length;
			value.size = `${FormatHelper.formatBlockSize(weight)} ${FormatHelper.formatByteSize(weight)}`;
			value.blockNumber = FormatHelper.formatAmount(planeBlock.round, 0);
		}
		const producer = await echo.api.getObject(planeBlock.account);
		value.producer = { id: producer.id, name: producer.name };

		// remove after go to 0.10 testnet

		const { transactions } = planeBlock;
		const virtualTransaction = await echo.api.getBlockVirtualOperations(round);
		let resultTransactions = [];
		if (transactions.length !== 0 || virtualTransaction.length !== 0) {

			const promiseTransactions = transactions
				.map(({ operations, operation_results }, trIndex) =>
					Promise.all(operations.map((op, i) => TransactionActions.getOperation(
						op,
						planeBlock.round,
						planeBlock.timestamp,
						trIndex,
						i,
						operation_results[i],
						trIndex + 1,
						null,
						null,
						false,
						false,
						false,
					))));
			const promiseVirtualTransactions = virtualTransaction
				.map(({
					op, result, op_in_trx, trx_in_block,
				}) => TransactionActions.getOperation(
					op,
					planeBlock.round,
					planeBlock.timestamp,
					trx_in_block,
					op_in_trx,
					result,
					op_in_trx + 1,
					null,
					null,
					true,
					false,
					false,
				));

			resultTransactions = await Promise.all([...promiseTransactions, Promise.all(promiseVirtualTransactions)]);
		}
		value.transactionCount = transactions.length + virtualTransaction.length;
		value.operations = new List(resultTransactions.reduce((arr, ops) => ([...arr, ...ops]), []));

		value.otherAssetsRewards = assetsNames;
		value.round = planeBlock.round;
		value.timestamp = planeBlock.timestamp;
		value.rewardDistribution = await getRewardDistribution(planeBlock, nextPlaneBlock);
		dispatch(GridActions.setTotalDataSize(BLOCK_GRID, value.operations.size));
		await dispatch(BlockReducer.actions.set({ field: 'blockInformation', value: new Map(value) }));
		await dispatch(loadBlockHistory(value.operations));
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
 *  @method getBlocksByIndexes
 *
 * 	Get blocks by paginatedData round
 *
 * 	@param {Number?} pageNumber
 * 	@param {Number?} size
 */
export const getBlocksByIndexes = () => async (dispatch, getState) => {
	dispatch(BlockReducer.actions.set({ field: 'loading', value: true }));
	const latestBlock = getState().round.get('latestBlock');
	const gridData = getState().grid.get(BLOCKS_GRID).toJS();
	const { currentPage, sizePerPage } = gridData;
	const page = currentPage;
	const onPage = sizePerPage;
	const lastBlock = latestBlock - (onPage * (page - 1));
	const startBlock = lastBlock - onPage >= 0 ? lastBlock - onPage : 0;

	let blocksResult = [];
	for (let i = startBlock; i <= lastBlock; i += 1) {
		blocksResult.push(echo.api.getBlock(i));
	}

	blocksResult = await Promise.all(blocksResult);
	const { data: { getBlocks: { items: rewardsFromDB } } } = await getBlockReward(startBlock, lastBlock - startBlock);
	const blocksRewards = {};
	const accountIds = blocksResult.reduce((accounts, block, index) => {
		if (block) {
			const { round } = block;

			accounts[index] = block.account;
			const reward = rewardsFromDB ? rewardsFromDB.find((el) => el.round === round) : 0;
			blocksRewards[round] = reward && reward.block_reward;
		}

		return accounts;
	}, []);
	const accounts = await echo.api.getAccounts(accountIds);

	let blocks = new OrderedMap();
	blocks = blocks.withMutations((mapBlocks) => {
		for (let i = 0; i < blocksResult.length; i += 1) {
			if (!blocksResult[i]) {
				break;
			}

			let weight = 0;
			try {
				weight = serializers.signedBlock.serialize(blocksResult[i]).length;
			} catch (e) {
				weight = JSON.stringify(blocksResult[i]).length;
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
	dispatch(BlockReducer.actions.set({ field: 'blocksOnTable', value: blocks }));
	dispatch(GridActions.setPage(BLOCKS_GRID, page));
	dispatch(GridActions.setPageSize(BLOCKS_GRID, onPage));
	dispatch(GridActions.setTotalDataSize(BLOCKS_GRID, latestBlock));
	dispatch(BlockReducer.actions.set({ field: 'loading', value: false }));
	return { blocks };
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
	let startedBlock = startBlock || Math.min(...keys);

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

	const { data: { getBlocks: { items: rewardsFromDB } } } = await getBlockReward(startedBlock, latestBlock - startedBlock);
	const accountIds = blocksResult.reduce((accounts, block, index) => {
		if (block) {
			const { round } = block;
			accounts[index] = block.account;
			const reward = rewardsFromDB ? rewardsFromDB.find((el) => el.round === round) : 0;
			blocksRewards[round] = reward && reward.block_reward;
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

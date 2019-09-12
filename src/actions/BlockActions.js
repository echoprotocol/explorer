/* eslint-disable no-underscore-dangle,camelcase,no-shadow */
import BN from 'bignumber.js';
import moment from 'moment';
import { Map } from 'immutable';
import _ from 'lodash';
import echo, { OPERATIONS_IDS, validators } from 'echojs-lib';

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
	ECHO_ASSET,
	NATHAN,
} from '../constants/GlobalConstants';
import {
	ACCOUNT_OBJECT_PREFIX,
	CONTRACT_OBJECT_PREFIX,
} from '../constants/ObjectPrefixesConstants';
import { CONTRACT_RESULT_TYPE_0 } from '../constants/ResultTypeConstants';
import Operations from '../constants/Operations';

import FormatHelper from '../helpers/FormatHelper';
import TypesHelper from '../helpers/TypesHelper';

import GlobalActions from './GlobalActions';

import LocalStorageService from '../services/LocalStorageService';

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

	if (hexFrom[25] === '0') {
		const id = `${ACCOUNT_OBJECT_PREFIX}.${fromInt}`;
		const { name } = (await echo.api.getObject(id));
		from = { id, name };
	}

	if (hexTo[25] === '0') {
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
 * @param {String} accountId
 * @param {Number} round
 * @param {Number} trIndex
 * @param {Number} opIndex
 * @param {Array} operationResult
 * @param {String} id
 * @returns {Promise.<{type: *, fee: {amount, precision, symbol}, from: {id: string}, subject: {id: string}, name, value: {}, status: boolean}>}
 */
export const formatOperation = async (
	data,
	accountId = undefined,
	round = undefined,
	trIndex = undefined,
	opIndex = undefined,
	operationResult = [],
	id = undefined,
	timestamp = undefined,
) => {
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
		trIndex,
		id,
		timestamp,
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
		} else if (!validators.isObjectId(operation[options.subject[0]])) {
			const request = _.get(operation, options.subject[0]);
			let response = null;
			switch (options.subject[0]) {
				case 'name':
					response = await echo.api.getAccountByName(request);
					break;
				case 'symbol':
					[response] = await echo.api.lookupAssetSymbols([request]);
					break;
				default:
					response = await echo.api.getObject(request);
					break;
			}
			result.subject = { id: response.id, name: request };
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

	// filter sub-operations by account
	if (accountId && ![result.from.id, result.subject.id].includes(accountId) && !round) {
		return null;
	}

	if (resId && (type === OPERATIONS_IDS.CONTRACT_CREATE || type === OPERATIONS_IDS.CONTRACT_CALL)) {

		const contractResult = await echo.api.getContractResult(resId);

		const [contractResultType, contractResultObject] = contractResult;

		let log;

		if (contractResultType === CONTRACT_RESULT_TYPE_0) {

			const { exec_res: { excepted } } = contractResultObject;
			({ log } = contractResultObject.tr_receipt);
			result.status = excepted === 'None';

		} else {
			result.status = true;
		}


		if (type === OPERATIONS_IDS.CONTRACT_CALL && round) {
			let contractHistory = [];

			try {
				contractHistory = await echo.api.getContractHistory(result.subject.id);
			} catch (e) {
				//
			}

			let internalOperations = contractHistory
				.filter((i) => (i.block_num === round && i.trx_in_block === trIndex && i.op_in_trx === opIndex))
				.map(({ op }) => formatOperation(op, accountId));

			internalOperations = await Promise.all(internalOperations);
			internalOperations = internalOperations.filter((op) => op);
			let internalTransactions = internalOperations;
			let code = '';
			try {
				([, { code }] = await echo.api.getContract(result.subject.id));

			} catch (e) {
				//
			}

			if (log && Array.isArray(log) && TypesHelper.isErc20Contract(code)) {

				const symbol = FormatHelper
					.toUtf8((await echo.api.callContractNoChangingState(result.subject.id, NATHAN.ID, ECHO_ASSET.ID, ERC20_HASHES['symbol()'])).slice(128));
				const precision = parseInt(await echo.api.callContractNoChangingState(result.subject.id, NATHAN.ID, ECHO_ASSET.ID, ERC20_HASHES['decimals()']), 16);

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

		// remove after go to 0.10 testnet
		const verifiersIds = planeBlock.cert.map(({ _producer, _signer }) => `${ACCOUNT_OBJECT_PREFIX}.${_producer || _signer}`);

		const verifiers = await echo.api.getAccounts(verifiersIds);
		const { transactions } = planeBlock;

		let resultTransactions = [];
		if (transactions.length !== 0) {

			const promiseTransactions = transactions
				.map(({ operations, operation_results }, trIndex) =>
					Promise.all(operations.map((op, i) => formatOperation(op, null, planeBlock.round, trIndex, i, operation_results[i]))));
			resultTransactions = await Promise.all(promiseTransactions);
		}

		value.transactions = resultTransactions;
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

	let startedBlock = startBlock || transactions.get('block') + 1;

	if ((getState().round.get('latestBlock') - transactions.get('block')) > MAX_BLOCK_REQUESTS) {
		startedBlock = getState().round.get('latestBlock') - MAX_BLOCK_REQUESTS;
	}

	try {
		let blocks = getState().block.get('blocks');

		const blocksToRemove = blocks.keySeq()
			.filter((key) => key < startedBlock || key > latestBlock);
		blocks = blocks.deleteAll(blocksToRemove);

		let trLengths = averageTransactions.get('lengthsList');
		let opLengths = averageOperations.get('lengthsList');
		let unixTimestamps = transactions.get('unixTimestamps');

		blocks = blocks
			.filter((block) => moment(block.get('timestamp')).unix() - moment(new Date(null)).unix() > 0).toJS();

		const sumResults = Object.values(blocks).reduce(({ sum, sumOps }, block) => {
			trLengths = trLengths.push(block.transactions);
			const opLength = block.transactionsInfo.reduce((sumOper, tr) => sumOper.plus(tr.operations.length), new BN(0));
			opLengths = opLengths.push(opLength);

			const unixTimeStamp = moment(block.timestamp).unix();

			if (Math.sign(unixTimeStamp) > 0) {
				unixTimestamps = unixTimestamps.push(unixTimeStamp);
			}

			return ({
				sum: sum.plus(block.transactions),
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
				.setIn([blockNumber, 'timestamp'], blocksResult[i].timestamp)
				.setIn([blockNumber, 'producer'], accounts[i].name)
				.setIn([blockNumber, 'producerId'], blocksResult[i].account)
				.setIn([blockNumber, 'reward'], 0)
				.setIn([blockNumber, 'rewardCurrency'], 'ECHO')
				.setIn([blockNumber, 'weight'], JSON.stringify(blocksResult[i]).length)
				.setIn([blockNumber, 'weightSize'], 'bytes')
				.setIn([blockNumber, 'transactions'], blocksResult[i].transactions.length)
				.setIn([blockNumber, 'transactionsInfo'], blocksResult[i].transactions);
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
		blocksKeys = blocksKeys.sort((a, b) => a - b);
		blocksKeys = blocksKeys.slice(0, blocksToRemove);
		blocks = blocks.deleteAll(blocksKeys);

		if (noEmptyBlocks.size > maxBlocks) {
			blocksKeys = noEmptyBlocks.keySeq();
			blocksKeys = blocksKeys.sort((a, b) => a - b);
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

	const startBlockList = obj.head_block_number - PAGE_BLOCKS_COUNT;
	await dispatch(updateBlockList(obj.head_block_number, startBlockList));

	const startBlockAverage = obj.head_block_number - START_AVERAGE_TRS_BLOCKS;
	await dispatch(updateAverageTransactions(obj.head_block_number, startBlockAverage));

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

		let blocks = getState().block.get('blocks');
		let [...keys] = blocks.keys();
		keys = keys.sort((a, b) => a - b)
			.slice(PAGE_BLOCKS_COUNT);
		blocks = blocks.deleteAll(keys);
		dispatch(BlockReducer.actions.set({ field: 'blocks', value: blocks }));

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

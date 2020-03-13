/* eslint-disable camelcase */
import echo, { OPERATIONS_IDS, validators } from 'echojs-lib';
import { List, Map } from 'immutable';
import _ from 'lodash';
import BN from 'bignumber.js';

import Operations, {
	accountOperations,
	assetOperations,
	committeeOperations,
	proposalOperations,
} from '../constants/Operations';
import { CONTRACT_RESULT_TYPE_0 } from '../constants/ResultTypeConstants';
import { ERC20_HASHES, ECHO_ASSET, NATHAN } from '../constants/GlobalConstants';
import { ACCOUNT_OBJECT_PREFIX, CONTRACT_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';

import ConvertHelper from '../helpers/ConvertHelper';
import FormatHelper from '../helpers/FormatHelper';
import TypesHelper from '../helpers/TypesHelper';

import TransactionReducer from '../reducers/TransactionReducer';

import BaseActionsClass from './BaseActionsClass';
import GlobalActions from './GlobalActions';

import { getContractInfo } from '../services/queries/contract';

class TransactionActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(TransactionReducer);
	}

	/**
	 * Fetch deep transaction object ids for requests optimization
	 * @method fetchTransactionsObjects
	 * @param transactions
	 * @returns {Promise<void>}
	 */
	async fetchTransactionsObjects(transactions) {
		const deepExtract = (data, result) => Object.values(data).reduce((ids, id) => {
			if (validators.isObjectId(id) && !result.includes(id)) {
				ids.push(id);
				return ids;
			}

			if (typeof id === 'object' && id !== null) {
				ids = ids.concat(deepExtract(id, ids));
			}

			return ids;
		}, []);

		let blocks = [];
		const objectIds = transactions.reduce((resultIds, tx) => {
			const data = tx.op ? tx.op[1] : tx[1];
			blocks.push(tx.block_num);

			const operationIds = deepExtract(data, resultIds).filter((id) => !resultIds.includes(id));

			return resultIds.concat(operationIds);
		}, []);

		blocks = blocks.reduce((resultBlocks, b, index, currentBlocks) => {
			const blocksCount = currentBlocks.reduce((count, curBlock) => (curBlock === b ? count + 1 : count), 0);
			if (blocksCount !== 1 && !resultBlocks.includes(b)) {
				resultBlocks.push(b);
			}
			return resultBlocks;
		}, []);

		await Promise.all(blocks.map((b) => echo.api.getBlock(b)));
		await echo.api.getObjects(objectIds);
	}

	/**
	 *
	 * @param id
	 * @returns {function(*, *): Map<string, any>}
	 */
	async setContractObject(id) {
		try {
			const { contractInfo } = await getContractInfo(id);
			const {
				type, eth_accuracy: ethAccuracy,
			} = contractInfo;
			let { supported_asset_id: supportedAsset } = contractInfo;

			if (supportedAsset !== null) {
				supportedAsset = (await echo.api.getObject(supportedAsset)).symbol;
			}
			const chainContract = await echo.api.getContract(id);
			return new Map({})
				.set('type', chainContract.type && chainContract.type.toUpperCase())
				.set('supportedAsset', supportedAsset)
				.set('ethAccuracy', ethAccuracy ? 'Activated' : 'Inactivated')
				.set('erc20', type && type === 'erc20' ? 'Yes' : 'No')
				.set('bytecode', chainContract[1].code);
		} catch (e) {
			return null;
		}
	}

	/**
	 * account, asset, committee, proposal
	 * @param operation
	 * @param options
	 * @param from
	 * @param subject
	 * @returns {Function}
	 */
	async setOperationObject(operation, options, from, subject) {
		let object = new Map({});

		try {
			if (accountOperations.includes(operation.name)) {
				let account = await echo.api.getObject(from.id);
				if (operation.name === Operations.account_create.name) {
					account = await echo.api.getObject(subject.id);
				}
				const activeAccounts = await Promise.all(account.active.account_auths.map(async ([id]) => {
					const acc = await echo.api.getObject(id);
					return acc && acc.name;
				}));
				const accounts = await echo.api.getObjects([account.registrar, account.options.delegating_account]);

				object = object
					.set('id', account.id)
					.set('name', account.name)
					.set('echorandKey', account.echorand_key)
					.set('activeAccounts', activeAccounts)
					.set('activeKeys', account.active.key_auths.map(([key]) => key))
					.set('registrar', accounts[0] && accounts[0].name)
					.set('delegating', accounts[1] && accounts[1].name);
			} else if (assetOperations.includes(operation.name)) {
				let assetId = null;
				if (operation.options.asset) {
					assetId = _.get(options, operation.options.asset);
				}
				const asset = await echo.api.getObject(assetId || subject.id);
				const issuer = await echo.api.getObject(asset.issuer);

				object = object
					.set('id', asset.id)
					.set('name', asset.symbol)
					.set('type', 'No')
					.set(
						'price',
						new BN(asset.options.core_exchange_rate.quote.amount)
							.div(asset.options.core_exchange_rate.base.amount)
							.toString(),
					)
					.set('issuer', issuer && issuer.name)
					.set('precision', asset.precision)
					.set('totalSupply', asset.dynamic.current_supply)
					.set('maxSupply', asset.options.max_supply);
			} else if (committeeOperations.includes(operation.name)) {
				const committee = await echo.api.getObject(subject.id);
				const committeeMemberAccount = await echo.api.getObject(committee.committee_member_account);

				object = object
					.set('id', committee.id)
					.set('account', committeeMemberAccount && committeeMemberAccount.name)
					.set('votes', committee.total_votes)
					.set('url', committee.url);
			} else if (proposalOperations.includes(operation.name)) {
				const proposal = await echo.api.getObject(subject.id);
				const operations = options.proposed_ops.map(([opType]) => {
					const op = Object.values(Operations).find((i) => i.value === opType);
					return op && op.name;
				});

				object = object
					.set('id', proposal && proposal.id)
					.set('expirationTime', options.expiration_time)
					.set('operations', operations);
			}

			return object;
		} catch (e) {
			return null;
		}
	}

	/**
	 *
	 * @param {Object} log
	 * @param {Object} data
	 * @param {String} symbol
	 * @returns {Promise.<{from: {id: string}, subject: {id: string}, value: {amount: string, symbol: string}, label: string}>}
	 */
	async parseTransferEvent({ log, data }, symbol = '', precision = 0, label) {
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
			from, subject: to, value, label,
		};
	}
	/**
	 *
	 * @param {Object} log
	 * @param {Object} data
	 * @param {String} symbol
	 * @param {String} contractId
	 * @returns {Promise.<{from: {id: string}, subject: {id: string}, value: {amount: string, symbol: string}, label: string}>}
	 */
	async parseWithdrawalEvent({ log, data }, symbol = '', precision = 0, label, contractId, isReverse) {
		const [, hex] = log;
		const value = { amount: new BN(data, 16).toString(10), symbol, precision };

		const toInt = parseInt(hex.slice(26), 16);
		let account = { id: `${CONTRACT_OBJECT_PREFIX}.${toInt}` };

		const contract = {};
		contract.id = contractId;
		if (hex[25] === '0') {
			const id = `${ACCOUNT_OBJECT_PREFIX}.${toInt}`;
			const { name } = (await echo.api.getObject(id));
			account = { id, name };
		}

		const from = isReverse ? account : contract;
		const to = isReverse ? contract : account;
		return {
			from, subject: to, value, label,
		};
	}

	async getPrecision(contractId) {
		const rawResult = await echo.api.callContractNoChangingState(
			contractId,
			NATHAN.ID,
			{ asset_id: ECHO_ASSET.ID, amount: 0 },
			ERC20_HASHES['decimals()'],
		);
		if (rawResult === '') return 0;
		return parseInt(rawResult, 16);
	}

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
	async formatOperation(
		data,
		accountId = undefined,
		round = undefined,
		trIndex = undefined,
		opIndex = undefined,
		operationResult = [],
		id = undefined,
		timestamp = undefined,
	) {
		const [type, operation] = data;
		const [, resId] = operationResult;

		const { name, options } = Object.values(Operations).find((i) => i.value === type);
		const result = {
			type,
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

		if (operation.fee) {
			const feeAsset = await echo.api.getObject(operation.fee.asset_id);
			result.fee = {
				amount: operation.fee.amount,
				precision: feeAsset.precision,
				symbol: feeAsset.symbol,
			};
		}

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
						response = request;
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
		} else {
			result.value.precision = ECHO_ASSET.PRECISION;
			result.value.symbol = ECHO_ASSET.SYMBOL;
		}

		// filter sub-operations by account
		if (accountId && ![result.from.id, result.subject.id].includes(accountId) && !round) {
			return null;
		}
		if (resId && validators.isContractResultId(resId) && (type === OPERATIONS_IDS.CONTRACT_CREATE || type === OPERATIONS_IDS.CONTRACT_CALL)) {

			let contractResult;
			try {
				contractResult = await echo.api.getContractResult(resId);
			} catch (error) {
				result.status = true;
				return result;
			}

			const [contractResultType, contractResultObject] = contractResult;
			let log;
			let newContractAddress;

			if (contractResultType === CONTRACT_RESULT_TYPE_0) {

				const { exec_res: { excepted, new_address } } = contractResultObject;
				({ log } = contractResultObject.tr_receipt);
				result.status = excepted === 'None';

				if (new_address && !result.subject.id) {
					newContractAddress = `${CONTRACT_OBJECT_PREFIX}.${parseInt(new_address.slice(2), 16)}`;
				}

			} else {
				result.status = true;
			}

			if ([
				OPERATIONS_IDS.CONTRACT_CALL,
				OPERATIONS_IDS.CONTRACT_CREATE,
			].includes(type) && round) {
				const contractId = newContractAddress || result.subject.id;

				let contractHistory = [];

				try {
					contractHistory = await echo.api.getContractHistory(contractId);
				} catch (e) {
					//
				}

				let internalOperations = contractHistory
					.filter((i) => (i.block_num === round
						&& i.trx_in_block === trIndex
						&& i.op_in_trx === opIndex
						&& [
							OPERATIONS_IDS.CONTRACT_INTERNAL_CREATE,
							OPERATIONS_IDS.CONTRACT_INTERNAL_CALL,
						].includes(i.op[0])
					))
					.map(({ op }) => this.formatOperation(op, accountId));
				internalOperations = await Promise.all(internalOperations);
				internalOperations = internalOperations
					.filter((op) => op)
					.filter((op) => op.value && op.value.amount && !(new BN(op.value.amount).eq(0)))
					.map((op, i) => ({ ...op, name: i === 0 ? 'Asset transfer' : '' }));

				let internalTransactions = [...internalOperations];
				let code = '';
				try {
					([, { code }] = await echo.api.getContract(contractId));

				} catch (e) {
					//
				}

				if (log && Array.isArray(log) && TypesHelper.isErc20Contract(code)) {

					const symbol = FormatHelper
						.toUtf8((await echo.api.callContractNoChangingState(contractId, NATHAN.ID, { asset_id: ECHO_ASSET.ID, amount: 0 }, ERC20_HASHES['symbol()'])).slice(128));

					const precision = await this.getPrecision(contractId);

					let internalTransfers = log
						.filter(({ address }) => `${CONTRACT_OBJECT_PREFIX}.${parseInt(address.slice(2), 16)}` === contractId);
					const internalTransfersTransfer = internalTransfers
						.filter(({ log: logs }) => logs[0].startsWith(ERC20_HASHES['Transfer(address,address,uint256)']))
						.map((event, i) => this.parseTransferEvent(event, symbol, precision, i === 0 ? 'Token transfer' : ''));
					const internalTransfersApproval = internalTransfers
						.filter(({ log: logs }) => logs[0].startsWith(ERC20_HASHES['Approval(address,address,uint256)']))
						.map((event, i) => this.parseTransferEvent(event, symbol, precision, i === 0 ? 'Token approval' : ''));
					const internalTransfersWithdrawal = internalTransfers
						.filter(({ log: logs }) => logs[0].startsWith(ERC20_HASHES['Withdrawal(address, uint256)']))
						.map((event, i) => this.parseWithdrawalEvent(event, symbol, precision, i === 0 ? 'Token withdrawal' : '', contractId, false));
					const internalTransfersDeposit = internalTransfers
						.filter(({ log: logs }) => logs[0].startsWith(ERC20_HASHES['Deposit(address, uint256)']))
						.map((event, i) => this.parseWithdrawalEvent(event, symbol, precision, i === 0 ? 'Token deposit' : '', contractId, true));
					internalTransfers = [...internalTransfersTransfer, ...internalTransfersApproval, ...internalTransfersWithdrawal, ...internalTransfersDeposit];
					internalTransfers = await Promise.all(internalTransfers);
					internalTransactions = [...internalTransfers, ...internalTransactions];
				}

				result.internal = internalTransactions.map((i) => ({
					from: i.from,
					subject: i.subject,
					value: Object.assign({ amount: 0, symbol: ECHO_ASSET.SYMBOL, precision: ECHO_ASSET.PRECISION }, i.value ? i.value : {}),
					label: i.label || i.name,
				}));
			}
		}

		if (!result.value && result.internal && result.internal[0] && result.internal[0].value) {
			result.value = result.internal[0].value;
		}
		return result;
	}

	async getOperation([type, options], blockNumber, blockTimestamp, trIndex, opIndex, operationResult, number = null, accountId = null, trId = null) {
		const operation = Object.values(Operations).find((i) => i.value === type);

		delete options.memo;
		delete options.extensions;
		delete options.gasPrice;
		delete options.eth_accuracy;

		const {
			from, subject, value: opValue, asset: opAsset, internal,
		} = await this.formatOperation([type, options], accountId, blockNumber, trIndex, opIndex, operationResult);

		let objectInfo = await this.setOperationObject(operation, options, from, subject, opIndex);

		options = Object.entries(options).map(async ([key, value]) => {
			let link = null;
			switch (typeof value) {
				case 'number':
					value = {
						precision: ECHO_ASSET.PRECISION,
						symbol: ECHO_ASSET.SYMBOL,
						amount: value,
					};
					break;
				case 'string':
					if (value === '') {
						return {};
					}

					if (validators.isAccountId(value) || validators.isAssetId(value)) {
						const object = await echo.api.getObject(value);
						link = value;
						value = validators.isAccountId(value) ? object.name : object.symbol;
					}
					break;
				case 'object':
					if (_.has(value, 'amount') && value.asset_id) {
						const asset = await echo.api.getObject(value.asset_id);
						delete value.asset_id;
						value.precision = asset.precision;
						value.symbol = asset.symbol;
					} else {
						return {};
					}
					break;
				case 'boolean':
					value = value ? 'Yes' : 'No';
					break;
				default:
					break;
			}

			switch (key) {
				case 'code':
					key = 'bytecode';
					break;
				case 'callee':
					key = 'contract id';
					link = value;
					break;
				default:
					break;
			}

			return { [key]: link ? { value, link } : value };
		});

		options = await Promise.all(options);

		options = options.reduce((obj, op) => ({ ...obj, ...op }), {});

		if ([
			OPERATIONS_IDS.CONTRACT_CREATE,
			OPERATIONS_IDS.CONTRACT_CALL,
			OPERATIONS_IDS.CONTRACT_TRANSFER,
		].includes(type)) {
			if (internal) {
				options['token transfers'] = internal;
			}

			try {
				const [, resultId] = operationResult;

				const [contractResultType, result] = await echo.api.getContractResult(resultId);

				if (contractResultType === CONTRACT_RESULT_TYPE_0) {
					const { exec_res: { excepted, code_deposit, new_address }, tr_receipt: { log } } = result;

					options.excepted = _.startCase(excepted);
					options['code deposit'] = code_deposit;

					if (parseInt(new_address, 10)) {
						const id = ConvertHelper.toContractId(new_address);
						options['new contract id'] = { value: id, link: id };
					}

					if (log.length) {
						options.logs = log.map(({ address, data, log: topics }) => {
							const convertedContract = ConvertHelper.toContractId(address);
							return { topics, contract: convertedContract, data };
						});
					}

				}
			// eslint-disable-next-line no-empty
			} catch (error) {
			}
		}

		if (options['new contract id']) {
			objectInfo = await this.setContractObject(options['new contract id'].value, opIndex);
		} else if (options.caller) {
			objectInfo = await this.setContractObject(options.caller);
		} else if (options['contract id']) {
			objectInfo = await this.setContractObject(options['contract id'].value);
		}

		let result = null;
		switch (type) {
			case OPERATIONS_IDS.CONTRACT_CREATE:
				if (options['new contract id']) {
					result = options['new contract id'].value;
				} else {
					[, result] = operationResult;
				}
				break;
			case OPERATIONS_IDS.ACCOUNT_CREATE:
				result = options.Name;
				break;
			default:
				[, result] = operationResult;
				break;
		}

		return {
			mainInfo: {
				from,
				subject,
				asset: opAsset,
				value: opValue,
				result,
			},
			objectInfo,
			type: operation.name,
			...options,
			blockNumber,
			id: trId,
			trIndex,
			number,
			blockTimestamp,
			opIndex,
		};

	}

	getTransaction(blockNumber, index) {
		return async (dispatch) => {
			dispatch(this.setValue('loading', true));
			try {
				const block = await echo.api.getBlock(blockNumber);

				if (!block || !block.transactions[index - 1]) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				const transaction = block.transactions[index - 1];

				await this.fetchTransactionsObjects(transaction.operations);

				let operations = transaction.operations.map(async (operation, opIndex) => {
					const op = await this.getOperation(
						operation,
						parseInt(blockNumber, 10),
						block.timestamp,
						index - 1,
						opIndex,
						transaction.operation_results[opIndex],
					);
					return op;
				});

				operations = await Promise.all(operations);
				dispatch(this.setValue('operations', new List(operations)));
			} catch (err) {
				dispatch(this.setValue('error', FormatHelper.formatError(err)));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

}

export default new TransactionActionsClass();

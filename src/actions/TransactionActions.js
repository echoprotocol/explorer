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

import ConvertHelper from '../helpers/ConvertHelper';
import FormatHelper from '../helpers/FormatHelper';

import TransactionReducer from '../reducers/TransactionReducer';

import BaseActionsClass from './BaseActionsClass';
import GlobalActions from './GlobalActions';
import { formatOperation } from './BlockActions';

import { getContractInfo } from '../services/queries/contract';

class TransactionActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(TransactionReducer);
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
				.set('ethAccuracy', ethAccuracy ? 'Yes' : 'No')
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
				const accounts = await echo.api.getObjects([account.registrar, account.options.voting_account, account.options.delegating_account]);

				object = object
					.set('id', account.id)
					.set('name', account.name)
					.set('echorandKey', account.echorand_key)
					.set('activeAccounts', activeAccounts)
					.set('activeKeys', account.active.key_auths.map(([key]) => key))
					.set('registrar', accounts[0] && accounts[0].name)
					.set('voting', accounts[1] && accounts[1].name)
					.set('delegating', accounts[2] && accounts[2].name);
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

				let operations = transaction.operations.map(async ([type, options], opIndex) => {
					const operation = Object.values(Operations).find((i) => i.value === type);

					delete options.memo;
					delete options.extensions;
					delete options.gasPrice;
					delete options.eth_accuracy;

					const {
						from, subject, value: opValue, asset: opAsset, internal,
					} = await formatOperation([type, options], null, blockNumber, index - 1, opIndex, transaction.operation_results[opIndex]);

					let objectInfo = await this.setOperationObject(operation, options, from, subject, opIndex);

					options = Object.entries(options).map(async ([key, value]) => {
						let link = null;

						switch (typeof value) {
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

						const [, resultId] = transaction.operation_results[opIndex];

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
					}

					if (options['new contract id']) {
						objectInfo = await this.setContractObject(options['new contract id'].value, opIndex);
					} else if (options['contract id']) {
						objectInfo = await this.setContractObject(options['contract id'].value);
					}

					let result = null;
					switch (type) {
						case OPERATIONS_IDS.CONTRACT_CREATE:
							result = options['new contract id'].value;
							break;
						case OPERATIONS_IDS.ACCOUNT_CREATE:
							result = options.Name;
							break;
						default:
							[, result] = transaction.operation_results[opIndex];
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
					};
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

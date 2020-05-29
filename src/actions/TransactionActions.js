/* eslint-disable camelcase */
import echo, { OPERATIONS_IDS, validators } from 'echojs-lib';
import { List, Map } from 'immutable';
import _ from 'lodash';
import BN from 'bignumber.js';
import moment from 'moment';

import Operations, {
	accountOperations,
	assetOperations,
	committeeOperations,
	proposalOperations,
	sidechainOperations,
	contractOperations,
	sidechainBtcOperations,
	didOperations,
} from '../constants/Operations';
import { CONTRACT_RESULT_TYPE_0 } from '../constants/ResultTypeConstants';
import { ERC20_HASHES, ECHO_ASSET, NATHAN, EBTC_ASSET_ID, EETH_ASSET_ID } from '../constants/GlobalConstants';
import { ACCOUNT_OBJECT_PREFIX, CONTRACT_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';

import ConvertHelper from '../helpers/ConvertHelper';
import FormatHelper from '../helpers/FormatHelper';
import TypesHelper from '../helpers/TypesHelper';

import TransactionReducer from '../reducers/TransactionReducer';

import BaseActionsClass from './BaseActionsClass';
import GlobalActions from './GlobalActions';

import { getContractInfo } from '../services/queries/contract';
import { transformOperationDataByType } from '../services/transform.ops';
import GridActions from './GridActions';
import { TRANSACTION_GRID } from '../constants/TableConstants';
import { countRate } from '../services/transform.ops/AddInfoHelper';
import { getConrtactOperations, getSingleOpeation, getAccountCondition } from '../services/queries/history';
import URLHelper from '../helpers/URLHelper';
import { SIDECHAIN_OPS_DEFAULT_ASSETS } from '../constants/OpsFormatConstants';

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
			const { contractInfo } = await getContractInfo({ id });
			const {
				type, eth_accuracy: ethAccuracy,
			} = contractInfo;
			let { supported_asset_id: supportedAsset } = contractInfo;

			if (supportedAsset !== null) {
				supportedAsset = (await echo.api.getObject(supportedAsset)).symbol;
			}
			const [chainContract] = await echo.api.getContracts([id]);
			const { whitelist, blacklist } = await echo.api.getContractPoolWhitelist(id);
			const contractPoolBalance = await echo.api.getContractPoolBalance(id);
			const [owner] = await echo.api.getAccounts([chainContract.owner]);
			const [assetPoolBalance] = await echo.api.getAssets([contractPoolBalance.asset_id]);

			const whitelistAccounts = await echo.api.getAccounts(whitelist);
			const blacklistAccounts = await echo.api.getAccounts(blacklist);

			return new Map({})
				.set('type', chainContract.type)
				.set('owner', { link: owner.id, value: owner.name })
				.set('whitelist', whitelistAccounts.map((account) => ({ value: account.name, link: account.id })))
				.set('blacklist', blacklistAccounts.map((account) => ({ value: account.name, link: account.id })))
				.set('contractPoolBalance', {
					asset_id: assetPoolBalance.id,
					symbol: assetPoolBalance.symbol,
					precision: assetPoolBalance.precision,
					amount: contractPoolBalance.amount,
				})
				.set('supportedAsset', supportedAsset)
				.set('ethAccuracy', ethAccuracy ? 'Activated' : 'Inactivated')
				.set('token', contractInfo.token === 'erc20' ? {
					id: contractInfo.id,
					...contractInfo.token,
				} : null)
				.set('erc20', type && type === 'erc20' ? 'Yes' : 'No');
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
	async setOperationObject(operation, options, from, subject, operationResult, opInfo, isEchodbObject) {
		let object = new Map({});
		try {
			if (accountOperations.includes(operation.name)) {
				let account = await echo.api.getObject(from.id);
				if (operation.name === Operations.account_create.name) {
					account = await echo.api.getObject(subject.id);
				}

				let singleOperation = {};

				if (isEchodbObject) {
					singleOperation = options;
				} else {
					try {
						const operationFromGraphQl = await getSingleOpeation(opInfo.block, opInfo.trxInblock, opInfo.opInTrx);
						singleOperation = operationFromGraphQl.getSingleOperation && operationFromGraphQl.getSingleOperation.body;
					} catch (e) {
						//
					}
				}

				const activeAccounts = await Promise.all(account.active.account_auths.map(async ([id]) => {
					const acc = await echo.api.getObject(id);
					return acc && acc.name;
				}));
				const accounts = await echo.api.getObjects([account.registrar, account.options.delegating_account]);
				const key_auths = [...account.active.key_auths, ...account.active.account_auths].map(([value, weight]) => ({ value, weight }));
				object = object
					.set('id', account.id)
					.set('name', account.name)
					.set('echorandKey', account.echorand_key)
					.set('active', account.active)
					.set('key_auths', key_auths)
					.set('weight_threshold', account.weight_threshold)
					.set('activeAccounts', activeAccounts)
					.set('activeKeys', account.active.key_auths.map(([key]) => key))
					.set('registrar', accounts[0] && accounts[0].name)
					.set('delegating', accounts[1] && accounts[1].name)
					.set('assets', singleOperation.assets)
					.set('evm_address', singleOperation.evm_address);
			} else if (contractOperations.includes(operation.name)) {
				let contractId;
				let isNeedLink = false;
				switch (operation.name) {
					case Operations.contract_internal_create.name:
						isNeedLink = true;
						[contractId] = ((await echo.api.getObject(operationResult[1])).contracts_id);
						break;
					case Operations.contract_create.name:
						[contractId] = ((await echo.api.getObject(operationResult[1])).contracts_id);
						break;
					case Operations.contract_internal_call.name:
						isNeedLink = true;
						contractId = options.callee;
						break;
					case Operations.contract_call.name:
						contractId = options.callee;
						break;
					case Operations.contract_selfdestruct.name:
						isNeedLink = true;
						contractId = options.contract;
						break;
					case Operations.contract_update.name:
					case Operations.contract_fund_pool.name:
					case Operations.contract_whitelist.name:
						contractId = options.contract;
						break;
					default:
						break;
				}
				const contract = await echo.api.getObject(contractId);
				const contractAdditionalInfo = await echo.api.getFullContract(contractId);
				const { contractInfo } = await getContractInfo({ id: contractId });
				const { history } = await getConrtactOperations(contractId);
				object = object
					.set('id', contractId)
					.set('type', contractInfo.type)
					.set('ethAccuracy', contract.eth_accuracy)
					.set('supportedAsset', contract.supported_asset)
					.set('owner', contract.owner)
					.set('contractPoolBalance', contractAdditionalInfo.poolBalance)
					.set('whitelist', contractAdditionalInfo.whitelist || [])
					.set('blacklist', contractAdditionalInfo.blacklist || []);
				const currentOp = history.items.find((el) => el.trx_in_block === opInfo.trxInblock &&
					el.op_in_trx === opInfo.opInTrx &&
					el.block.round === opInfo.block);
				if (currentOp.body.asset_tranfers) {
					const assetTransfers = await this.formatAssetsTransfer(currentOp.body.asset_tranfers);
					object = object
						.set('asset_transfers', assetTransfers);
				}
				if (isNeedLink) {
					object = object
						.set('link', URLHelper.createOperationObjectsUrl(currentOp.block.round, currentOp.trx_in_block + 1, currentOp.op_in_trx + 1, currentOp.virtual));
				}
				if (currentOp.body.virtual_operations.length) {
					const formatVirtualOps = currentOp.body.virtual_operations.map((op) => this.formatOperation(op));
					const virtualOps = await Promise.all(formatVirtualOps);
					const formatted = virtualOps.map((el) => {
						let contractIdInOp;
						if (el.from && validators.isContractId(el.from.id)) {
							contractIdInOp = from.id;
						}
						if (el.subject && validators.isContractId(el.subject.id)) {
							contractIdInOp = subject.id;
						}
						return {
							operationInfo: {
								type: el.name,
								bytecode: el.bytecode,
								asset_amount_sent: el.value,
								contract_id: contractIdInOp,
							},
						};
					});

					object = object.set('virtualOps', formatted);
				}
				if (contractInfo.token) {
					object = object.set('token', contractInfo.token);
				}
			} else if (assetOperations.includes(operation.name)) {
				let assetId = null;
				if (operation.options.asset) {
					assetId = _.get(options, operation.options.asset);
				}
				let asset = null;
				try {
					asset = await echo.api.getObject(assetId || subject.id);
				} catch (e) {
					//
				}
				object = object
					.set('type', 'No');
				if (asset) {
					let issuer = null;
					try {
						issuer = await echo.api.getObject(asset.issuer);
					} catch (e) {
						//
					}
					const rate = await countRate(asset, asset.options.core_exchange_rate);
					const price = new BN(asset.options.core_exchange_rate.quote.amount)
						.div(asset.options.core_exchange_rate.base.amount)
						.toString();
					const accumulatedFees = asset.dynamic.accumulated_fees;
					const quoteAmount = asset.options.core_exchange_rate.quote.amount;
					object = object
						.set('id', asset.id)
						.set('name', asset.symbol)
						.set('total_supply', {
							amount: asset.dynamic.current_supply,
							precision: asset.precision,
							symbol: asset.symbol,
							asset_id: asset.id,
						})
						.set('price', price)
						.set(
							'accumulated_fees',
							{
								amount: accumulatedFees === 0 ? 0 : new BN(accumulatedFees).div(quoteAmount).toString(10),
								symbol: asset.symbol,
								precision: asset.precision,
								asset_id: asset.id,

							},
						)
						.set('rate', rate)
						.set('issuer', issuer && issuer.name)
						.set('precision', asset.precision)
						.set('issuer_permissions', asset.options.issuer_permissions)
						.set('flags', asset.options.flags)
						.set('description', asset.options.description)
						.set('bitAssetOps', asset.bitasset ? asset.bitasset.options : null)
						.set('maxSupply', asset.options.max_supply);
				}
			} else if (committeeOperations.includes(operation.name)) {
				const accountId = from.id || subject.id;
				let committee;

				if (operation.name === Operations.committee_member_update_global_parameters.name) {
					const currentParameters = (await echo.api.getGlobalProperties()).parameters;
					object = object
						.set('current_parameters', FormatHelper.formatGlobalParameters(currentParameters))
						.set('new_parameters', FormatHelper.formatGlobalParameters(options.new_parameters));
				}
				if (accountId) {
					committee = await echo.api.getCommitteeMemberByAccount(accountId);
				}
				if (committee) {
					const frozenBalance = await echo.api.getCommitteeFrozenBalance(committee.id);
					const [asset] = await echo.api.getAssets([frozenBalance.asset_id]);

					object = object
						.set('committee', committee)
						.set('frozenBalance', {
							amount: frozenBalance.amount,
							asset_id: asset.id,
							symbol: asset.symbol,
							precision: asset.precision,
						});
				}
			} else if (proposalOperations.includes(operation.name)) {
				let singleOperation = {};
				if (isEchodbObject) {
					singleOperation = options;
					singleOperation.result = operationResult;
				} else {
					try {
						const operationFromGraphQl = await getSingleOpeation(opInfo.block, opInfo.trxInblock, opInfo.opInTrx);
						singleOperation = operationFromGraphQl.getSingleOperation && operationFromGraphQl.getSingleOperation.body;
						singleOperation.result = operationFromGraphQl.getSingleOperation.result;
					} catch (e) {
						//
					}
				}
				const operations = options.proposed_ops ? options.proposed_ops.map((el) => {
					const opType = el.op[0];
					const op = Object.values(Operations).find((i) => i.value === opType);
					return op && op.name;
				}) : undefined;

				object = object
					.set('id', singleOperation.proposal || singleOperation.result)
					.set('expirationTime', singleOperation.expiration_time)
					.set('reviewPeriodSeconds', singleOperation.review_period_seconds)
					.set('active_approvals_to_add', singleOperation.active_approvals_to_add)
					.set('active_approvals_to_remove', singleOperation.active_approvals_to_remove)
					.set('key_approvals_to_add', singleOperation.key_approvals_to_add)
					.set('key_approvals_to_remove', singleOperation.key_approvals_to_remove)
					.set('operations', operations);

				if (singleOperation.have_delete_operation) {
					object = object
						.set('statuc', 'rejected');
				}
				let opWithApprovals = {};
				if (operation.name !== Operations.proposal_create.name) {
					const opIndex = singleOperation.create_operation.split('-').map((el) => +el);
					const fullOpWithApprovals = await getSingleOpeation(...opIndex);
					opWithApprovals = fullOpWithApprovals.getSingleOperation.body;
					opWithApprovals.result = fullOpWithApprovals.getSingleOperation.result;
				} else {
					opWithApprovals = singleOperation;
				}

				const accountAuth = (await getAccountCondition(singleOperation.fee_paying_account, opWithApprovals.expiration_time))
					.getAccountCondition;
				const authArray = [...accountAuth.key_auths, ...accountAuth.account_auths];
				const keyWeight = opWithApprovals.approvals ? opWithApprovals.approvals.reduce((sum, key) => {
					const keyData = authArray.find((el) => el.key === key);
					return keyData ? +keyData.value + sum : sum;
				}, 0) : 0;
				object = object
					.set('count_approvals', { value: keyWeight, total: accountAuth.weight_threshold })
					.set('count_signatures', opWithApprovals.approvals ? opWithApprovals.approvals.length : 0)
					.set('proposal_operations', opWithApprovals.proposed_ops);
				if (moment() < moment(opWithApprovals.expiration_time)) {
					if (moment() > moment(opWithApprovals.expiration_time).subtract(opWithApprovals.review_period_seconds, 'seconds')) {
						object = object
							.set('status', 'in review');
					} else {
						object = object
							.set('status', 'voting');
					}
				} else {
					object = object
						.set('status', keyWeight >= accountAuth.weight_threshold ? 'resolved' : 'rejected');
				}
			} else if (sidechainOperations.includes(operation.name)) {
				let objectWithApprovals = { approves: [], is_approved: false };

				let singleOperation = {};
				if (isEchodbObject) {
					singleOperation = options;
				} else {
					try {
						const operationFromGraphQl = await getSingleOpeation(
							opInfo.block,
							opInfo.trxInblock,
							opInfo.opInTrx,
							opInfo.virtual,
						);
						singleOperation = operationFromGraphQl.getSingleOperation && operationFromGraphQl.getSingleOperation.body;
						singleOperation.result = operationFromGraphQl.getSingleOperation && operationFromGraphQl.getSingleOperation.result;
					} catch (e) {
						//
					}
				}

				switch (operation.name) {
					case Operations.sidechain_eth_approve_address.name:
						objectWithApprovals = await echo.api.getObject(singleOperation.result);
						object = object
							.set('eth_addr', FormatHelper.addEthPrefix(objectWithApprovals.eth_addr));
						break;
					case Operations.sidechain_eth_create_address.name: {
						const ethAddress = await echo.api.getEthAddress(options.account);
						if (ethAddress) {
							object = object
								.set('eth_addr', FormatHelper.addEthPrefix(ethAddress.eth_addr));
							objectWithApprovals = ethAddress;
						}
						break;
					}
					case Operations.deposit_eth.name: {
						const deposits = await echo.api.getAccountDeposits(options.account, 'eth');
						if (!deposits) {
							break;
						}
						objectWithApprovals = deposits.find((el) => el.deposit_id === options.deposit_id) || {};
						object = object
							.set('deposit_id', objectWithApprovals.id)
							.set('transaction_hash', FormatHelper.addEthPrefix(objectWithApprovals.transaction_hash));
						break;
					}
					case Operations.eth_send_deposit.name: {
						objectWithApprovals = await echo.api.getObject(options.deposit_id);
						object = object
							.set('deposit_id', objectWithApprovals.id)
							.set('transaction_hash', FormatHelper.addEthPrefix(objectWithApprovals.transaction_hash))
							.set('amount', singleOperation.amount);
						break;
					} case Operations.eth_update_contract_address:
						object = object
							.set('new_addr', FormatHelper.addEthPrefix(singleOperation.new_addr));
						break;
					case Operations.approve_erc20_token_withdraw.name: {
						const originalOpIndexes = singleOperation.sidchain_erc_20_withdraw_token.split('-');
						const originalOp = await getSingleOpeation(...originalOpIndexes.map((i) => (+i)));
						objectWithApprovals = await echo.api.getObject(originalOp.getSingleOperation.body.withdraw_id);
						object = object
							.set('withdraw_id', objectWithApprovals.id)
							.set('sidchain_erc_20_withdraw_token', singleOperation.sidchain_erc_20_withdraw_token)
							.set('transaction_hash', FormatHelper.addEthPrefix(singleOperation.transaction_hash))
							.set('original_operation', URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_erc_20_withdraw_token));
						break;
					} case Operations.sidechain_erc20_issue.name: {
						const token = await echo.api.getObject(options.token);
						const listApprovals = singleOperation.list_of_approvals
							&& singleOperation.list_of_approvals.map((v) => URLHelper.transformEchodbOperationLinkToExplorerLink(v, false));
						object = object
							.set('token', { value: token.symbol, link: token.id })
							.set('list_approvals', listApprovals)
							.set('original_operation', URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_erc_20_deposit_token));
						break;
					} case Operations.sidechain_erc20_burn.name: {
						const token = await echo.api.getObject(options.token);
						const listApprovals = singleOperation.list_of_approvals
							&& singleOperation.list_of_approvals.map((v) => URLHelper.transformEchodbOperationLinkToExplorerLink(v, false));
						object = object
							.set('token', { value: token.symbol, link: token.id })
							.set('list_approvals', listApprovals)
							.set('original_operation', URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_erc_20_withdraw_token));
						break;
					} case Operations.eth_send_withdraw.name:
						objectWithApprovals = await echo.api.getObject(options.withdraw_id);
						object = object
							.set('original_operation', URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_eth_withdraw));
						break;
					case Operations.approve_withdraw_eth.name: {
						const withdrawId = `1.15.${options.withdraw_id}`;
						objectWithApprovals = await echo.api.getObject(withdrawId);
						object = object
							.set('original_operation', URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_eth_withdraw))
							.set('transaction_hash', FormatHelper.addEthPrefix(objectWithApprovals.transaction_hash))
							.set('withdraw_id', withdrawId);
						break;
					} case Operations.withdraw_eth.name: {
						objectWithApprovals = await echo.api.getObject(getSingleOpeation.result);
						object = object
							.set('transaction_hash', FormatHelper.addEthPrefix(objectWithApprovals.transaction_hash))
							.set('eth_address', FormatHelper.addEthPrefix(singleOperation.eth_addr));
						break;
					} case Operations.sidechain_issue.name: {
						const listApprovals = singleOperation.list_of_approvals
							&& singleOperation.list_of_approvals.map((v) => URLHelper.transformEchodbOperationLinkToExplorerLink(v, false));
						const originalOperation = singleOperation.sidchain_eth_deposit
							&& URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_eth_deposit);
						object = object
							.set('original_operation', originalOperation)
							.set('list_approvals', listApprovals);
						break;
					}
					case Operations.sidechain_burn.name: {
						const listApprovals = singleOperation.list_of_approvals
							&& singleOperation.list_of_approvals.map((v) => URLHelper.transformEchodbOperationLinkToExplorerLink(v, false));
						const originalOperation = singleOperation.sidchain_eth_withdraw
							&& URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_eth_withdraw);
						object = object
							.set('original_operation', originalOperation)
							.set('list_approvals', listApprovals);
						break;
					}
					case Operations.register_erc20_token.name: {
						const contractObject = await echo.api.getObject(operationResult[1]);
						object = object
							.set('decimals', String(options.decimals))
							.set('eth_addr', FormatHelper.addEthPrefix(singleOperation.eth_addr));
						if (!contractObject) {
							break;
						}
						object = object
							.set('contract', contractObject.contract);
						break;
					}
					case Operations.erc20_send_deposit.name: {
						objectWithApprovals = await echo.api.getObject(options.deposit_id);

						object = object
							.set('original_operation', URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_erc20_token_deposit));
						break;
					}
					case Operations.withdraw_erc20_token.name: {
						const token = await echo.api.getObject(options.erc20_token);
						objectWithApprovals = await echo.api.getObject(operationResult[1]);
						object = object
							.set('token', { value: token.symbol, link: token.id })
							.set('transaction_hash', FormatHelper.addEthPrefix(objectWithApprovals.transaction_hash));
						break;
					}
					case Operations.deposit_erc20_token.name: {
						const [, result] = operationResult || [];
						objectWithApprovals = await echo.api.getObject(result) || {};
						object = object
							.set('from_address', FormatHelper.addEthPrefix(singleOperation.erc20_token_addr))
							.set('deposit_id', objectWithApprovals.id)
							.set('transaction_hash', FormatHelper.addEthPrefix(objectWithApprovals.transaction_hash))
							.set('to', FormatHelper.addEthPrefix(objectWithApprovals.to));
						break;
					}
					case Operations.erc20_send_withdraw.name: {
						objectWithApprovals = await echo.api.getObject(options.withdraw_id);
						object = object
							.set('original_operation', URLHelper.transformEchodbOperationLinkToExplorerLink(singleOperation.sidchain_erc_20_withdraw_token))
							.set('transaction_hash', FormatHelper.addEthPrefix(objectWithApprovals.transaction_hash));
						break;
					} default:
						break;
				}

				const total = (await echo.api.getObject('2.0.0')).active_committee_members.length;
				let approves = objectWithApprovals.approves ? objectWithApprovals.approves.length : 0;

				if (approves === 0 && objectWithApprovals.is_approved) {
					approves = total;
				}

				object = object
					.set('approves', approves)
					.set('total', total);
			} else if (sidechainBtcOperations.includes(operation.name)) {

				let singleOperation = {};
				if (isEchodbObject) {
					singleOperation = options;
				} else {
					try {
						const operationFromGraphQl = await getSingleOpeation(
							opInfo.block,
							opInfo.trxInblock,
							opInfo.opInTrx,
							opInfo.virtual,
						);
						singleOperation = operationFromGraphQl.getSingleOperation && operationFromGraphQl.getSingleOperation.body;
						singleOperation.result = operationFromGraphQl.getSingleOperation && operationFromGraphQl.getSingleOperation.result;
					} catch (e) {
						//
					}
				}

				let objectWithApprovals = null;
				switch (operation.name) {
					case Operations.sidechain_btc_create_intermediate_deposit.name:
						objectWithApprovals = singleOperation.result;
						break;
					case Operations.sidechain_btc_intermediate_deposit.name: {
						objectWithApprovals = await echo.api.getObject(singleOperation.intermediate_address_id);
						const fromAccount = await echo.api.getObject(objectWithApprovals.account);
						object = object.set('account', { link: fromAccount.id, value: fromAccount.name });
						break;
					}
					case Operations.sidechain_btc_deposit.name:
						objectWithApprovals = await echo.api.getObject(singleOperation.intermediate_deposit_id);
						break;
					case Operations.sidechain_btc_withdraw.name:
						objectWithApprovals = singleOperation.result;
						break;
					case Operations.sidechain_btc_aggregate.name:
						objectWithApprovals = singleOperation.result;
						break;
					case Operations.sidechain_btc_approve_aggregate.name:
						objectWithApprovals = singleOperation.result;
						break;
					default:
						break;
				}
				if (objectWithApprovals) {
					const total = (await echo.api.getObject('2.0.0')).active_committee_members.length;
					let approves = objectWithApprovals.approves ? objectWithApprovals.approves.length : 0;
					if (approves === 0 && objectWithApprovals.is_approved) {
						approves = total;
					}
					object = object
						.set('approves', approves)
						.set('total', total);
				}
				object = object
					.set('transaction_hash', singleOperation.transaction_id || singleOperation.transaction_hash)
					.set('received_deposit_address', singleOperation.received_deposit_address)
					.set('deposit_address', singleOperation.deposit_address)
					.set('intermediate_address', singleOperation.intermediate_address)
					.set('intermediate_address_id', singleOperation.intermediate_address_id)
					.set('intermediate_deposit_id', singleOperation.intermediate_deposit_id)
					.set('btc_addr', singleOperation.btc_addr)
					.set('aggregation_out_value', singleOperation.aggregation_out_value)
					.set('btc_block_number', singleOperation.btc_block_number)
					.set('sma_address', singleOperation.sma_address && singleOperation.sma_address.address)
					.set('amount', singleOperation.amount || singleOperation.value)
					.set('deposits', singleOperation.deposits)
					.set('withdrawals', singleOperation.withdrawals)
					.set('committee_member_id', singleOperation.committee_member_id)
					.set('committee_member_ids_in_script', singleOperation.committee_member_ids_in_script)
					.set('signature', singleOperation.signature)
					.set('signatures', singleOperation.signatures)
					.set('aggregate_request_operation', singleOperation.aggregate_request_operation);
			} else if (didOperations.includes(operation.name)) {
				object = object
					.set('public_keys', options.public_keys && options.public_keys.map((el, i) => ({ key: i, value: el })))
					.set('pub_keys_to_delete', options.pub_keys_to_delete && options.pub_keys_to_delete.map((el, i) => ({ key: i, value: el })))
					.set('pub_keys_to_add', options.pub_keys_to_add && options.pub_keys_to_add.map((el, i) => ({ key: i, value: el })));
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

		const { name, options, value: opId } = Object.values(Operations).find((i) => i.value === type);
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
				if (opId === OPERATIONS_IDS.TRANSFER_TO_ADDRESS) {
					const toAccountId = await echo.api.getAccountByAddress(request);
					const [toAccount] = await echo.api.getAccounts([toAccountId]);
					result.subject = { id: toAccountId, name: toAccount.name, address: request };
				} else if (opId === OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_WITHDRAW) {
					result.subject = { id: `1.15.${request}` };
				} else {
					result.subject = { id: response.id, name: request };
				}
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
			const defaultAsset = await this.getDefaultOperationAsset(type);
			result.value = {
				...result.value,
				...defaultAsset,
			};
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

	getProposalOperations(proposedOps = [], blockNumber, blockTimestamp, trIndex) {
		return proposedOps.map(async (proposedOp, proposedOpIndex) => {
			const [idPropOp] = proposedOp.op;
			let propData = {};
			try {
				propData = await this.getOperation(
					proposedOp.op,
					blockNumber,
					blockTimestamp,
					trIndex,
					proposedOpIndex,
					[],
					null,
					null,
					false,
					false,
				);
			} catch (err) {
				console.log('Error to parse proposal props', err);
			}
			let transformData = {};
			try {
				transformData = await transformOperationDataByType(idPropOp, propData);
			} catch (err) {
				console.log('Error to transformOperationDataByType', err);
			}
			return transformData;
		});
	}

	async getDefaultOperationAsset(type) {
		let assetId;
		if (SIDECHAIN_OPS_DEFAULT_ASSETS.BTC.includes(type)) {
			assetId = EBTC_ASSET_ID;
		} else if (SIDECHAIN_OPS_DEFAULT_ASSETS.ETH.includes(type)) {
			assetId = EETH_ASSET_ID;
		} else {
			assetId = ECHO_ASSET.ID;
		}
		const asset = await echo.api.getObject(assetId);
		return {
			id: assetId,
			precision: asset.precision,
			symbol: asset.symbol,
		};
	}

	async getOperation(
		[type, options],
		blockNumber,
		blockTimestamp,
		trIndex,
		opIndex,
		operationResult,
		number = null,
		accountId = null,
		trId = null,
		virtual = false,
		isEchodbObject = false,
		requestDetails = true,
	) {
		const operation = Object.values(Operations).find((i) => i.value === type);

		delete options.memo;
		delete options.extensions;
		delete options.gasPrice;
		delete options.eth_accuracy;

		const {
			from, subject, value: opValue, asset: opAsset, internal,
		} = await this.formatOperation([type, options], accountId, blockNumber, trIndex, opIndex, operationResult);
		const opInfo = {
			block: blockNumber,
			trxInblock: trIndex,
			opInTrx: opIndex,
			virtual,
		};

		let objectInfo = new Map();

		if (!isEchodbObject || requestDetails) {
			objectInfo = await this.setOperationObject(operation, options, from, subject, operationResult, opInfo, isEchodbObject);
		}
		options = Object.entries(options).map(async ([key, value]) => {
			let link = null;
			switch (typeof value) {
				case 'number': {
					const defaultAsset = await this.getDefaultOperationAsset(type);
					value = {
						asset_id: defaultAsset.id,
						precision: defaultAsset.precision,
						symbol: defaultAsset.symbol,
						amount: value,
					};
					break;
				} case 'string':
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
						value.precision = asset.precision;
						value.symbol = asset.symbol;
					} else if (_.has(value, 'delegating_account')) {
						const [account] = await echo.api.getAccounts([value.delegating_account]);
						value = { value: account.name, link: value.delegating_account, amount: value.delegate_share };
						key = 'delegate_data';
					} else if (key === 'new_feed_producers') {
						const accounts = await echo.api.getAccounts(value);
						value = accounts.map(({ name, id }) => ({ value: name, link: id }));
					} else if (key === 'proposed_ops') {
						const [name, data] = value;
						value = [{ name, ...data }];
						break;
					} else if (key === 'policy') {
						value = value.map((data) => data);
					} else if (type === OPERATIONS_IDS.CONTRACT_WHITELIST) {
						break;
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
				case 'new_listing':
					value = value.amount;
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

		let contractObject;
		if (options['new contract id']) {
			contractObject = await this.setContractObject(options['new contract id'].value, opIndex);
		} else if (options.caller) {
			contractObject = await this.setContractObject(options.caller);
		} else if (options['contract id']) {
			contractObject = await this.setContractObject(options['contract id'].value);
		} else if (options.contract) {
			contractObject = await this.setContractObject(options.contract);
		}

		if (contractObject) {
			objectInfo = contractObject;
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
			case OPERATIONS_IDS.ACCOUNT_ADDRESS_CREATE: {
				const [, addressId] = operationResult;
				const [{ address }] = await echo.api.getObjects([addressId]);
				[, result] = operationResult;
				options.address = address;
				break;
			}
			case OPERATIONS_IDS.CONTRACT_WHITELIST:
				options.addedToWhitelist = (await echo.api.getAccounts(options.add_to_whitelist)).map((account) => ({ link: account.id, value: account.name }));
				options.removedFromWhitelist = (await echo.api.getAccounts(options.remove_from_whitelist)).map((account) => ({ link: account.id, value: account.name }));
				options.addedToBlacklist = (await echo.api.getAccounts(options.add_to_blacklist)).map((account) => ({ link: account.id, value: account.name }));
				options.removedFromBlacklist = (await echo.api.getAccounts(options.remove_from_blacklist)).map((account) => ({ link: account.id, value: account.name }));
				break;
			default:
				[, result] = operationResult;
				break;
		}

		if (operation.value === OPERATIONS_IDS.TRANSFER_TO_ADDRESS) {
			options.to_address = subject.address;
			options.to_account = { link: subject.id, value: subject.name };
		}

		if (options.delegate_data) {
			const { value, link, amount } = options.delegate_data;
			options.delegating_account = { value, link };
			options.delegate_share = {
				amount, symbol: ECHO_ASSET.SYMBOL, precision: ECHO_ASSET.PRECISION, asset_id: ECHO_ASSET.ID,
			};
			delete options.delegate_data;
		}

		const op = {
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
			virtual,
		};
		const opNumberToFormat = operation.value;

		op.operationsInfoData = (await transformOperationDataByType(opNumberToFormat, op));
		if (proposalOperations.includes(operation.name)) {
			try {
				const proposedOps = objectInfo.get('proposal_operations');
				if (proposedOps) {
					let promises = await this.getProposalOperations(proposedOps, blockNumber, blockTimestamp, trIndex);
					promises = await Promise.all(promises);
					delete op.proposed_ops;
					op.proposals = promises;
					op.operationsInfoData.proposalOperations = promises;
				}
			} catch (e) {
				//
			}

		}

		return op;
	}

	getTransaction(blockNumber, index, virtual = false) {
		return async (dispatch) => {
			virtual = typeof virtual === 'string' ? virtual === 'true' : !!virtual;
			dispatch(this.setValue('loading', true));
			try {
				const block = await echo.api.getBlock(blockNumber);
				if (!block) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				if (!block.transactions[index - 1] && !virtual) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				let transaction = {};

				if (virtual) {
					const operationResults = [];
					const virtualOperations = await echo.api.getBlockVirtualOperations(blockNumber);
					const filtredVirtualOperations = virtualOperations.filter(({ trx_in_block }) => trx_in_block === index - 1);

					if (!filtredVirtualOperations.length) {
						dispatch(GlobalActions.toggleErrorPath(true));
						return;
					}
					const transformedOperations = filtredVirtualOperations.reduce((res, { op, result }) => {
						operationResults.push(result);
						return [...res, op];
					}, []);
					transaction = {
						operations: transformedOperations,
						operation_results: operationResults,
					};
				} else {
					transaction = block.transactions[index - 1];
				}

				let operations = transaction.operations.map(async (operation, opIndex) => {
					const op = await this.getOperation(
						operation,
						parseInt(blockNumber, 10),
						block.timestamp,
						index - 1,
						opIndex,
						transaction.operation_results[opIndex],
						null,
						null,
						null,
						virtual,
						false,
					);
					return op;
				});

				operations = await Promise.all(operations);
				dispatch(GridActions.setTotalDataSize(TRANSACTION_GRID, operations.length));
				dispatch(this.setValue('operations', new List(operations)));
			} catch (err) {
				dispatch(this.setValue('error', FormatHelper.formatError(err)));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

	async formatAssetsTransfer(trasfers) {
		const transferPromise = async (tr) => {
			const from = await echo.api.getObject(tr.from);
			const to = await echo.api.getObject(tr.to);
			const asset = await echo.api.getObject(tr.value.asset_id);
			return {
				amount: {
					amount: tr.value.amount,
					precision: asset.precision,
					symbol: asset.symbol,
				},
				from: {
					value: from.name,
					link: from.id,
				},
				to: {
					value: to.name,
					link: to.id,
				},
			};
		};
		const formatted = await Promise.all(trasfers.map((el) => transferPromise(el)));
		return formatted;
	}

}

export default new TransactionActionsClass();

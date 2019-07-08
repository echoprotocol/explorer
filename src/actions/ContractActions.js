import echo, { OPERATIONS_IDS, validators } from 'echojs-lib';
import { List, fromJS, Map } from 'immutable';
import { batchActions } from 'redux-batched-actions';

import { DEFAULT_OPERATION_HISTORY_ID, DEFAULT_ROWS_COUNT } from '../constants/GlobalConstants';
import { OPERATION_HISTORY_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';
import { MODAL_SUCCESS, MODAL_ERROR } from '../constants/ModalConstants';
import { CONTRACT_ABI } from '../constants/RouterConstants';

import ContractHelper from '../helpers/ContractHelper';
import URLHelper from '../helpers/URLHelper';
import FormatHelper from '../helpers/FormatHelper';
import { jsonParse } from '../helpers/FunctionHelper';

import ContractReducer from '../reducers/ContractReducer';

import BaseActionsClass from './BaseActionsClass';
import { formatOperation } from './BlockActions';
import ModalActions from './ModalActions';
import GlobalActions from './GlobalActions';
import AccountActions from './AccountActions';

import { getTotalHistory, getContractInfo } from '../services/queries/contract';
import { BridgeService } from '../services/BridgeService';
import ApiService from '../services/ApiService';

import browserHistory from '../history';

class ContractActions extends BaseActionsClass {

	/**
	 * Format contract history
	 * @param {Array} history
	 * @returns {function}
	 */
	async formatContractHistory(transactions) {
		let history = transactions.map(async (t) => {
			let { op: operation, result } = t;

			const block = await echo.api.getBlock(t.block_num);

			if (OPERATIONS_IDS.CONTRACT_TRANSFER === t.op[0]) {

				operation = block.transactions[t.trx_in_block].operations[t.op_in_trx];
				result = block.transactions[t.trx_in_block].operation_results[t.op_in_trx];
			}

			return formatOperation(operation, null, t.block_num, t.trx_in_block, t.op_in_trx, result, t.id, FormatHelper.timestampToBlockInformationTime(block.timestamp));
		});
		history = await Promise.all(history);
		return history.reduce((arr, t) => ([...arr, [t]]), []);
	}

	/**
	 * Get contract info
	 * @param {string} id
	 * @returns {function}
	 */
	getContractInfo(id) {
		return async (dispatch) => {

			if (!validators.isContractId(id)) {
				dispatch(GlobalActions.toggleErrorPath(true));
				return;
			}

			dispatch(this.setValue('loading', true));
			try {
				const contract = await echo.api.getContract(id);

				if (!contract) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				await dispatch(this.getContractInfoFromExplorer(id));
				await dispatch(this.getContractInfoFromGraphql(id));

				const balances = await echo.api.getContractBalances(id);
				let { owner } = await echo.api.getObject(id);
				owner = new Map(await echo.api.getObject(owner));
				await echo.api.getObjects(balances.map((b) => b.asset_id));

				dispatch(this.setMultipleValue({
					bytecode: contract[1].code,
					balances: fromJS(balances),
					owner,
				}));

				let history = await echo.api.getContractHistory(
					id,
					DEFAULT_OPERATION_HISTORY_ID,
					DEFAULT_ROWS_COUNT + 1,
					DEFAULT_OPERATION_HISTORY_ID,
				);

				const isFullHistory = history.length <= DEFAULT_ROWS_COUNT;
				if (history.length > DEFAULT_ROWS_COUNT) {
					history = history.slice(0, history.length - 1);
				}

				history = await this.formatContractHistory(history);

				dispatch(this.setMultipleValue({ history: new List(history), isFullHistory }));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

	/**
	 * Load contract history
	 * @param {string} id
	 * @param {number} lastOperationId
	 * @returns {function}
	 */
	loadContractHistory(id, lastOperationId) {
		return async (dispatch, getState) => {
			const lastOperationIdState = getState().contract.get('lastOperationId');

			if (lastOperationIdState === lastOperationId) {
				return;
			}

			try {
				dispatch(this.setValue('lastOperationId', lastOperationId));
				dispatch(this.setValue('loadingMoreHistory', true));

				let history = await echo.api.getContractHistory(
					id,
					DEFAULT_OPERATION_HISTORY_ID,
					DEFAULT_ROWS_COUNT + 1,
					`${OPERATION_HISTORY_OBJECT_PREFIX}.${lastOperationId - 1}`,
				);

				history = await this.formatContractHistory(history.slice(0, DEFAULT_ROWS_COUNT));

				dispatch(batchActions([
					this.reducer.actions.concat({ field: 'history', value: new List(history) }),
					this.reducer.actions.set({
						field: 'isFullHistory',
						value: history.length < DEFAULT_ROWS_COUNT,
					}),
				]));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loadingMoreHistory', false));
			}
		};
	}

	/**
	 * Update contract info
	 * @param {string} id
	 * @param {number} recentOperationId
	 * @returns {function}
	 */
	updateContractInfo(id, recentOperationId = DEFAULT_OPERATION_HISTORY_ID) {
		const getHistory = async (history = []) => {

			const chunk = await echo.api.getContractHistory(
				id,
				history.length ? [history.length - 1].id : recentOperationId,
				DEFAULT_ROWS_COUNT + 1,
				DEFAULT_OPERATION_HISTORY_ID,
			);

			history = history.concat(chunk);

			if (chunk.length > DEFAULT_ROWS_COUNT) {
				return getHistory(history);
			}

			return history;
		};

		return async (dispatch) => {
			try {
				let balances = await echo.api.getContractBalances(id);
				await echo.api.getObjects(balances.map((b) => b.asset_id));
				balances = fromJS(balances);

				let history = await getHistory();
				history = await this.formatContractHistory(history);
				history = new List(history);

				dispatch(batchActions([
					this.reducer.actions.update({ field: 'history', value: history }),
					this.reducer.actions.set({ field: 'balances', value: balances }),
				]));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			}
		};
	}

	abiApprove(id, abi) {
		return async (dispatch) => {
			try {
				const parsedAbi = jsonParse(abi);

				if (!parsedAbi) {
					dispatch(ModalActions.openModal(MODAL_ERROR, { title: 'Invalid JSON' }));
					return;
				}

				const response = await ApiService.setAbi({ id, abi: parsedAbi });

				if (response.error) {
					dispatch(ModalActions.openModal(MODAL_ERROR, { title: response.error.message }));
					return;
				}

				dispatch(this.setValue('abi', FormatHelper.formatAbi(response.abi)));
				dispatch(ModalActions.openModal(MODAL_SUCCESS, { title: 'ABI successfully uploaded' }));
				browserHistory.push(URLHelper.createContractUrl(id, CONTRACT_ABI));
			} catch (err) {
				dispatch(ModalActions.openModal(MODAL_ERROR, { title: FormatHelper.formatError(err) }));
			}
		};
	}
	/**
	 *
	 * @string contractId
	 * @returns {Function}
	 */
	getContractInfoFromExplorer(contractId) {
		return async (dispatch) => {
			try {
				const contract = await ApiService.getContractInfo(contractId);

				/* eslint-disable*/
				const {
					users_has_liked: stars = [],
					name = '',
					description = '',
					icon = '',
					source_code: sourceCode = '',
					abi = '',
					compiler_version: compilerVersion = '',
					verified = false,
				} = contract;
				/* eslint-disable */

				dispatch(this.setMultipleValue({
					name,
					description,
					icon,
					sourceCode,
					abi: FormatHelper.formatAbi(abi),
					compilerVersion,
					verified,
					stars: fromJS(stars),
				}));


			} catch (err) {
				dispatch(this.setValue('error', FormatHelper.formatError(err)));
			}
		};
	}

	/**
	 *
	 * @param contractId
	 * @returns {Function}
	 */
	setStarToContract(contractId) {
		return async (dispatch, getState) => {
			try {
				const isAccessBridge = await dispatch(GlobalActions.checkAccessToBridge());
				if (!isAccessBridge) return;

				const isExistActiveAcount = await dispatch(AccountActions.checkActiveAccount());
				if (!isExistActiveAcount) return;

				const activeAccountId = getState().global.getIn(['activeAccount', 'id']);
				const stars = getState().contract.get('stars');
				const isLike =!stars.includes(activeAccountId);
				const message = ContractHelper.getMessageToLikeContract(isLike, contractId);

				const signature = await BridgeService.proofOfAuthority(message, activeAccountId);

				const { users_has_liked } = await ApiService.setStarToContract({
					signature,
					message,
					contractId,
					accountId: activeAccountId,
				});

				dispatch(this.setValue('stars', fromJS(users_has_liked)));
			} catch (err) {
				const title = typeof err === 'string' ? err : err.message;
				dispatch(ModalActions.openModal(MODAL_ERROR, { title }));
			}
		};
	}


	/**
	 *
	 * @param {string} id
	 * @returns {Function}
	 */
	getContractInfoFromGraphql(id) {
		return async (dispatch) => {
			try {
				const contract = await echo.api.getObject(id);

				if (!contract) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				let { history, contractInfo } = await getContractInfo(id);
				const contractTxs = (await getTotalHistory([id])).total;

				const creationFee = history.items[0].body.fee;
				const feeAsset = await echo.api.getObject(creationFee.asset_id);

				const {
					registrar, block, calling_accounts, type, eth_accuracy: ethAccuracy,
				} = contractInfo;

				let { supported_asset_id: supportedAsset } = contractInfo;

				if (supportedAsset !== null) {
					supportedAsset = (await echo.api.getObject(supportedAsset)).symbol;
				}

				dispatch(this.setMultipleValue({
					registrar: registrar.name,
					blockNumber: block.round,
					countUsedByAccount: calling_accounts.length,
					type: fromJS([contract.type, type]),
					supportedAsset,
					ethAccuracy,
					contractTxs,
					creationFee: new Map({
						amount: creationFee.amount,
						precision: feeAsset.precision,
						symbol: feeAsset.symbol,
					}),
					createdAt: block.timestamp,
				}));

			} catch (err) {
				dispatch(this.setValue('error', FormatHelper.formatError(err)));
			}
		};
	}

}

export default new ContractActions(ContractReducer);

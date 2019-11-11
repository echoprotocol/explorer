import echo, { validators, OPERATIONS_IDS } from 'echojs-lib';
import { List, fromJS } from 'immutable';
import { batchActions } from 'redux-batched-actions';

import { DEFAULT_OPERATION_HISTORY_ID, DEFAULT_ROWS_COUNT, TOKEN_TYPE } from '../constants/GlobalConstants';
import { MODAL_ERROR } from '../constants/ModalConstants';
import { OPERATION_HISTORY_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';

import AccountReducer from '../reducers/AccountReducer';

import GlobalActions from './GlobalActions';
import BaseActionsClass from './BaseActionsClass';
import ModalActions from './ModalActions';
import TransactionActions from './TransactionActions';

import { BridgeService } from '../services/BridgeService';
import { getBalances } from '../services/queries/balance';

class AccountActions extends BaseActionsClass {

	/** Set reducer
	 * @constructor
	 */
	constructor() {
		super(AccountReducer);
	}

	/**
	 * Format account history
	 * @param {String} accountId
	 * @param {Array} history
	 * @returns {function}
	 */
	async formatAccountHistory(accountId, transactions) {
		let accountHistory = transactions.map(async (t) => {
			let { op: operation, result } = t;
			const block = await echo.api.getBlock(t.block_num);
			if (OPERATIONS_IDS.CONTRACT_TRANSFER === t.op[0]) {

				operation = block.transactions[t.trx_in_block].operations[t.op_in_trx];
				result = block.transactions[t.trx_in_block].operation_results[t.op_in_trx];

				if (operation[1].registrar === accountId) {
					return null;
				}
			}

			return TransactionActions.getOperation(
				operation,
				t.block_num,
				block.timestamp,
				t.trx_in_block,
				t.op_in_trx,
				result,
				null,
				accountId,
				t.id,
			);
		});

		accountHistory = await Promise.all(accountHistory);
		return accountHistory.filter((t) => t);
	}

	/**
	 * Get account info
	 * @param {string} id
	 * @returns {function}
	 */
	getAccountInfo(id) {
		return async (dispatch) => {
			if (!validators.isAccountId(id) && !validators.isAccountName(id)) {
				dispatch(GlobalActions.toggleErrorPath(true));
				return;
			}

			dispatch(this.setValue('loading', true));

			try {
				const [account] = await echo.api.getFullAccounts([id]);

				if (!account) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				const objectIds = Object.entries(account.balances).reduce((arr, b) => [...arr, ...b], []);

				await echo.api.getObjects(objectIds);

				dispatch(this.setMultipleValue({ id: account.id, balances: fromJS(account.balances) }));

				const transactions = await this.formatAccountHistory(id, account.history.slice(0, DEFAULT_ROWS_COUNT));

				dispatch(this.setMultipleValue({
					history: new List(transactions),
					isFullHistory: account.history.length <= DEFAULT_ROWS_COUNT,
				}));

				const balances = await getBalances([account.id]);
				const tokens = balances.data.getBalances.filter((balanceItem) => balanceItem.type === TOKEN_TYPE);

				dispatch(this.setMultipleValue({ tokens }));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

	/**
	 * Update account history
	 * @param {string} accountId
	 * @param {array} accountHistory
	 * @returns {function}
	 */
	updateAccountHistory(accountId, newAccountHistory, oldAccountHistory) {
		return async (dispatch) => {
			const diff = newAccountHistory.filter((historyItem) =>
				!oldAccountHistory.find((oldHistoryItem) => oldHistoryItem.get('id') === historyItem.get('id')));
			const transactions = await this.formatAccountHistory(accountId, diff.toJS());
			dispatch(this.reducer.actions.update({
				field: 'history',
				value: new List(transactions),
			}));
		};
	}

	/**
	 * Update account balances
	 * @param {Map} balances
	 * @returns {function}
	 */
	updateAccountBalances(balances) {
		return async (dispatch) => {
			const objectIds = balances.reduce((arr, key, value) => [...arr, key, value], []);
			await echo.api.getObjects(objectIds);

			dispatch(this.setMultipleValue({ balances }));
		};
	}

	/**
	 * Load account history
	 * @param {string} accountId
	 * @param {number} lastOperationId
	 * @returns {function}
	 */
	loadAccountHistory(accountId, lastOperationId) {
		return async (dispatch, getState) => {
			const lastOperationIdState = getState().account.get('lastOperationId');

			if (lastOperationIdState === lastOperationId) {
				return;
			}

			try {
				dispatch(this.setValue('lastOperationId', lastOperationId));
				dispatch(this.setValue('loadingMoreHistory', true));

				let transactions = await echo.api.getAccountHistory(
					accountId,
					DEFAULT_OPERATION_HISTORY_ID,
					DEFAULT_ROWS_COUNT + 1,
					`${OPERATION_HISTORY_OBJECT_PREFIX}.${lastOperationId - 1}`,
				);

				const isFullHistory = transactions.length <= DEFAULT_ROWS_COUNT;
				transactions = await this.formatAccountHistory(accountId, transactions.slice(0, DEFAULT_ROWS_COUNT));

				dispatch(batchActions([
					this.reducer.actions.concat({
						field: 'history',
						value: new List(transactions),
					}),
					this.reducer.actions.set({
						field: 'isFullHistory',
						value: isFullHistory,
					}),
				]));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loadingMoreHistory', false));
			}
		};
	}

	loadActiveAccount() {
		return async (dispatch) => {
			if (!BridgeService.isExist()) return;

			const accounts = await BridgeService.getAccounts();

			dispatch(this.setActiveAccount(accounts.find((a) => a.active)));
		};
	}

	checkActiveAccount() {
		return async (dispatch, getState) => {
			const activeAccountId = getState().global.getIn(['activeAccount', 'id']);

			if (!activeAccountId) {
				const accounts = await BridgeService.getAccounts();

				if (!accounts.length) {
					dispatch(ModalActions.openModal(MODAL_ERROR, { title: 'No accounts' }));
					return false;
				}

				dispatch(this.setActiveAccount(accounts.find((a) => a.active)));
				return true;
			}

			return true;
		};
	}

	setActiveAccount(account) {
		return (dispatch) => {
			dispatch(GlobalActions.setValue('activeAccount', fromJS(account)));
		};
	}

}

export default new AccountActions();

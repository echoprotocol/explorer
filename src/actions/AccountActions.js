import echo, { validators, OPERATIONS_IDS } from 'echojs-lib';
import { List, fromJS } from 'immutable';
import { batchActions } from 'redux-batched-actions';

import AccountReducer from '../reducers/AccountReducer';
import BaseActionsClass from './BaseActionsClass';

import { DEFAULT_OPERATION_HISTORY_ID, DEFAULT_ROWS_COUNT } from '../constants/GlobalConstants';
import { OPERATION_HISTORY_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';
import { formatOperation } from './BlockActions';
import FormatHelper from '../helpers/FormatHelper';
import GlobalReducer from '../reducers/GlobalReducer';

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

			return formatOperation(operation, accountId, t.block_num, t.trx_in_block, t.op_in_trx, result, t.id, FormatHelper.timestampToBlockInformationTime(block.timestamp));
		});
		accountHistory = await Promise.all(accountHistory);
		return accountHistory.filter((t) => t).reduce((arr, t) => ([...arr, [t]]), []);
	}

	/**
	 * Get account info
	 * @param {string} id
	 * @returns {function}
	 */
	getAccountInfo(id) {
		return async (dispatch) => {
			if (!validators.isAccountId(id) && !validators.isAccountName(id)) {
				dispatch(GlobalReducer.actions.set({ field: 'errorPath', value: 'true' }));
				return;
			}

			dispatch(this.setValue('loading', true));

			try {
				const [account] = await echo.api.getFullAccounts([id]);

				if (!account) {
					dispatch(GlobalReducer.actions.set({ field: 'errorPath', value: true }));
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
			const diff = newAccountHistory.filter((h) => !oldAccountHistory.includes(h));
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

}

export default new AccountActions();

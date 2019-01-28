import echo, { validators, OPERATIONS_IDS } from 'echojs-lib';
import { List, fromJS } from 'immutable';

import AccountReducer from '../reducers/AccountReducer';
import BaseActionsClass from './BaseActionsClass';

import history from '../history';
import { NOT_FOUND_PATH } from '../constants/RouterConstants';
import { formatOperation } from './BlockActions';

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
			if (OPERATIONS_IDS.CONTRACT_TRANSFER === t.op[0]) {
				const block = await echo.api.getBlock(t.block_num);
				operation = block.transactions[t.trx_in_block].operations[t.op_in_trx];
				result = block.transactions[t.trx_in_block].operation_results[t.op_in_trx];

				if (operation[1].registrar === accountId) {
					return null;
				}
			}

			return formatOperation(operation, accountId, t.block_num, t.trx_in_block, result);
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
			if (!validators.isAccountId(id)) {
				history.replace(NOT_FOUND_PATH);
				return;
			}

			dispatch(this.setValue('loading', true));

			try {
				const [account] = await echo.api.getFullAccounts([id]);

				if (!account) {
					history.replace(NOT_FOUND_PATH);
					return;
				}

				const objectIds = Object.entries(account.balances).reduce((arr, b) => [...arr, ...b], []);

				await echo.api.getObjects(objectIds);

				dispatch(this.setMultipleValue({ id: account.id, balances: fromJS(account.balances) }));

				const transactions = await this.formatAccountHistory(id, account.history);

				dispatch(this.setValue('history', new List(transactions)));

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
	updateAccountHistory(accountId, accountHistory) {
		return async (dispatch) => {
			const transactions = await this.formatAccountHistory(accountId, accountHistory.toJS());
			dispatch(this.setValue('history', new List(transactions)));
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

}

export default new AccountActions();

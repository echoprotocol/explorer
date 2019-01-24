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

		this.subscriber = null;
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
			}

			return formatOperation(operation, accountId, t.block_num, t.trx_in_block, result);
		});
		accountHistory = await Promise.all(accountHistory);
		return accountHistory.reduce((arr, t) => ([...arr, [t]]), []);
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

				if (this.subscriber) {
					echo.subscriber.removeAccountSubscribe(this.subscriber);
					this.subscriber = null;
				}

				this.subscriber = async (update) => {
					console.log(update);
					// TODO get history and update
					// const transactions = await this.formatAccountHistory(id, account.history);
					// dispatch(this.setValue('history', transactions));
				};

				await echo.subscriber.setAccountSubscribe(this.subscriber.bind(this), [id]);

				const transactions = await this.formatAccountHistory(id, account.history);

				dispatch(this.setValue('history', new List(transactions)));

			} catch (e) {
				dispatch(this.setValue('error', e));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

	/**
	 * Clear account info
	 * @param {string} id
	 * @returns {function}
	 */
	clearAccountInfo() {
		return async (dispatch) => {
			echo.subscriber.removeAccountSubscribe(this.subscriber);
			this.subscriber = null;
			dispatch(this.clear());
		};
	}

}

export default new AccountActions();

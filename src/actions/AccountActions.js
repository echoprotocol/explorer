import echo, { validators } from 'echojs-lib';
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
	 * @param {array} history
	 * @returns {function}
	 */
	async formatAccountHistory(transactions) {
		let accountHistory = transactions.map((t) => formatOperation(t.op, t.block_num, t.result));
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

				// await echo.subscriber.setAccountSubscribe(async () => {
				// 	const transactions = await this.formatAccountHistory(account.history);
				// 	dispatch(this.setValue('history', transactions));
				// }, [id]);

				const transactions = await this.formatAccountHistory(account.history);

				dispatch(this.setMultipleValue({
					loading: false,
					id: account.id,
					balances: fromJS(account.balances),
					history: new List(transactions),
				}));

			} catch (e) {
				dispatch(this.setMultipleValue({
					loading: false,
					error: e,
				}));
			}
		};
	}

}

export default new AccountActions();

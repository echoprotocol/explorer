import echo, { validators } from 'echojs-lib';
import { fromJS } from 'immutable';

import AccountReducer from '../reducers/AccountReducer';
import BaseActionsClass from './BaseActionsClass';

import history from '../history';
import { NOT_FOUND_PATH } from '../constants/RouterConstants';

class AccountActions extends BaseActionsClass {

	/** Set reducer
	 * @constructor
	 */
	constructor() {
		super(AccountReducer);
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

			const [account] = await echo.api.getFullAccounts([id]);

			if (!account) {
				history.replace(NOT_FOUND_PATH);
				return;
			}

			const objectIds = Object.entries(account.balances).reduce((arr, b) => [...arr, ...b], []);

			await echo.api.getObjects(objectIds);

			dispatch(this.setMultipleValue({
				id: account.id,
				balances: fromJS(account.balances),
			}));
		};
	}

}

export default new AccountActions();

import echo from 'echojs-lib';

import AccountReducer from '../reducers/AccountReducer';
import BaseActionsClass from './BaseActionsClass';

import history from '../history';
import { NOT_FOUND_PATH } from '../constants/RouterConstants';

class AccountActions extends BaseActionsClass {

	constructor() {
		super(AccountReducer);
	}

	getAccountInfo(name) {
		return async (dispatch) => {
			const [account] = await echo.api.getFullAccounts([name]);

			if (!account) {
				history.replace(NOT_FOUND_PATH);
				return;
			}

			await echo.api.getAssets(Object.keys(account.balances));
			await echo.api.getObjects(Object.values(account.balances));

			dispatch(this.setValue('id', account.id));
			dispatch(this.setValue('balances', account.balances));
		};
	}

}

export default new AccountActions();

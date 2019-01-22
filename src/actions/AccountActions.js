import GlobalReducer from '../reducers/GlobalReducer';
import BaseActionsClass from './BaseActionsClass';

class AccountActions extends BaseActionsClass {

	constructor() {
		super(GlobalReducer);
	}

	getAccountInfo() {
		return () => {};
	}

}

export default new AccountActions();

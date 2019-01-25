import echo, { validators } from 'echojs-lib';

import ContractReducer from '../reducers/ContractReducer';
import BaseActionsClass from './BaseActionsClass';

import history from '../history';
import { NOT_FOUND_PATH } from '../constants/RouterConstants';

class ContractActions extends BaseActionsClass {

	/** Set reducer
	 * @constructor
	 */
	constructor() {
		super(ContractReducer);
	}

	/**
	 * Get contract info
	 * @param {string} id
	 * @returns {function}
	 */
	getContractInfo(id) {
		return async (dispatch) => {
			if (!validators.isContractId(id)) {
				history.replace(NOT_FOUND_PATH);
				return;
			}

			dispatch(this.setValue('loading', true));
			try {
				const contract = await echo.api.getContract(id);

				if (!contract) {
					history.replace(NOT_FOUND_PATH);
					return;
				}

				dispatch(this.setValue('bytecode', contract[1].code));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

}

export default new ContractActions();

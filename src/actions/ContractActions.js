import echo, { validators } from 'echojs-lib';
import { fromJS } from 'immutable';

import ContractReducer from '../reducers/ContractReducer';
import BaseActionsClass from './BaseActionsClass';

import history from '../history';
import { NOT_FOUND_PATH } from '../constants/RouterConstants';

class ContractActions extends BaseActionsClass {

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

				const balances = await echo.api.getContractBalances(id);

				await echo.api.getObjects(balances.map((b) => b.asset_id));

				dispatch(this.setMultipleValue({
					bytecode: contract[1].code,
					balances: fromJS(balances),
				}));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

}

export default new ContractActions(ContractReducer);

import echo, { OPERATIONS_IDS, validators } from 'echojs-lib';
import { List, fromJS } from 'immutable';

import ContractReducer from '../reducers/ContractReducer';
import BaseActionsClass from './BaseActionsClass';

import browserHistory from '../history';
import { NOT_FOUND_PATH } from '../constants/RouterConstants';
import { DEFAULT_OPERATION_HISTORY_ID, DEFAULT_ROWS_COUNT } from '../constants/GlobalConstants';
import { formatOperation } from './BlockActions';

class ContractActions extends BaseActionsClass {

	/**
	 * Format contract history
	 * @param {Array} history
	 * @returns {function}
	 */
	async formatContractHistory(transactions) {
		let history = transactions.map(async (t) => {
			let { op: operation, result } = t;
			if (OPERATIONS_IDS.CONTRACT_TRANSFER === t.op[0]) {
				const block = await echo.api.getBlock(t.block_num);

				operation = block.transactions[t.trx_in_block].operations[t.op_in_trx];
				result = block.transactions[t.trx_in_block].operation_results[t.op_in_trx];
			}

			return formatOperation(operation, null, t.block_num, t.trx_in_block, t.op_in_trx, result, t.id);
		});
		history = await Promise.all(history);
		return history.reduce((arr, t) => ([...arr, [t]]), []);
	}

	/**
	 * Get contract info
	 * @param {string} id
	 * @returns {function}
	 */
	getContractInfo(id) {
		return async (dispatch) => {
			if (!validators.isContractId(id)) {
				browserHistory.replace(NOT_FOUND_PATH);
				return;
			}

			dispatch(this.setValue('loading', true));
			try {
				const contract = await echo.api.getContract(id);

				if (!contract) {
					browserHistory.replace(NOT_FOUND_PATH);
					return;
				}

				const balances = await echo.api.getContractBalances(id);

				await echo.api.getObjects(balances.map((b) => b.asset_id));

				dispatch(this.setMultipleValue({
					bytecode: contract[1].code,
					balances: fromJS(balances),
				}));

				let history = await echo.api.getContractHistory(
					id,
					DEFAULT_OPERATION_HISTORY_ID,
					DEFAULT_ROWS_COUNT + 1,
					DEFAULT_OPERATION_HISTORY_ID,
				);

				const isFullHistory = history.length <= DEFAULT_ROWS_COUNT;
				if (history.length > DEFAULT_ROWS_COUNT) {
					history = history.slice(0, history.length - 1);
				}

				history = await this.formatContractHistory(history);

				dispatch(this.setMultipleValue({ history: new List(history), isFullHistory }));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

	/**
	 * Load contract history
	 * @param {string} id
	 * @param {number} lastOperationId
	 * @returns {function}
	 */
	loadContractHistory(id, lastOperationId) {
		return async (dispatch) => {
			try {
				let history = await echo.api.getContractHistory(
					id,
					DEFAULT_OPERATION_HISTORY_ID,
					DEFAULT_ROWS_COUNT + 1,
					`1.11.${lastOperationId - 1}`,
				);

				if (!history.length || history.length <= DEFAULT_ROWS_COUNT) {
					dispatch(this.setValue('isFullHistory', true));
				}

				history = await this.formatContractHistory(history);

				dispatch(this.reducer.actions.concat({
					field: 'history',
					value: new List(history),
				}));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			}
		};
	}

}

export default new ContractActions(ContractReducer);

import echo, { OPERATIONS_IDS, isAccountId, isAssetId } from 'echojs-lib';
import { List } from 'immutable';
import _ from 'lodash';

import history from '../history';

import Operations from '../constants/Operations';
import { NOT_FOUND_PATH } from '../constants/RouterConstants';

import ConvertHelper from '../helpers/ConvertHelper';

import TransactionReducer from '../reducers/TransactionReducer';
import BaseActionsClass from './BaseActionsClass';

class TransactionActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(TransactionReducer);
	}

	getTransaction(blockNumber, index) {
		return async (dispatch) => {
			const block = await echo.api.getBlock(blockNumber);

			if (!block || !block.transactions[index - 1]) {
				history.push(NOT_FOUND_PATH);
				return;
			}

			const transaction = block.transactions[index - 1];

			let operations = transaction.operations.map(async ([type, options], opIndex) => {
				const operation = Object.values(Operations).find((i) => i.value === type);

				delete options.memo;
				delete options.extensions;
				delete options.gasPrice;
				delete options.eth_accuracy;

				options = Object.entries(options).map(async ([key, value]) => {
					let link = null;

					switch (typeof value) {
						case 'string':
							if (isAccountId(value) || isAssetId(value)) {
								const object = await echo.api.getObject(value);
								link = value;
								value = isAccountId(value) ? object.name : object.symbol;
							}
							break;
						case 'object':
							if (_.has(value, 'amount') && value.asset_id) {
								const asset = await echo.api.getObject(value.asset_id);
								delete value.asset_id;
								value.precision = asset.precision;
								value.symbol = asset.symbol;
							}
							break;
						default:
							break;
					}

					switch (key) {
						case 'code':
							key = 'bytecode';
							break;
						case 'callee':
							key = 'contract id';
							link = value;
							break;
						default:
							break;
					}

					return { [key]: link ? { value, link } : value };
				});

				options = await Promise.all(options);
				options = options.reduce((obj, op) => ({ ...obj, ...op }), {});

				if ([
					OPERATIONS_IDS.CREATE_CONTRACT,
					OPERATIONS_IDS.CALL_CONTRACT,
					OPERATIONS_IDS.CONTRACT_TRANSFER,
				].includes(type)) {
					const [, result] = await echo.api.getContractResult(transaction.operation_results[opIndex][1]);

					options.excepted = result.exec_res.excepted;
					options['code deposit'] = result.exec_res.code_deposit;

					if (parseInt(result.exec_res.new_address, 10)) {
						options['new contract id'] = ConvertHelper.toContractId(result.exec_res.new_address);
					}

					if (result.tr_receipt.log.length) {
						options.logs = result.tr_receipt.log.map(({ address, data, log }) => {
							const contract = ConvertHelper.toContractId(address);
							return { topics: log, contract, data };
						});
					}
				}

				return {
					type: operation.name,
					block: block.round,
					...options,
				};
			});

			operations = await Promise.all(operations);
			dispatch(this.setValue('operations', new List(operations)));
		};
	}


}

export default new TransactionActionsClass();

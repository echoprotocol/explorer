import echo, { OPERATIONS_IDS, isAccountId, isAssetId } from 'echojs-lib';
import { List } from 'immutable';

import Operations from '../constants/Operations';

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
				return;
			}

			const transaction = block.transactions[index - 1];

			let operations = transaction.operations.map(async ([type, options], opIndex) => {
				const operation = Object.values(Operations).find((i) => i.value === type);

				delete options.memo;
				delete options.extensions;
				delete options.gasPrice;

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
							if (value.amount && value.asset_id) {
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
					// TODO logs
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

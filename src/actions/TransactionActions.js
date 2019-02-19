/* eslint-disable camelcase */
import echo, { OPERATIONS_IDS, validators } from 'echojs-lib';
import { List } from 'immutable';
import _ from 'lodash';

import history from '../history';

import Operations from '../constants/Operations';
import { NOT_FOUND_PATH } from '../constants/RouterConstants';
import { CONTRACT_RESULT_TYPE_0 } from '../constants/ResultTypeConstants';

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
				history.replace(NOT_FOUND_PATH);
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
							if (value === '') {
								return {};
							}

							if (validators.isAccountId(value) || validators.isAssetId(value)) {
								const object = await echo.api.getObject(value);
								link = value;
								value = validators.isAccountId(value) ? object.name : object.symbol;
							}
							break;
						case 'object':
							if (_.has(value, 'amount') && value.asset_id) {
								const asset = await echo.api.getObject(value.asset_id);
								delete value.asset_id;
								value.precision = asset.precision;
								value.symbol = asset.symbol;
							} else {
								return {};
							}
							break;
						case 'boolean':
							value = value ? 'Yes' : 'No';
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

					key = _.startCase(key);

					return { [key]: link ? { value, link } : value };
				});

				options = await Promise.all(options);
				options = options.reduce((obj, op) => ({ ...obj, ...op }), {});

				if ([
					OPERATIONS_IDS.CREATE_CONTRACT,
					OPERATIONS_IDS.CALL_CONTRACT,
					OPERATIONS_IDS.CONTRACT_TRANSFER,
				].includes(type)) {
					const [contractResultType, result] = await echo.api.getContractResult(transaction.operation_results[opIndex][1]);
					if (contractResultType === CONTRACT_RESULT_TYPE_0) {

						const { exec_res: { excepted, code_deposit, new_address }, tr_receipt: { log } } = result;

						options.excepted = _.startCase(excepted);
						options['code deposit'] = code_deposit;

						if (parseInt(new_address, 10)) {
							const id = ConvertHelper.toContractId(new_address);
							options['new contract id'] = { value: id, link: id };
						}

						if (log.length) {
							options.logs = log.map(({ address, data, log: topics }) => {
								const contract = ConvertHelper.toContractId(address);
								return { topics, contract, data };
							});
						}

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

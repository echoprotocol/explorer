import { OPERATION_TYPES } from '../constants/OperationTypeConstants';

// It should be connected to real data
export const transformOperationDataByType = (type, data) => {
	switch (type) {
		case OPERATION_TYPES.CONTRACT_CALL:
			return {
				operationInfo: {
					type: 'Call contract',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					contract_type: 'x64',
					call_bytecode: '60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c792060806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c7920',
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						called_contract_type: 'String',
						erc20_token_info: [{
							key: 'Token symbol (name)',
							value: 'ZSCHN (Zachekoin token)',
						}, {
							key: 'Decimals',
							value: '18',
						}, {
							key: 'Current sypply (Total supply)',
							value: '21 000 000.00000000934 (90 000 000.000000000000000001)',
						}],
						erc20_token_transfers: [{
							amount: {
								amount: 230,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: 'account',
								link: '1.2.4',
							},
							to: {
								value: 'account',
								link: '1.2.5',
							},
						}, {
							amount: {
								amount: 16,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: 'pink-n-floyd01230',
								link: '1.2.3',
							},
							to: {
								value: 'nathen1234',
								link: '1.2.3',
							},
						}],
						asset_transfers: [{
							amount: {
								amount: 230,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: '',
								link: '1.2.3',
							},
							to: {
								value: 'account',
								link: '1.2.3',
							},
						}],
					},
				},
				logs: [{
					address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					name: {
						name: 'String',
						params: ['param1', 'param2', 'param3'],
					},
					topics: ['ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3eh', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ek'],
					data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000001408de424e0172550000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000005e745a6c',
				}, {
					address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc3',
					name: {
						name: 'String',
						params: ['param1', 'param2', 'param3'],
					},
					topics: ['ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3eh', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ek'],
					data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000001408de424e0172550000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000005e745a6c',
				}],
				internalOperations: [{
					operationInfo: {
						type: 'Contract call',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
						asset_amount_sent: {
							amount: 230,
							precision: 8,
							symbol: 'ECHO',
						},
						bytecode: '60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c7920',
					},
				}, {
					operationInfo: {
						type: 'Contract create',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc3',
						asset_amount_sent: {
							amount: 230,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				}, {
					operationInfo: {
						type: 'Contract delete',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc4',
					},
				}],
			};
		case OPERATION_TYPES.CONTRACT_INTERNAL_CREATE:
			return {
				operationInfo: {
					type: 'Create internal contract (virt)',
					caller_contract: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					new_contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					eth_accuracy_is_enabled: 'String',
					supported_asset: 'ECHO',
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_INTERNAL_CALL:
			return {
				operationInfo: {
					type: 'Call internal contract (virt)',
					caller_contract: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_SELFDESTRUCT:
			return {
				operationInfo: {
					type: 'Destruct contract (virt)',
					destructed_contract: '0xc02aaa39b223fe8d0a0e',
					recipient: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_UPDATE:
			return {
				operationInfo: {
					type: 'Update contract owner',
					sender: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					new_owner: {
						value: 'thebluezz',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_contract_owner: {
							value: 'nathen1234',
							link: '1.2.3',
						},
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_FUND_POOL:
			return {
				operationInfo: {
					type: 'Contract fund pool',
					sender: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_contract_owner: {
							value: 'nathen1234',
							link: '1.2.3',
						},
						current_contract_whitelist: ['String1', 'String2'],
						current_contract_blacklist: ['String1', 'String2'],
						current_contract_fee_pool_balance: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_WHITELIST:
			return {
				operationInfo: {
					type: 'Update contract whitelist',
					sender: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					added_to_whitelist: {
						value: 'nathen1234',
						link: '1.2.3',
					},
					removed_from_whitelist: [{
						value: 'nathen1234',
						link: '1.2.3',
					}, {
						value: 'yelly-jelly',
						link: '1.2.4',
					}, {
						value: 'account',
						link: '1.2.4',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_contract_owner: {
							value: 'nathen1234',
							link: '1.2.3',
						},
						current_contract_whitelist: ['String1', 'String2'],
						current_contract_blacklist: ['String1', 'String2'],
						current_contract_fee_pool_balance: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				},
			};

		case OPERATION_TYPES.SIDECHAIN_ETH_CREATE_ADDRESS:
			return {
				operationInfo: {
					type: 'Request Eth address',
					sender: {
						value: 'nathen1234',
						link: '1.2.3',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					additionalInfo: {
						number_of_confirmations: {
							value: '2',
							total: '8',
						},
						received_deposit_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.SIDECHAIN_ETH_APPROVE_ADDRESS:
			return {
				operationInfo: {
					type: 'Approve Eth address',
					sender: {
						value: 'nathen1234',
						link: '1.2.3',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						number_of_confirmations: {
							value: '2',
							total: '8',
						},
						received_deposit_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.SIDECHAIN_ETH_DEPOSIT:
			return {
				operationInfo: {
					type: 'eETH Deposit',
					sender: {
						value: 'nathen1234',
						link: '1.2.3',
					},
					account_name: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					deposit_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		default:
			return {};
	}
};

import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];

	switch (opNumber) {
		case OPERATIONS_IDS.CONTRACT_CREATE: {
			// TODO additionalInfo
			const objectInfo = data.objectInfo.toJS();
			return {
				operationInfo: {
					type,
					sender: data.registrar,
					contract_type: data.objectInfo.get('type'),
					deployed_contract_bytecode: data.bytecode,
					deploy_arguments: ['stringElement1', 'stringElement2', 'stringElement3', 'stringElement4', 'stringElement5'],
					amount: data.value,
					eth_accuracy_is_enabled: data.objectInfo.get('ethAccuracy'),
					supported_asset: data.objectInfo.get('supportedAsset') || 'None',
					fee: data.fee,
					...description,
					additionalInfo: {
						...(objectInfo.token && {
							erc20_token_info: [{
								key: 'Token symbol (name)',
								value: objectInfo.token.symbol,
							}, {
								key: 'Decimals',
								value: objectInfo.token.decimals,
							}, {
								key: 'Total supply',
								value: objectInfo.token.total_supply,
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
						}),
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
		}
		case OPERATIONS_IDS.CONTRACT_CALL: {
			const objectInfo = data.objectInfo.toJS();
			// TODO additionalInfo
			return {
				operationInfo: {
					type,
					sender: data.callee,
					contract_type: data.objectInfo.get('type'),
					call_bytecode: data.bytecode,
					amount: data.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						called_contract_type: 'String',
						...(objectInfo.token && {
							erc20_token_info: [{
								key: 'Token symbol (name)',
								value: objectInfo.token.symbol,
							}, {
								key: 'Decimals',
								value: objectInfo.token.decimals,
							}, {
								key: 'Total supply',
								value: objectInfo.token.total_supply,
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
						}),
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
		}
		case OPERATIONS_IDS.CONTRACT_INTERNAL_CREATE:
			// TODO additionalInfo
			return {
				operationInfo: {
					type: 'Create internal contract (virt)',
					caller_contract: data.caller,
					new_contract: data.new_contract,
					value: data.value,
					eth_accuracy_is_enabled: 'String',
					supported_asset: 'ECHO',
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATIONS_IDS.CONTRACT_INTERNAL_CALL:
			// TODO additionalInfo
			return {
				operationInfo: {
					type: 'Call internal contract (virt)',
					caller_contract: data.caller,
					called_contract: data.callee,
					amount: data.amount,
					...description,
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATIONS_IDS.CONTRACT_SELFDESTRUCT: {
			// TODO additionalInfo
			return {
				operationInfo: {
					type: 'Destruct contract (virt)',
					destructed_contract: '0xc02aaa39b223fe8d0a0e',
					recipient: data.recipient,
					fee: data.fee,
					amount: data.amount,
					...description,
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		}
		case OPERATIONS_IDS.CONTRACT_UPDATE: {
			return {
				operationInfo: {
					type,
					sender: data.sender,
					contract: data.contract,
					new_owner: data.new_owner,
					fee: data.fee,
					amount: data.amount,
					...description,
					additionalInfo: {
						current_contract_owner: data.objectInfo.get('owner'),
					},
				},
			};
		}
		case OPERATIONS_IDS.CONTRACT_FUND_POOL: {
			return {
				operationInfo: {
					type,
					sender: data.sender,
					contract: data.contract,
					fee: data.fee,
					amount: data.value,
					...description,
					additionalInfo: {
						current_contract_owner: data.objectInfo.get('owner'),
						current_contract_whitelist: data.objectInfo.get('whitelist'),
						current_contract_blacklist: data.objectInfo.get('blacklist'),
						current_contract_fee_pool_balance: data.objectInfo.get('contractPoolBalance'),
					},
				},
			};
		}
		case OPERATIONS_IDS.CONTRACT_WHITELIST: {
			return {
				operationInfo: {
					type,
					sender: data.sender,
					contract: data.contract,
					added_to_whitelist: data.addedToWhitelist,
					removed_from_whitelist: data.removedFromWhitelist,
					added_to_blacklist: data.addedToBlacklist,
					remove_from_blacklist: data.removedFromBlacklist,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_contract_owner: data.objectInfo.get('owner'),
						current_contract_whitelist: data.objectInfo.get('whitelist'),
						current_contract_blacklist: data.objectInfo.get('blacklist'),
						current_contract_fee_pool_balance: data.objectInfo.get('contractPoolBalance'),
					},
				},
			};
		}
		default:
			return null;
	}
};

export default transformOperationDataByType;

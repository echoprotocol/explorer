import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];

	switch (opNumber) {
		// TODO asset_transfers & deploy_arguments
		case OPERATIONS_IDS.CONTRACT_CREATE: {
			const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
			return {
				operationInfo: {
					type,
					sender: data.registrar,
					contract_type: objectInfo.type,
					deployed_contract_bytecode: data.bytecode,
					// deploy_arguments: ['stringElement1', 'stringElement2', 'stringElement3', 'stringElement4', 'stringElement5'],
					amount: data.value,
					eth_accuracy_is_enabled: objectInfo.ethAccuracy,
					supported_asset: objectInfo.supportedAsset || 'None',
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
							erc20_token_transfers: data['token transfers'],
						}),
						// asset_transfers: [{
						// 	amount: {
						// 		amount: 230,
						// 		precision: 8,
						// 		symbol: 'ECHO',
						// 	},
						// 	from: {
						// 		value: '',
						// 		link: '1.2.3',
						// 	},
						// 	to: {
						// 		value: 'account',
						// 		link: '1.2.3',
						// 	},
						// }],
					},
				},
				logs: data.logs,
				internalOperations: data.virtualOps,
			};
		}
		// TODO asset_transfers
		case OPERATIONS_IDS.CONTRACT_CALL: {
			const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};

			return {
				operationInfo: {
					type,
					sender: data.callee,
					contract_type: objectInfo.type,
					call_bytecode: data.bytecode,
					amount: data.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						called_contract_type: objectInfo.type,
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
							erc20_token_transfers: data['token transfers'],
						}),
						// asset_transfers: [{
						// 	amount: {
						// 		amount: 230,
						// 		precision: 8,
						// 		symbol: 'ECHO',
						// 	},
						// 	from: {
						// 		value: '',
						// 		link: '1.2.3',
						// 	},
						// 	to: {
						// 		value: 'account',
						// 		link: '1.2.3',
						// 	},
						// }],
					},
				},
				logs: data.logs,
				internalOperations: data.virtualOps,
			};
		}
		case OPERATIONS_IDS.CONTRACT_INTERNAL_CREATE: {
			// TODO original_operation
			const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
			return {
				operationInfo: {
					type: 'Create internal contract (virt)',
					caller_contract: data.caller,
					new_contract: objectInfo.id,
					value: data.value,
					eth_accuracy_is_enabled: objectInfo.ethAccuracy,
					supported_asset: objectInfo.supportedAsset || 'None',
					additionalInfo: {
						original_operation: {
							link: objectInfo.link,
							titel: 'Original operation',
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.CONTRACT_INTERNAL_CALL: {
			// TODO original_operation
			const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
			return {
				operationInfo: {
					type: 'Call internal contract (virt)',
					caller_contract: data.caller,
					called_contract: data.callee,
					amount: data.amount,
					...description,
					additionalInfo: {
						original_operation: {
							link: objectInfo.link,
							titel: 'Original operation',
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.CONTRACT_SELFDESTRUCT: {
			// TODO original_operation
			const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
			return {
				operationInfo: {
					type: 'Destruct contract (virt)',
					destructed_contract: objectInfo.id,
					recipient: data.recipient,
					fee: data.fee,
					amount: data.amount,
					...description,
					additionalInfo: {
						original_operation: {
							link: objectInfo.link,
							titel: 'Original operation',
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.CONTRACT_UPDATE: {
			const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
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
						current_contract_owner: objectInfo.owner,
					},
				},
			};
		}
		case OPERATIONS_IDS.CONTRACT_FUND_POOL: {
			const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
			return {
				operationInfo: {
					type,
					sender: data.sender,
					contract: data.contract,
					fee: data.fee,
					amount: data.value,
					...description,
					additionalInfo: {
						current_contract_owner: objectInfo.owner,
						current_contract_whitelist: objectInfo.whitelist,
						current_contract_blacklist: objectInfo.blacklist,
						current_contract_fee_pool_balance: objectInfo.contractPoolBalance,
					},
				},
			};
		}
		case OPERATIONS_IDS.CONTRACT_WHITELIST: {
			const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
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
						current_contract_owner: objectInfo.owner,
						current_contract_whitelist: objectInfo.whitelist,
						current_contract_blacklist: objectInfo.blacklist,
						current_contract_fee_pool_balance: objectInfo.contractPoolBalance,
					},
				},
			};
		}
		default:
			return null;
	}
};

export default transformOperationDataByType;

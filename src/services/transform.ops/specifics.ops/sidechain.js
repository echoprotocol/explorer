import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES, ECHO_COMMITTEE_ACCOUNT } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	switch (opNumber) {
		case OPERATIONS_IDS.SIDECHAIN_ETH_CREATE_ADDRESS: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_ADDRESS: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
						received_deposit_address: data.eth_addr,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_DEPOSIT: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					account_name: data.account,
					amount: data.value,
					deposit_id: data.objectInfo.get('deposit_id'),
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_SEND_DEPOSIT: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					account_name: data.account,
					amount: data.amount,
					deposit_id: data.objectInfo.get('deposit_id'),
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_WITHDRAW: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					eth_address: data.eth_addr,
					amount: data.value,
					fee: data.fee,
					additionalInfo: {
						// number_of_confirmations: {
						// 	value: data.objectInfo.get('approves'),
						// 	total: data.objectInfo.get('total'),
						// },
						transaction_hash: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_SEND_WITHDRAW: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					withdraw_id: data.withdraw_id,
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
						original_operation: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_WITHDRAW: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					withdraw_id: data.withdraw_id,
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
						original_operation: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_UPDATE_CONTRACT_ADDRESS: {
			return {
				operationInfo: {
					type,
					sender: {
						value: ECHO_COMMITTEE_ACCOUNT.NAME,
						link: ECHO_COMMITTEE_ACCOUNT.ID,
					},
					new_address: data.new_addr,
					fee: data.fee,
					additionalInfo: {
						prev_address: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ISSUE: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					amount: data.value,
					deposit_id: data.deposit_id,
					fee: data.fee,
					additionalInfo: {
						original_operation: '', // TODO
						list_approvals: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BURN: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					amount: data.value,
					withdraw_id: data.withdraw_id,
					fee: data.fee,
					additionalInfo: {
						original_operation: '', // TODO
						list_approvals: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_REGISTER_TOKEN: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					eth_address: data.eth_addr,
					symbol: data.symbol,
					name: data.name,
					decimals: data.objectInfo.get('decimals'),
					fee: data.fee,
					additionalInfo: {
						associated_contract: data.objectInfo.get('contract'),
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_DEPOSIT_TOKEN: {
			return {
				operationInfo: {
					type,
					sender: '', // TODO
					account: data.account,
					amount: data.value,
					fee: data.fee,
					committee_member: data.committee_member_id,
					from_address: '', // TODO
					deposit_id: '', // TODO
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
						transaction_hash: data.transaction_hash,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_DEPOSIT_TOKEN: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					deposit_id: data.deposit_id,
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
						original_operation: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_WITHDRAW_TOKEN: {
			return {
				operationInfo: {
					type,
					sender: '', // TODO
					to_address: '', // TODO
					token: '', // TODO
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
						transaction_hash: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_WITHDRAW_TOKEN: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					withdraw_id: data.withdraw_id,
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
						transaction_hash: '', // TODO
						original_operation: '', // TODO
					},
				},
			};
		}
		default:
			return null;
	}
};

export default transformOperationDataByType;

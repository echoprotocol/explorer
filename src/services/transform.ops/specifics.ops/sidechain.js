import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES, ECHO_COMMITTEE_ACCOUNT } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
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
						list_approvals: data.objectInfo.get('list_approvals'),
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
						number_of_confirmations: {
							value: data.objectInfo.get('approves'),
							total: data.objectInfo.get('total'),
						},
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
						original_operation: {
							link: data.objectInfo.get('original_operation'),
							title: 'Withdraw operation',
						},
						list_approvals: data.objectInfo.get('list_approvals'),
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
						original_operation: {
							link: data.objectInfo.get('original_operation'),
							title: 'Withdraw operation',
						},
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
						original_operation: {
							link: data.objectInfo.get('original_operation'),
							title: 'Deposit operation',
						},
						list_approvals: data.objectInfo.get('list_approvals'),
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
						original_operation: {
							link: data.objectInfo.get('original_operation'),
							title: 'Withdraw operation',
						},
						list_approvals: data.objectInfo.get('list_approvals'),
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
					amount_info: data.value,
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
						original_operation: {
							link: data.objectInfo.get('original_operation'),
							title: 'Token deposit request operation',
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_WITHDRAW_TOKEN: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					to_eth_address: data.to,
					token: data.erc20_token,
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
						original_operation: {
							link: data.objectInfo.get('original_operation'),
							title: 'Token withdraw request operation',
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_ADDRESS: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					account_name: data.account,
					fee: data.fee,
					...description,
					additionalInfo: {
						received_deposit_address: objectInfo.received_deposit_address,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_INTERMEDIATE_DEPOSIT: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					account_name: data.account,
					fee: data.fee,
					...description,
					btc_address: objectInfo.deposit_address,
					transaction_hash: objectInfo.transaction_hash,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_APPROVE_TOKEN_WITHDRAW: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					withdraw_id: objectInfo.withdraw_id,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						operationLink: objectInfo.original_operation,
						transaction_hash: objectInfo.transaction_hash,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_ISSUE: {
			return {
				operationInfo: {
					type,
					amount_info: objectInfo.amount,
					account_name: data.account,
					deposit_id: objectInfo.deposit_id,
					token: objectInfo.token,
					fee: data.fee,
					...description,
					additionalInfo: {
						approves: objectInfo.approves_list,
						operationLink: objectInfo.original_operation,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_INTERMEDIATE_DEPOSIT: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					account_name: objectInfo.account,
					btc_address: objectInfo.intermediate_address,
					address_id: objectInfo.intermediate_address_id,
					signature: objectInfo.signature,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_BURN: {
			return {
				operationInfo: {
					type,
					amount_info: objectInfo.amount,
					account_name: data.account,
					withdraw_id: objectInfo.withdraw_id,
					token: objectInfo.token,
					fee: data.fee,
					...description,
					additionalInfo: {
						approves: objectInfo.approves_list,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_DEPOSIT: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					account_name: data.account,
					amount_info: objectInfo.amount,
					transaction_hash: objectInfo.transaction_hash,
					deposit_id: objectInfo.intermediate_deposit_id,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_WITHDRAW: {
			return {
				operationInfo: {
					type,
					account_name: data.account,
					amount_info: objectInfo.amount,
					btc_address: objectInfo.btc_addr,
					transaction_hash: objectInfo.transaction_hash,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_AGGREGATE: {
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					transaction_hash: objectInfo.transaction_hash,
					aggregation_out_value: objectInfo.aggregation_out_value,
					btc_block_number: objectInfo.btc_block_number,
					deposits: objectInfo.deposits.length ? objectInfo.deposits
						.map((el, i) => ({ key: i, value: el })) : undefined,
					withdrawals: objectInfo.withdrawals.length ? objectInfo.withdrawals
						.map((el, i) => ({ key: i, value: el })) : undefined,
					sma_address: objectInfo.sma_address,
					committee_member_ids_in_script: objectInfo.committee_member_ids_in_script
						.map((el, i) => ({ key: i, value: el[0], description: el[1] })),
					signatures: objectInfo.signatures
						.map((el) => ({ key: el[0], value: el[1] })),
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_APPROVE_AGGREGATE: {
			const op = objectInfo.aggregate_request_operation.split('-');
			return {
				operationInfo: {
					type,
					sender: data.committee_member_id,
					transaction_hash: objectInfo.transaction_hash,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
					},
					operationLink: `/blocks/${op[0]}/${(+op[1]) + 1}?op=${(+op[2]) + 1}`,
				},
			};
		}
		default:
			return null;
	}
};

export default transformOperationDataByType;
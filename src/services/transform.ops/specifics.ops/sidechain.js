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
					additionalInfo: {
						eth_address: data.objectInfo.get('eth_addr'),
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_ADDRESS: {
			return {
				operationInfo: {
					type,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						received_deposit_address: objectInfo.eth_addr,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_DEPOSIT: {
			return {
				operationInfo: {
					type,
					committee_member: data.committee_member_id,
					account_name: data.account,
					amount: data.value,
					deposit_id: data.objectInfo.get('deposit_id'),
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						eth_transaction_hash: objectInfo.transaction_hash,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_SEND_DEPOSIT: {
			return {
				operationInfo: {
					type,
					account_name: data.account,
					amount_info: objectInfo.amount,
					deposit_id: data.objectInfo.get('deposit_id'),
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						eth_transaction_hash: objectInfo.transaction_hash,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_WITHDRAW: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					eth_address: objectInfo.eth_addr,
					amount: data.value,
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						eth_transaction_hash: data.objectInfo.get('transaction_hash'),
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_SEND_WITHDRAW: {
			return {
				operationInfo: {
					type,
					committee_member: data.committee_member_id,
					withdraw_id: data.withdraw_id,
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
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
					withdraw_id: data.objectInfo.get('withdraw_id'),
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
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
					new_address: objectInfo.new_addr,
					fee: data.fee,
					additionalInfo: {
						prev_address: '', // TODO
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ISSUE: {
			const originalOperation = data.objectInfo.get('original_operation');
			const listApprovals = data.objectInfo.get('list_approvals');
			const obj = {
				operationInfo: {
					type,
					sender: data.account,
					amount: data.value,
					deposit_id: data.deposit_id,
					fee: data.fee,
					additionalInfo: (originalOperation || listApprovals) ? {
						original_operation: {
							link: originalOperation,
							title: 'Deposit operation',
						},
						list_approvals: listApprovals,
					} : undefined,
				},
			};
			if (objectInfo.transaction_hash) {
				obj.operationInfo[`${objectInfo.sidechain_type}_transaction_hash`] = objectInfo.transaction_hash;
			}
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_BURN: {
			const originalOperation = data.objectInfo.get('original_operation');
			const listApprovals = data.objectInfo.get('list_approvals');
			const obj = {
				operationInfo: {
					type,
					sender: data.account,
					amount: data.value,
					withdraw_id: data.withdraw_id,
					fee: data.fee,
					additionalInfo: (originalOperation || listApprovals) ? {
						original_operation: {
							link: originalOperation,
							title: 'Withdraw operation',
						},
						list_approvals: listApprovals,
					} : undefined,
				},
			};
			if (objectInfo.transaction_hash) {
				obj.operationInfo[`${objectInfo.sidechain_type}_transaction_hash`] = objectInfo.transaction_hash;
			}
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_SPV_CREATE: {
			const obj = {
				operationInfo: {
					fee: data.fee,
					committee_member: data.committee_member_id,
				},
			};
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_ETH_SPV_ADD_MISSED_TX_RECEIPT: {
			const obj = {
				operationInfo: {
					fee: data.fee,
					reporter: data.reporter,
					block_hash: data.block_hash,
				},
			};
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_SPV_CREATE: {
			const obj = {
				operationInfo: {
					fee: data.fee,
					committee_member: data.committee_member_id,
				},
			};
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_SPV_ADD_MISSED_TX_RECEIPT: {
			const obj = {
				operationInfo: {
					fee: data.fee,
					reporter: data.reporter,
					block_hash: data.block_hash,
				},
			};
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_SPV_EXCHANGE_EXCESS_FUNDS: {
			const obj = {
				operationInfo: {
					fee: data.fee,
					account: data.account,
					amount: data.amount,
				},
			};
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_REGISTER_CONTRACT_OPERATION: {
			const obj = {
				operationInfo: {
					eth_address: objectInfo.address,
					name: objectInfo.name,
					symbol: objectInfo.symbol,
					decimals: objectInfo.decimals,
				},
			};
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_TRANSFER_ASSET: {
			const obj = {
				operationInfo: {
					fee: data.fee,
					account: data.account,
					eth_address: data.to,
					amount: data.value,
				},
			};
			return obj;
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_REGISTER_TOKEN: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					eth_address: objectInfo.eth_addr,
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
					account: data.account,
					sidechain_amount_info: {
						amount: data.value,
						...objectInfo.sidechain_amount_info,
					},
					fee: data.fee,
					from_address: data.objectInfo.get('from_address'),
					deposit_id: data.objectInfo.get('deposit_id'),
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						eth_transaction_hash: objectInfo.transaction_hash,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_DEPOSIT_TOKEN: {
			return {
				operationInfo: {
					type,
					committee_member: data.committee_member_id,
					deposit_id: data.deposit_id,
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
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
					to_eth_address: data.objectInfo.get('eth_addr'),
					token: data.objectInfo.get('token'),
					amount_info: data.objectInfo.get('amount_info'),
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						eth_transaction_hash: objectInfo.transaction_hash,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_WITHDRAW_TOKEN: {
			return {
				operationInfo: {
					type,
					committee_member: data.committee_member_id,
					withdraw_id: data.withdraw_id,
					fee: data.fee,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						eth_transaction_hash: objectInfo.transaction_hash,
						original_operation: {
							link: data.objectInfo.get('original_operation'),
							title: 'Token withdraw request operation',
						},
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_APPROVE_TOKEN_WITHDRAW: {
			return {
				operationInfo: {
					type,
					withdraw_id: objectInfo.withdraw_id,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: objectInfo.approves,
							total: objectInfo.total,
						},
						operationLink: objectInfo.original_operation,
						eth_transaction_hash: objectInfo.transaction_hash,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_ISSUE: {
			return {
				operationInfo: {
					type,
					sidechain_amount_info: {
						amount: data.amount,
						...objectInfo.sidechain_amount_info,
					},
					account_name: data.account,
					deposit_id: data.deposit,
					token: objectInfo.token,
					fee: data.fee,
					...description,
					additionalInfo: (objectInfo.list_approvals || objectInfo.original_operation) ? {
						list_approvals: objectInfo.list_approvals,
						original_operation: {
							link: objectInfo.original_operation,
							title: 'Deposit operation',
						},
					} : undefined,
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_BURN: {
			return {
				operationInfo: {
					type,
					amount_info: objectInfo.amount_info,
					account_name: data.account,
					withdraw_id: data.withdraw,
					token: objectInfo.token,
					fee: data.fee,
					...description,
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
		case OPERATIONS_IDS.SIDECHAIN_BTC_DEPOSIT: {
			return {
				operationInfo: {
					type,
					committee_member: data.committee_member_id,
					account_name: data.account,
					amount_info: objectInfo.amount,
					btc_transaction_hash: objectInfo.transaction_hash,
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
					btc_transaction_hash: objectInfo.transaction_hash,
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
					committee_member: data.committee_member_id,
					btc_transaction_hash: objectInfo.transaction_hash,
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
					committee_member: data.committee_member_id,
					btc_transaction_hash: objectInfo.transaction_hash,
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
		case OPERATIONS_IDS.SIDECHAIN_STAKE_ETH_UPDATE: {
			return {
				operationInfo: {
					type,
					fee: data.fee,
					asset_id: data.asset_id,
					amount: objectInfo.sidechain_amount,
					current_balance: data.current_balance,
					account: data.account,
					eth_transaction_hash: data.transaction_hash,
					transaction_type: objectInfo.transaction_type,
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_STAKE_SCRIPT: {
			return {
				operationInfo: {
					type,
					fee: data.fee,
					owner: data.account,
					pubkey_hash: data.pubkey_hash,
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_STAKE_BTC_UPDATE: {
			return {
				operationInfo: {
					type,
					fee: data.fee,
					committee_member: data.committee_member_id,
					amount: objectInfo.sidechain_amount,
					owner: data.account,
					btc_transaction_hash: objectInfo.transaction_hash,
					is_vin: data.is_vin,
					transaction_type: objectInfo.transaction_type,
				},
			};
		}
		default:
			return null;
	}
};

export default transformOperationDataByType;

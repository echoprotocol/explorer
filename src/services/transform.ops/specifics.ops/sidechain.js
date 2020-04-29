import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

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
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_APPROVE_TOKEN_WITHDRAW: {
			const op = objectInfo.sidchain_erc_20_withdraw_token && objectInfo.sidchain_erc_20_withdraw_token.split('-');
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
						operationLink: op && `/blocks/${op[0]}/${(+op[1]) + 1}?op=${(+op[2]) + 1}`,
						transaction_hash: objectInfo.transaction_hash,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_ISSUE: {
			const op = objectInfo.sidchain_erc_20_deposit_token && objectInfo.sidchain_erc_20_deposit_token.split('-');
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
						approves: objectInfo.approves_list && objectInfo.approves_list.map((el) => {
							const indexes = el.split('-');
							return {
								link: el && `/blocks/${indexes[0]}/${(+indexes[1]) + 1}?op=${(+indexes[2]) + 1}`,
								title: 'Original operation',
							};
						}),
						operationLink: op && `/blocks/${op[0]}/${(+op[1]) + 1}?op=${(+op[2]) + 1}`,
					},
				},
			};
		}
		case OPERATIONS_IDS.SIDECHAIN_ERC20_BURN: {
			const op = objectInfo.sidchain_erc_20_withdraw_token && objectInfo.sidchain_erc_20_withdraw_token.split('-');
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
						approves: objectInfo.approves_list && objectInfo.approves_list.map((el) => {
							const indexes = el.split('-');
							return {
								link: el && `/blocks/${indexes[0]}/${(+indexes[1]) + 1}?op=${(+indexes[2]) + 1}`,
								title: 'Original operation',
							};
						}),
						operationLink: op && `/blocks/${op[0]}/${(+op[1]) + 1}?op=${(+op[2]) + 1}`,
					},
				},
			};
		}
		default:
			return null;
	}
};

export default transformOperationDataByType;

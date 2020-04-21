import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	// TODO additional info, add sidechainOperations to TransactionActions like as accountOperations
	switch (opNumber) {
		case OPERATIONS_IDS.SIDECHAIN_ETH_CREATE_ADDRESS: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					fee: data.fee,
					...description,
					additionalInfo: {
						number_of_confirmations: {
							value: '2',
							total: '8',
						},
						received_deposit_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
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
							value: '2',
							total: '8',
						},
						received_deposit_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
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
					deposit_id: data.deposit_id.amount,
					fee: data.fee,
					...description,
				},
			};
		}
		default:
			return null;
	}
};

export default transformOperationDataByType;

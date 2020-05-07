import { OPERATIONS_IDS } from 'echojs-lib';

import { ECHO_COMMITTEE_ACCOUNT, OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';
import getAdditionalInfoByOpId from '../AddInfoHelper';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];

	switch (opNumber) {
		case OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE: {
			const { btcAddress, committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					sender: data.committee_member_account,
					url: data.url,
					eth_address: data.eth_address,
					btc_address: btcAddress,
					deposit_amount: data.deposit,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE: {
			const { btcAddress, committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					sender: data.committee_member_account,
					new_url: data.new_url,
					new_eth_address: data.new_eth_address,
					new_btc_address: btcAddress,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS: {
			return {
				operationInfo: {
					type,
					sender: {
						value: ECHO_COMMITTEE_ACCOUNT.NAME,
						link: ECHO_COMMITTEE_ACCOUNT.ID,
					},
					changed_parameters: Object.keys(data.new_parameters),
					fee: data.fee,
					...description,
					additionalInfo: {
						current_global_parametres: 'https://explorer.echo.org/blocks/70/1?op=1',
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_MEMBER_ACTIVATE: {
			const { committeeStatus, account } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					account_name: account,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_MEMBER_DEACTIVATE: {
			const { committeeStatus, account } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					account_name: account,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_DEPOSIT: {
			const { committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					sender: data.committee_member_account,
					amount: data.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
						current_account_frozen_balance: data.objectInfo.get('frozenBalance'),
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_WITHDRAW: {
			const { committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					sender: data.committee_member_account,
					amount: data.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
						current_account_frozen_balance: data.objectInfo.get('frozenBalance'),
					},
				},
			};
		}
		default:
			return null;
	}
};


export default transformOperationDataByType;

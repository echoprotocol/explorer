import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';
import getAdditionalInfoByOpId from '../AddInfoHelper';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
	switch (opNumber) {
		case OPERATIONS_IDS.VESTING_BALANCE_CREATE: {
			const {
				isAllowedBalance, vestedBalance, balanceToClaim, balanceToWithdraw,
			} = await getAdditionalInfoByOpId(opNumber, data);

			return {
				operationInfo: {
					type,
					sender: data.creator,
					owner: data.owner,
					amount: data.amount,
					policy: [{
						name: 'Object 1',
						...data.policy[1],
					}],
					fee: data.fee,
					...description,
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: isAllowedBalance ? 'Available' : 'Not available',
						}, {
							key: 'Vested balance',
							value: `${vestedBalance} ECHO`,
						}, {
							key: 'Available to claim',
							value: `${balanceToClaim} ECHO`,
						}, {
							key: 'Allow to withdraw',
							value: `${balanceToWithdraw} ECHO`,
						}],
					},
				},
			};
		}
		case OPERATIONS_IDS.VESTING_BALANCE_WITHDRAW: {
			const {
				isAllowedBalance, vestedBalance, balanceToClaim, balanceToWithdraw,
			} = await getAdditionalInfoByOpId(opNumber, data);

			return {
				operationInfo: {
					type,
					sender: data.owner,
					amount: data.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: isAllowedBalance ? 'Available' : 'Not available',
						}, {
							key: 'Vested balance',
							value: `${vestedBalance} ECHO`,
						}, {
							key: 'Available to claim',
							value: `${balanceToClaim} ECHO`,
						}, {
							key: 'Allow to withdraw',
							value: `${balanceToWithdraw} ECHO`,
						}],
					},
				},
			};
		}
		case OPERATIONS_IDS.BALANCE_CLAIM: {
			return {
				operationInfo: {
					type,
					sender: data.deposit_to_account,
					balance_object_id: data.balance_to_claim,
					amount: data.amount,
					balance_owner_key: data.balance_owner_key,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: 'statusString',
						}, {
							key: 'Vested balance',
							value: '1000.000000234 ECHO',
						}, {
							key: 'Available to claim',
							value: 'string',
						}, {
							key: 'Allow to withdraw',
							value: 'string',
						}],
					},
				},
			};
		}
		case OPERATIONS_IDS.BALANCE_FREEZE: {
			const duration = data.duration.amount > 1 ? `${data.duration.amount} days` : `${data.duration.amount} day`;
			return {
				operationInfo: {
					type,
					sender: data.account,
					duration,
					amount: data.amount,
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.BALANCE_UNFREEZE: {
			return {
				operationInfo: {
					type: 'Unfreeze balance (virtual)',
					receiver: data.account,
					amount: data.amount,
				},
			};
		}
		case OPERATIONS_IDS.REQUEST_BALANCE_UNFREEZE: {
			return {
				operationInfo: {
					type: 'Request unfreeze balance',
					sender: data.account,
					assets: objectInfo.assets,
				},
			};
		}
		default:
			return null;
	}
};

export default transformOperationDataByType;

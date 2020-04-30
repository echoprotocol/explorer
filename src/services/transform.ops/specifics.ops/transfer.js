import { OPERATIONS_IDS } from 'echojs-lib';
import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	switch (opNumber) {
		case OPERATIONS_IDS.TRANSFER:
			return {
				operationInfo: {
					type,
					from: data.from,
					to: data.to,
					amount: data.amount,
					fee: data.fee,
					...description,
				},
			};
		case OPERATIONS_IDS.TRANSFER_TO_ADDRESS:
			return {
				operationInfo: {
					type,
					from: data.from,
					amount: data.amount,
					fee: data.fee,
					to_address: data.to_address,
					to_account: data.to_account,
					...description,
				},
			};
		case OPERATIONS_IDS.OVERRIDE_TRANSFER:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					from: data.from,
					amount: data.amount,
					fee: data.fee,
					to: data.to,
					...description,
				},
			};
		default:
			return null;
	}
};

export default transformOperationDataByType;

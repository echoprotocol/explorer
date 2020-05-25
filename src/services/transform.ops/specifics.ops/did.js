import { OPERATIONS_IDS } from 'echojs-lib';
import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
	switch (opNumber) {
		case OPERATIONS_IDS.DID_CREATE_OPERATION: {
			return {
				operationInfo: {
					type,
					registrar: data.registrar,
					essence: data.essence,
					fee: data.fee,
					public_keys: objectInfo.public_keys,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.DID_UPDATE_OPERATION: {
			return {
				operationInfo: {
					type,
					registrar: data.registrar,
					did_identifier: data.did_identifier,
					pub_keys_to_add: objectInfo.pub_keys_to_add,
					pub_keys_to_delete: objectInfo.pub_keys_to_delete,
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.DID_DELETE_OPERATION: {
			return {
				operationInfo: {
					type,
					registrar: data.registrar,
					did_identifier: data.did_identifier,
					fee: data.fee,
					...description,
				},
			};
		}
		default:
			return { };
	}
};

export default transformOperationDataByType;

import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
	switch (opNumber) {
		case OPERATIONS_IDS.DID_CREATE: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					fee: data.fee,
					essence: objectInfo.essence,
					public_keys: objectInfo.public_keys,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.DID_UPDATE: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					fee: data.fee,
					did_identifier: objectInfo.did_identifier,
					pub_keys_to_delete: objectInfo.pub_keys_to_delete,
					pub_keys_to_add: objectInfo.pub_keys_to_add,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.DID_DELETE: {
			return {
				operationInfo: {
					type,
					sender: data.account,
					fee: data.fee,
					did_identifier: objectInfo.did_identifier,
					...description,
				},
			};
		}
		default:
			return null;
	}
};

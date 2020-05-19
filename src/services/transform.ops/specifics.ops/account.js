import { OPERATIONS_IDS } from 'echojs-lib';

import { ACCOUNT_BLACK_WHITE, OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';
import getAdditionalInfoByOpId from '../AddInfoHelper';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};

	switch (opNumber) {
		case OPERATIONS_IDS.ACCOUNT_CREATE: {
			return {
				operationInfo: {
					type,
					registrar: data.registrar,
					account_name: {
						value: data.mainInfo.subject.name,
						link: data.mainInfo.subject.id,
					},
					new_account_id: data.mainInfo.subject.id,
					authority: objectInfo.key_auths,
					weight_threshold: objectInfo.weight_threshold,
					echorand_key: data.echorand_key,
					delegating_account: data.delegating_account,
					delegate_share: data.delegate_share,
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ACCOUNT_UPDATE: {
			return {
				operationInfo: {
					type,
					delegate_share: data.delegate_share,
					delegating_account: data.delegating_account,
					authority: objectInfo.key_auths,
					echorand_key: data.objectInfo.get('echorandKey'),
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ACCOUNT_WHITELIST: {
			const additionalInfo = await getAdditionalInfoByOpId(opNumber, data.authorizing_account.link);
			return {
				operationInfo: {
					type,
					fee: data.fee,
					sender: data.authorizing_account,
					listed_account: data.account_to_list,
					new_status: ACCOUNT_BLACK_WHITE[data.new_listing],
					additionalInfo,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ACCOUNT_ADDRESS_CREATE:
			return {
				operationInfo: {
					type,
					sender: data.owner,
					address: data.address,
					label: data.label,
					fee: data.fee,
					...description,
				},
			};
		case OPERATIONS_IDS.BLOCK_REWARD:
			return {
				operationInfo: {
					type,
					to: data.receiver,
					assets: objectInfo.assets && objectInfo.assets.map((el) => ({ key: el.asset_id, value: el.amount })),
					...description,
				},
			};
		case OPERATIONS_IDS.EVM_ADDRESS_REGISTER:
			return {
				operationInfo: {
					type,
					sender: data.owner,
					address: objectInfo.evm_address,
					fee: data.fee,
					...description,
				},
			};
		default:
			return null;
	}
};

export default transformOperationDataByType;

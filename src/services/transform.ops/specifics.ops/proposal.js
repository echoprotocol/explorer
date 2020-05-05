import { OPERATIONS_IDS } from 'echojs-lib';
import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';


export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
	switch (opNumber) {
		case OPERATIONS_IDS.PROPOSAL_CREATE: {
			return {
				operationInfo: {
					type,
					proposal_id: objectInfo.id,
					sender: data.fee_paying_account,
					expiration_time: objectInfo.expirationTime,
					preview_period: objectInfo.reviewPeriodSeconds,
					fee: data.fee,
					...description,
					additionalInfo: {
						count_approvals: objectInfo.count_approvals,
						proposal_status: objectInfo.status,
						// result_transaction: 'https://explorer.echo.org/blocks/70/1?op=1',
					},
				},
				proposalOperations: data.proposals,
			};
		}
		case OPERATIONS_IDS.PROPOSAL_UPDATE: {
			return {
				operationInfo: {
					type,
					sender: data.fee_paying_account,
					proposal_id: objectInfo.id,
					approvals_to_add: [...objectInfo.active_approvals_to_add, ...objectInfo.key_approvals_to_add].length ?
						[...objectInfo.active_approvals_to_add, ...objectInfo.key_approvals_to_add].map((el) => ({
							value: el,
							link: el,
						})) : undefined,
					approvals_to_remove: [...objectInfo.active_approvals_to_remove, ...objectInfo.key_approvals_to_remove].length ?
						[...objectInfo.active_approvals_to_remove, ...objectInfo.key_approvals_to_remove].map((el) => ({
							value: el,
							link: el,
						})) : undefined,
					fee: data.fee,
					...description,
					additionalInfo: {
						count_signatures: objectInfo.count_signatures,
						proposal_status: objectInfo.status,
					},
				},
				proposalOperations: data.proposals,
			};
		}
		case OPERATIONS_IDS.PROPOSAL_DELETE: {
			return {
				operationInfo: {
					type,
					sender: data.fee_paying_account,
					proposal_id: objectInfo.id,
					fee: data.fee,
					...description,
					additionalInfo: {
						count_signatures: objectInfo.count_signatures,
						proposal_status: objectInfo.status,
					},
				},
				proposalOperations: data.proposals,
			};
		}
		default:
			return { };
	}
};

export default transformOperationDataByType;

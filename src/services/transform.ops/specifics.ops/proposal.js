// import { OPERATIONS_IDS } from 'echojs-lib';
// import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber) => {
	// const type = OPS_TYPES[opNumber];
	// const description = OPS_DESCRIPTIONS[opNumber];
	// const objectInfo = data.objectInfo ? data.objectInfo.toJS() : {};
	// TODO almost all, have a trouble
	switch (opNumber) {
		// case OPERATIONS_IDS.PROPOSAL_CREATE: {
		// 	return {
		// 		operationInfo: {
		// 			type,
		// 			sender: data.fee_paying_account,
		// 			expiration_time: data.expiration_time,
		// 			preview_period: data.review_period_seconds,
		// 			fee: data.fee,
		// 			...description,
		// 			additionalInfo: {
		// 				// count_approvals: { // ADD after succce proposal
		// 				// 	value: 2,
		// 				// 	total: 4,
		// 				// },
		// 				proposal_status: objectInfo.status,
		// 				result_transaction: 'https://explorer.echo.org/blocks/70/1?op=1',
		// 			},
		// 		},
		// 		proposalOperations: data.proposals,
		// 	};
		// }
		// case OPERATIONS_IDS.PROPOSAL_UPDATE: {
		// 	return {
		// 		operationInfo: {
		// 			type,
		// 			sender: data.fee_paying_account,
		// 			proposal_id: data.proposal,
		// 			approvals_to_add: [...data.active_approvals_to_add, ...data.key_approvals_to_add],
		// 			approvals_to_remove: [...data.active_approvals_to_remove, ...data.key_approvals_to_remove],
		// 			fee: data.fee,
		// 			...description,
		// 			additionalInfo: {
		// 				count_signatures: '2',
		// 				proposal_status: 'approved',
		// 			},
		// 		},
		// 		proposalOperations: data.proposed_ops,
		// 	};
		// }
		// case OPERATIONS_IDS.PROPOSAL_DELETE: {
		// 	return {
		// 		operationInfo: {
		// 			type,
		// 			sender: data.fee_paying_account,
		// 			proposal_id: data.proposal,
		// 			fee: data.fee,
		// 			...description,
		// 			additionalInfo: {
		// 				count_signatures: '2',
		// 				proposal_status: 'approved',
		// 			},
		// 		},
		// 		proposalOperations: data.proposed_ops,
		// 	};
		// }
		default:
			return { };
	}
};

export default transformOperationDataByType;

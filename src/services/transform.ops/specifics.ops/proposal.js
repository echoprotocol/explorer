// import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';

export const transformOperationDataByType = async (opNumber) => {
	// const type = OPS_TYPES[opNumber];
	// const description = OPS_DESCRIPTIONS[opNumber];
	// TODO almost all, have a trouble
	switch (opNumber) {
		// case OPERATIONS_IDS.PROPOSAL_CREATE: {
		// 	return {
		// 		operationInfo: {
		// 			type,
		// 			sender: data.fee_paying_account,
		// 			expiration_time: data.expiration_time,
		// 			preview_period: data.review_period_seconds.amount,
		// 			fee: data.fee,
		// 			...description,
		// 			additionalInfo: {
		// 				// count_approvals: { // ADD after succce proposal
		// 				// 	value: 2,
		// 				// 	total: 4,
		// 				// },
		// 				proposal_status: data.objectInfo ? 'resolve' : 'rejected',
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
		// 			proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
		// 			approvals_to_add: [{
		// 				value: 'ECHOd9f8LmNjn32GUMXZwNZDsfBqa6qcBGvGk86kKTuvzkMjdW9saCrTtrPwGpuB',
		// 				weight: '1',
		// 			}],
		// 			approvals_to_remove: [{
		// 				value: 'vic.tor',
		// 				weight: '1',
		// 			}],
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
		// 			proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
		// 			fee: data.fee,
		// 			...description,
		// 			additionalInfo: {
		// 				count_signatures: '2',
		// 				proposal_status: 'approved',
		// 			},
		// 		},
		// 		// proposalOperations: data.proposed_ops,
		// 	};
		// }
		default:
			return { };
	}
};

export default transformOperationDataByType;

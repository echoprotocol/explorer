import { OPERATION_TYPES } from '../constants/OperationTypeConstants';

export const transformOperationDataByType = (type, data) => {
	switch (type) {
		case OPERATION_TYPES.ACCOUNT_CREATE:
			return {
				operationInfo: {
					type: 'Create account',
					registrar: data.registrar,
					account_name: {
						name: 'account',
						id: '1.2.3',
					},
					new_account_id: '1.2.3',
					authority: [{
						value: 'ECHOd9f8LmNjn32GUMXZwNZDsfBqa6qcBGvGk86kKTuvzkMjdW9saCrTtrPwGpuB',
						weight: '1',
					}, {
						value: 'vic.tor',
						weight: '1',
					}],
					echorand_key: 'anyStringValue',
					delegating_account: {
						name: 'account',
						id: '1.2.3',
					},
					delegate_share: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: data.fee,
				},
			};
		default:
			return {};
	}
};

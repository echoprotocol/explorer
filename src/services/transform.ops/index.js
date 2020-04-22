import { OPERATIONS_IDS } from 'echojs-lib';

import transformSidechainOperations from './specifics.ops/sidechain';

export const transformOperationDataByType = async (opNumber, data) => {
	switch (opNumber) {
		case OPERATIONS_IDS.SIDECHAIN_ETH_CREATE_ADDRESS:
		case OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_ADDRESS:
		case OPERATIONS_IDS.SIDECHAIN_ETH_DEPOSIT:
		case OPERATIONS_IDS.SIDECHAIN_ETH_SEND_DEPOSIT:
			return transformSidechainOperations(opNumber, data);
		default:
			return {};
	}
};

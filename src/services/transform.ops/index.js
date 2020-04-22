import { OPERATIONS_IDS } from 'echojs-lib';

import transformTransferOperations from './specifics.ops/transfer';
import transformAccountOperations from './specifics.ops/account';
import transformAssetOperations from './specifics.ops/asset';
import transformProposalOperations from './specifics.ops/proposal';
import transformCommitteeOperations from './specifics.ops/committee';
import transformVestingOperations from './specifics.ops/vesting.balance';
import transformContractOperations from './specifics.ops/contract';
import transformSidechainOperations from './specifics.ops/sidechain';

export const transformOperationDataByType = async (opNumber, data) => {
	switch (opNumber) {
		case OPERATIONS_IDS.TRANSFER:
		case OPERATIONS_IDS.TRANSFER_TO_ADDRESS:
		case OPERATIONS_IDS.OVERRIDE_TRANSFER:
			return transformTransferOperations(opNumber, data);
		case OPERATIONS_IDS.ACCOUNT_CREATE:
		case OPERATIONS_IDS.ACCOUNT_UPDATE:
		case OPERATIONS_IDS.ACCOUNT_WHITELIST:
		case OPERATIONS_IDS.ACCOUNT_ADDRESS_CREATE:
			return transformAccountOperations(opNumber, data);
		case OPERATIONS_IDS.ASSET_CREATE:
		case OPERATIONS_IDS.ASSET_UPDATE:
		case OPERATIONS_IDS.ASSET_UPDATE_BITASSET:
		case OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS:
		case OPERATIONS_IDS.ASSET_ISSUE:
		case OPERATIONS_IDS.ASSET_RESERVE:
		case OPERATIONS_IDS.ASSET_FUND_FEE_POOL:
		case OPERATIONS_IDS.ASSET_PUBLISH_FEED:
		case OPERATIONS_IDS.ASSET_CLAIM_FEES:
			return transformAssetOperations(opNumber, data);
		case OPERATIONS_IDS.PROPOSAL_CREATE:
		case OPERATIONS_IDS.PROPOSAL_UPDATE:
		case OPERATIONS_IDS.PROPOSAL_DELETE:
			return transformProposalOperations(opNumber, data);
		case OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE:
		case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE:
		case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS:
		case OPERATIONS_IDS.COMMITTEE_MEMBER_ACTIVATE:
		case OPERATIONS_IDS.COMMITTEE_MEMBER_DEACTIVATE:
		case OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_DEPOSIT:
		case OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_WITHDRAW:
			return transformCommitteeOperations(opNumber, data);
		case OPERATIONS_IDS.VESTING_BALANCE_CREATE:
		case OPERATIONS_IDS.VESTING_BALANCE_WITHDRAW:
		case OPERATIONS_IDS.BALANCE_CLAIM:
		case OPERATIONS_IDS.BALANCE_FREEZE:
		case OPERATIONS_IDS.BALANCE_UNFREEZE:
			return transformVestingOperations(opNumber, data);
		case OPERATIONS_IDS.CONTRACT_CREATE:
		case OPERATIONS_IDS.CONTRACT_CALL:
		case OPERATIONS_IDS.CONTRACT_INTERNAL_CREATE:
		case OPERATIONS_IDS.CONTRACT_INTERNAL_CALL:
		case OPERATIONS_IDS.CONTRACT_SELFDESTRUCT:
		case OPERATIONS_IDS.CONTRACT_UPDATE:
		case OPERATIONS_IDS.CONTRACT_FUND_POOL:
		case OPERATIONS_IDS.CONTRACT_WHITELIST:
			return transformContractOperations(opNumber, data);
		case OPERATIONS_IDS.SIDECHAIN_ETH_CREATE_ADDRESS:
		case OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_ADDRESS:
		case OPERATIONS_IDS.SIDECHAIN_ETH_DEPOSIT:
		case OPERATIONS_IDS.SIDECHAIN_ETH_SEND_DEPOSIT:
			return transformSidechainOperations(opNumber, data);
		default:
			return {};
	}
};

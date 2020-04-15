import Operations from './Operations';

export const OPERATION_TYPES = {
	TRANSFER: Operations.transfer.name,
	TRANSFER_TO_ADDRESS: Operations.transfer_to_address.name,
	OVERRIDE_TRANSFER: Operations.override_transfer.name,
	ACCOUNT_CREATE: Operations.account_create.name,
	CONTRACT_TRANSFER: Operations.contract_create.name,
	ACCOUNT_UPDATE: Operations.account_update.name,
	ACCOUNT_WHITELIST: Operations.account_whitelist.name,
	ACCOUNT_ADDRESS_CREATE: Operations.account_address_create.name,
	ASSET_CREATE: Operations.asset_create.name,
	ASSET_UPDATE: 'Update asset',
	ASSET_UPDATE_BITASSET: 'Update SmartCoin',
	ASSET_UPDATE_FEED_PRODUCERS: 'Update asset feed producers',
	ASSET_ISSUE: Operations.asset_issue,
	ASSET_REVERSE: 'Burn asset',
	ASSET_FUND_FEE_POOL: 'Fund asset fee pool',
	ASSET_PUBLISH_FEED: 'Publish feed',
	ASSET_CLAIM_FEES: 'Claim asset fees',
	PROPOSAL_CREATE: 'Create proposal',
	PROPOSAL_UPDATE: 'Update proposal',
	PROPOSAL_DELETE: 'Delete proposal',
	COMMITTEE_MEMBER_CREATE: 'Create committee member',
	COMMITTEE_MEMBER_UPDATE: 'Update committee member',
	COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS: 'Global parameters update',
};

export const ACCOUNT_BLACK_WHITE = {
	0: 'NONE',
	1: 'WHITE_LISTED',
	2: 'BLACK_LISTED',
	3: 'WHITE_AND_BLACK_LISTED',
};

export const ASSET_ISSUER_PERMISSION_FLAGS = {
	WHITE_LIST: 1,
	OVVERIDE_AUTHORITY: 2,
	TRANSFER_RESTRICTED: 4,
	COMMITTEE_FED_ASSET: 8,
};

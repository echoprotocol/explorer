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
	ASSET_ISSUE: Operations.asset_issue.name,
	ASSET_RESERVE: Operations.asset_reserve.name,
	ASSET_FUND_FEE_POOL: Operations.asset_fund_fee_pool.name,
	ASSET_PUBLISH_FEED: Operations.asset_publish_feed.name,
	ASSET_CLAIM_FEES: Operations.asset_claim_fees.name,
	PROPOSAL_CREATE: Operations.proposal_create.name,
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

export const OPS_DESCRIPTIONS = {
	ASSET_ISSUE: 'Asset issue to account.',
	ASSET_RESERVE: 'Used to take an asset out of circulation, returning to the issuer',
	ASSET_FUND_FEE_POOL: '',
	ASSET_PUBLISH_FEED: `Publish price feeds for market-issued assets.
		Price feed providers use this operation to publish their price feeds for market-issued assets. A price feed is used to tune the market for a particular market-issued asset. For each value in the feed, the median across all committee_member feeds for that asset is calculated and the market for the asset is configured with the median of that value.
		The feed in the operation contains three prices: a call price limit, a short price limit, and a settlement price. The call limit price is structured as (collateral asset) / (debt asset) and the short limit price is structured as (asset for sale) / (collateral asset). Note that the asset IDs are opposite to eachother, so if we're publishing a feed for USD, the call limit price will be ECHO/USD and the short limit price will be USD/ECHO. The settlement price may be flipped either direction, as long as it is a ratio between the market-issued asset and its collateral.`,
	ASSET_CLAIM_FEES: 'Used to transfer accumulated fees back to the issuer\'s balance',
	PROPOSAL_CREATE: `The proposal_create_operation creates a transaction proposal, for use in multi-sig scenarios.
			Creates a transaction proposal. The operations which compose the transaction are listed in order in proposed_ops, and expiration_time specifies the time by which the proposal must be accepted or it will fail permanently. The expiration_time cannot be farther in the future than the maximum expiration time set in the global properties object.`,

};

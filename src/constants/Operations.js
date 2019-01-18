import { OPERATIONS_IDS } from 'echojs-lib';

export default {
	transfer: {
		value: OPERATIONS_IDS.TRANSFER,
		name: 'Transfer',
		options: {
			from: 'from',
			subject: ['to', 'name'],
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	limit_order_create: {
		value: OPERATIONS_IDS.LIMIT_ORDER_CREATE,
		name: 'Place order',
		options: {
			from: 'seller',
			subject: null,
			value: 'amount_to_sell.amount',
			asset: 'amount_to_sell.asset_id',
		},
	},
	limit_order_cancel: {
		value: OPERATIONS_IDS.LIMIT_ORDER_CANCEL,
		name: 'Cancel order',
		options: {
			from: 'fee_paying_account',
			subject: ['order', 'name'],
			value: null,
			asset: null,
		},
	},
	call_order_update: {
		value: OPERATIONS_IDS.CALL_ORDER_UPDATE,
		name: 'Update margin',
		options: {
			from: 'funding_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	fill_order: {
		value: OPERATIONS_IDS.FILL_ORDER,
		name: 'Fill order',
		options: {
			from: 'account_id',
			subject: ['order_id', null],
			value: 'pays.amount',
			asset: 'pays.asset_id',
		},
	},
	account_create: {
		value: OPERATIONS_IDS.ACCOUNT_CREATE,
		name: 'Create account',
		options: {
			from: 'registrar',
			subject: ['name', null],
			value: null,
			asset: null,
		},
	},
	account_update: {
		value: OPERATIONS_IDS.ACCOUNT_UPDATE,
		name: 'Update account',
		options: {
			from: 'account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	account_whitelist: {
		value: OPERATIONS_IDS.ACCOUNT_WHITELIST,
		name: 'Account whitelist',
		options: {
			from: 'authorizing_account',
			subject: ['account_to_list', 'name'],
			value: null,
			asset: null,
		},
	},
	account_upgrade: {
		value: OPERATIONS_IDS.ACCOUNT_UPGRADE,
		name: 'Upgrade Account',
		options: {
			from: 'account_to_upgrade',
			subject: null,
			value: null,
			asset: null,
		},
	},
	account_transfer: {
		value: OPERATIONS_IDS.ACCOUNT_TRANSFER,
		name: 'Transfer Account',
		options: {
			from: 'account_id',
			subject: ['new_owner', 'name'],
			value: null,
			asset: null,
		},
	},
	asset_create: {
		value: OPERATIONS_IDS.ASSET_CREATE,
		name: 'Create asset',
		options: {
			from: 'issuer',
			subject: ['symbol', null],
			value: null,
			asset: null,
		},
	},
	asset_update: {
		value: OPERATIONS_IDS.ASSET_UPDATE,
		name: 'Update asset',
		options: {
			from: 'issuer',
			subject: ['asset_to_update', 'symbol'],
			value: null,
			asset: null,
		},
	},
	asset_update_bitasset: {
		value: OPERATIONS_IDS.ASSET_UPDATE_BITASSET,
		name: 'Update SmartCoin',
		options: {
			from: 'issuer',
			subject: ['asset_to_update', 'symbol'],
			value: null,
			asset: null,
		},
	},
	asset_update_feed_producers: {
		value: OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS,
		name: 'Update asset feed producers',
		options: {
			from: 'issuer',
			subject: ['asset_to_update', 'symbol'],
			value: null,
			asset: null,
		},
	},
	asset_issue: {
		value: OPERATIONS_IDS.ASSET_ISSUE,
		name: 'Issue asset',
		options: {
			from: 'issuer',
			subject: ['issue_to_account', 'name'],
			value: 'asset_to_issue.amount',
			asset: 'asset_to_issue.asset_id',
		},
	},
	asset_reserve: {
		value: OPERATIONS_IDS.ASSET_RESERVE,
		name: 'Burn asset',
		options: {
			from: 'payer',
			subject: null,
			value: 'amount_to_reserve.amount',
			asset: 'amount_to_reserve.asset_id',
		},
	},
	asset_fund_fee_pool: {
		value: OPERATIONS_IDS.ASSET_FUND_FEE_POOL,
		name: 'Fund asset fee pool',
		options: {
			from: 'from_account',
			subject: null,
			value: 'amount',
			asset: 'asset_id',
		},
	},
	asset_settle: {
		value: OPERATIONS_IDS.ASSET_SETTLE,
		name: 'Asset settlement',
		options: {
			from: 'account',
			subject: null,
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	asset_global_settle: {
		value: OPERATIONS_IDS.ASSET_GLOBAL_SETTLE,
		name: 'Global asset settlement',
		options: {
			from: 'issuer',
			subject: null,
			value: 'settle_price',
			asset: 'asset_to_settle',
		},
	},
	asset_publish_feed: {
		value: OPERATIONS_IDS.ASSET_PUBLISH_FEED,
		name: 'Publish feed',
		options: {
			from: 'publisher',
			subject: ['asset_id', 'symbol'],
			value: 'feed',
			asset: 'asset_id',
		},
	},
	witness_create: {
		value: OPERATIONS_IDS.WITNESS_CREATE,
		name: 'Create witness',
		options: {
			from: 'witness_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	witness_update: {
		value: OPERATIONS_IDS.WITNESS_UPDATE,
		name: 'Update witness',
		options: {
			from: 'witness_account',
			subject: ['witness', 'name'],
			value: null,
			asset: null,
		},
	},
	proposal_create: {
		value: OPERATIONS_IDS.PROPOSAL_CREATE,
		name: 'Create proposal',
		options: {
			from: 'fee_paying_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	proposal_update: {
		value: OPERATIONS_IDS.PROPOSAL_UPDATE,
		name: 'Update proposal',
		options: {
			from: 'fee_paying_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	proposal_delete: {
		value: OPERATIONS_IDS.PROPOSAL_DELETE,
		name: 'Delete proposal',
		options: {
			from: 'fee_paying_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	withdraw_permission_create: {
		value: OPERATIONS_IDS.WITHDRAW_PERMISSION_CREATE,
		name: 'Create withdrawal permission',
		options: {
			from: 'withdraw_from_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	withdraw_permission_update: {
		value: OPERATIONS_IDS.WITHDRAW_PERMISSION_UPDATE,
		name: 'Update withdrawal permission',
		options: {
			from: 'withdraw_from_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	withdraw_permission_claim: {
		value: OPERATIONS_IDS.WITHDRAW_PERMISSION_CLAIM,
		name: 'Claim withdrawal permission',
		options: {
			from: 'withdraw_from_account',
			subject: ['withdraw_to_account', 'name'],
			value: 'amount_to_withdraw.amount',
			asset: 'amount_to_withdraw.asset_id',
		},
	},
	withdraw_permission_delete: {
		value: OPERATIONS_IDS.WITHDRAW_PERMISSION_DELETE,
		name: 'Delete withdrawal permission',
		options: {
			from: 'withdraw_from_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	committee_member_create: {
		value: OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE,
		name: 'Create committee member',
		options: {
			from: 'committee_member_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	committee_member_update: {
		value: OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE,
		name: 'Update committee member',
		options: {
			from: 'committee_member_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	committee_member_update_global_parameters: {
		value: OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS,
		name: 'Global parameters update',
		options: {
			from: null,
			subject: null,
			value: null,
			asset: null,
		},
	},
	vesting_balance_create: {
		value: OPERATIONS_IDS.VESTING_BALANCE_CREATE,
		name: 'Create vesting balance',
		options: {
			from: 'creator',
			subject: ['owner', 'name'],
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	vesting_balance_withdraw: {
		value: OPERATIONS_IDS.VESTING_BALANCE_WITHDRAW,
		name: 'Withdraw vesting balance',
		options: {
			from: 'owner',
			subject: null,
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	worker_create: {
		value: OPERATIONS_IDS.WORKER_CREATE,
		name: 'Create worker',
		options: {
			from: 'owner',
			subject: ['name', null],
			value: null,
			asset: null,
		},
	},
	custom: {
		value: OPERATIONS_IDS.CUSTOM,
		name: 'Custom',
		options: {
			from: 'payer',
			subject: null,
			value: null,
			asset: null,
		},
	},
	assert: {
		value: OPERATIONS_IDS.ASSERT,
		name: 'Assert operation',
		options: {
			from: 'fee_paying_account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	balance_claim: {
		value: OPERATIONS_IDS.BALANCE_CLAIM,
		name: 'Claim balance',
		options: {
			from: null,
			subject: ['deposit_to_account', 'name'],
			value: null,
			asset: null,
		},
	},
	override_transfer: {
		value: OPERATIONS_IDS.OVERRIDE_TRANSFER,
		name: 'Override transfer',
		options: {
			from: 'from',
			subject: ['to', 'name'],
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	transfer_to_blind: {
		value: OPERATIONS_IDS.TRANSFER_TO_BLIND,
		name: 'Transfer to blinded account',
		options: {
			from: 'from',
			subject: null,
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	blind_transfer: {
		value: OPERATIONS_IDS.BLIND_TRANSFER,
		name: 'Blinded transfer',
		options: {
			from: null,
			subject: null,
			value: null,
			asset: null,
		},
	},
	transfer_from_blind: {
		value: OPERATIONS_IDS.TRANSFER_FROM_BLIND,
		name: 'Transfer from blinded account',
		options: {
			from: null,
			subject: ['to', 'name'],
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	asset_settle_cancel: {
		value: OPERATIONS_IDS.ASSET_SETTLE_CANCEL,
		name: 'Cancel asset settlement',
		options: {
			from: 'account',
			subject: null,
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	asset_claim_fees: {
		value: OPERATIONS_IDS.ASSET_CLAIM_FEES,
		name: 'Claim asset fees',
		options: {
			from: 'issuer',
			subject: null,
			value: 'amount_to_claim.amount',
			asset: 'amount_to_claim.asset_id',
		},
	},
    // FBA_DISTRIBUTE = 44,
    // BID_COLLATERAL = 45,
    // EXECUTE_BID = 46,
	contract_create: {
		value: OPERATIONS_IDS.CREATE_CONTRACT,
		name: 'Contract create',
		options: {
			from: 'registrar',
			subject: null,
            value: 'value.amount',
            asset: 'value.asset_id',
		},
	},
    contract_call: {
        value: OPERATIONS_IDS.CALL_CONTRACT,
        name: 'Contract call',
        options: {
            from: 'registrar',
            subject: ['callee'],
            value: 'value.amount',
            asset: 'value.asset_id',
        },
    },
    contract_transfer: {
        value: OPERATIONS_IDS.CONTRACT_TRANSFER,
        name: 'Contract transfer',
        options: {
            from: 'from',
            subject: ['to', 'name'],
            value: 'amount.amount',
            asset: 'amount.asset_id',
        },
    },
};

import { OPERATIONS_IDS } from 'echojs-lib';

const Operations = {
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
	transfer_to_address: {
		value: OPERATIONS_IDS.TRANSFER_TO_ADDRESS,
		name: 'Transfer to address',
		options: {
			from: 'from',
			subject: ['to'],
			value: 'amount.amount',
			asset: 'amount.asset_id',
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
	account_address_create: {
		value: OPERATIONS_IDS.ACCOUNT_ADDRESS_CREATE,
		name: 'Account address create',
		options: {
			from: 'owner',
			subject: null,
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
		name: 'Update asset bitasset operation',
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
	committee_member_create: {
		value: OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE,
		name: 'Create committee member',
		options: {
			from: 'committee_member_account',
			subject: null,
			value: 'deposit.amount',
			asset: 'deposit.asset_id',
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
	committee_member_activate: {
		value: OPERATIONS_IDS.COMMITTEE_MEMBER_ACTIVATE,
		name: 'Activate committee member',
		options: {
			from: null,
			subject: ['committee_to_activate', 'name'],
			value: null,
			asset: null,
		},
	},
	committee_member_deactivate: {
		value: OPERATIONS_IDS.COMMITTEE_MEMBER_DEACTIVATE,
		name: 'Deactivate committee member',
		options: {
			from: null,
			subject: ['committee_to_deactivate', 'name'],
			value: null,
			asset: null,
		},
	},
	committee_frozen_balance_deposit: {
		value: OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_DEPOSIT,
		name: 'Committee frozen balance deposit',
		options: {
			from: ['committee_member_account', 'name'],
			subject: null,
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	committee_frozen_balance_withdraw: {
		value: OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_WITHDRAW,
		name: 'Committee frozen balance withdraw',
		options: {
			from: null,
			subject: ['committee_member_account', 'name'],
			value: 'amount.amount',
			asset: 'amount.asset_id',
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
	balance_claim: {
		value: OPERATIONS_IDS.BALANCE_CLAIM,
		name: 'Claim balance',
		options: {
			from: ['deposit_to_account', 'name'],
			subject: ['deposit_to_account', 'name'],
			value: 'total_claimed.amount',
			asset: 'total_claimed.asset_id',
		},
	},
	balance_freeze: {
		value: OPERATIONS_IDS.BALANCE_FREEZE,
		name: 'Balance freeze',
		options: {
			from: 'account',
			subject: null,
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	balance_unfreeze: {
		value: OPERATIONS_IDS.BALANCE_UNFREEZE,
		name: 'Balance unfreeze',
		options: {
			from: 'account',
			subject: null,
			value: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	request_balance_unfreeze: {
		value: OPERATIONS_IDS.REQUEST_BALANCE_UNFREEZE,
		name: 'Request balance unfreeze',
		options: {
			from: 'account',
			subject: null,
			value: null,
			asset: 'amount.asset_id',
		},
	},
	contract_create: {
		value: OPERATIONS_IDS.CONTRACT_CREATE,
		name: 'Contract create',
		options: {
			from: 'registrar',
			subject: null,
			value: 'value.amount',
			asset: 'value.asset_id',
		},
	},
	contract_call: {
		value: OPERATIONS_IDS.CONTRACT_CALL,
		name: 'Contract call',
		options: {
			from: 'registrar',
			subject: ['callee'],
			value: 'value.amount',
			asset: 'value.asset_id',
		},
	},
	contract_internal_create: {
		value: OPERATIONS_IDS.CONTRACT_INTERNAL_CREATE,
		name: 'Contract internal create',
		options: {
			from: ['caller'],
			subject: null,
			value: 'value.amount',
			asset: 'value.asset_id',
		},
	},
	contract_internal_call: {
		value: OPERATIONS_IDS.CONTRACT_INTERNAL_CALL,
		name: 'Contract internal call',
		options: {
			from: 'caller',
			subject: ['callee'],
			value: 'value.amount',
			asset: 'value.asset_id',
		},
	},
	contract_selfdestruct: {
		value: OPERATIONS_IDS.CONTRACT_SELFDESTRUCT,
		name: 'Contract selfdestruct',
		options: {
			from: ['contract'],
			subject: ['recipient'],
			value: null,
			asset: null,
		},
	},
	contract_update: {
		value: OPERATIONS_IDS.CONTRACT_UPDATE,
		name: 'Contract update',
		options: {
			from: 'sender',
			subject: ['contract'],
			amount: null,
			asset: null,
		},
	},
	contract_fund_pool: {
		value: OPERATIONS_IDS.CONTRACT_FUND_POOL,
		name: 'Contract fund pool',
		options: {
			from: 'sender',
			subject: ['contract'],
			amount: 'value.amount',
			asset: 'value.asset_id',
		},
	},
	contract_whitelist: {
		value: OPERATIONS_IDS.CONTRACT_WHITELIST,
		name: 'Contract whitelist',
		options: {
			from: 'sender',
			subject: ['contract'],
			amount: null,
			asset: null,
		},
	},
	sidechain_issue: {
		value: OPERATIONS_IDS.SIDECHAIN_ISSUE,
		name: 'Sidechain issue',
		options: {
			from: null,
			subject: ['account', 'name'],
			amount: 'value.amount',
			asset: 'value.asset_id',
		},
	},
	sidechain_burn: {
		value: OPERATIONS_IDS.SIDECHAIN_BURN,
		name: 'Sidechain burn',
		options: {
			from: ['account', 'name'],
			subject: null,
			amount: 'value.amount',
			asset: 'value.asset_id',
		},
	},
	sidechain_eth_spv_create: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_SPV_CREATE,
		name: 'Sidechain eth spv create',
		options: {
			from: 'committee_member_id',
			subject: null,
			amount: null,
			asset: null,
		},
	},
	sidechain_eth_spv_add_missed_tx_receipt: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_SPV_ADD_MISSED_TX_RECEIPT,
		name: 'Sidechain eth spv add missed tx receipt',
		options: {
			from: 'reporter',
			subject: null,
			amount: null,
			asset: null,
		},
	},
	sidechain_eth_create_address: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_CREATE_ADDRESS,
		name: 'Create eth address',
		options: {
			from: 'account',
			subject: null,
			value: null,
			asset: null,
		},
	},
	sidechain_eth_approve_address: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_ADDRESS,
		name: 'Approve eth address',
		options: {
			from: null,
			subject: ['account', 'name'],
			value: null,
			asset: null,
		},
	},
	deposit_eth: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_DEPOSIT,
		name: 'Deposit eth',
		options: {
			from: null,
			subject: ['account', 'name'],
			value: 'value',
			asset: null,
		},
	},
	eth_send_deposit: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_SEND_DEPOSIT,
		name: 'Eth send deposit',
		options: {
			from: ['committee_member_id', 'name'],
			subject: ['deposit_id'],
			value: null,
			asset: null,
		},
	},
	withdraw_eth: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_WITHDRAW,
		name: 'Withdraw eth',
		options: {
			from: 'account',
			subject: null,
			value: 'value',
			asset: null,
		},
	},
	eth_send_withdraw: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_SEND_WITHDRAW,
		name: 'Eth send withdraw',
		options: {
			from: ['committee_member_id', 'name'],
			subject: ['withdraw_id'],
			value: null,
			asset: null,
		},
	},
	approve_withdraw_eth: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_WITHDRAW,
		name: 'Approve withdraw eth',
		options: {
			from: null,
			subject: ['withdraw_id'],
			value: null,
			asset: null,
		},
	},
	eth_update_contract_address: {
		value: OPERATIONS_IDS.SIDECHAIN_ETH_UPDATE_CONTRACT_ADDRESS,
		name: 'Eth update contract address',
		options: {
			from: null,
			subject: ['new_addr'],
			value: null,
			asset: null,
		},
	},
	sidechain_erc20_register_contract_operation: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_REGISTER_CONTRACT_OPERATION,
		name: 'Erc20 register contract operation',
		options: {
			from: null,
			subject: ['address'],
			value: null,
			asset: null,
		},
	},
	register_erc20_token: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_REGISTER_TOKEN,
		name: 'Register erc20 token',
		options: {
			from: 'account',
			subject: ['eth_addr'],
			amount: null,
			asset: null,
		},
	},
	deposit_erc20_token: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_DEPOSIT_TOKEN,
		name: 'Deposit erc20 token',
		options: {
			from: 'account',
			subject: ['erc20_token_addr'],
			amount: 'value',
			asset: null,
		},
	},
	erc20_send_deposit: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_DEPOSIT_TOKEN,
		name: 'Erc20 send deposit',
		options: {
			from: ['committee_member_id', 'name'],
			subject: ['deposit_id'],
			amount: null,
			asset: null,
		},
	},

	withdraw_erc20_token: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_WITHDRAW_TOKEN,
		name: 'Withdraw erc20 token',
		options: {
			from: 'account',
			subject: ['to'],
			amount: 'value',
			asset: null,
		},
	},
	erc20_send_withdraw: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_WITHDRAW_TOKEN,
		name: 'Erc20 send withdraw',
		options: {
			from: ['committee_member_id', 'name'],
			subject: ['withdraw_id'],
			amount: null,
			asset: null,
		},
	},
	approve_erc20_token_withdraw: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_APPROVE_TOKEN_WITHDRAW,
		name: 'Approve erc20 token withdraw',
		options: {
			from: null,
			subject: ['withdraw_id'],
			amount: null,
			asset: null,
		},
	},
	sidechain_erc20_issue: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_ISSUE,
		name: 'Erc20 issue',
		options: {
			from: 'account',
			ubject: ['token'],
			amount: 'amount',
			asset: null,
		},
	},
	sidechain_erc20_burn: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_BURN,
		name: 'Erc20 burn operation',
		options: {
			from: 'account',
			subject: ['token'],
			amount: 'amount',
			asset: null,
		},
	},
	sidechain_erc20_transfer_asset: {
		value: OPERATIONS_IDS.SIDECHAIN_ERC20_TRANSFER_ASSET,
		name: 'Erc20 transfer asset operation',
		options: {
			from: 'account',
			subject: ['to'],
			amount: 'value.amount',
			asset: 'value.asset_id',
		},
	},
	sidechain_btc_create_address: {
		value: OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_ADDRESS,
		name: 'BTC create address',
		options: {
			from: 'account',
			subject: null,
			amount: null,
			asset: null,
		},
	},
	sidechain_btc_deposit: {
		value: OPERATIONS_IDS.SIDECHAIN_BTC_DEPOSIT,
		name: 'BTC deposit',
		options: {
			from: 'account',
			subject: null,
			amount: null,
			asset: null,
		},
	},
	sidechain_btc_withdraw: {
		value: OPERATIONS_IDS.SIDECHAIN_BTC_WITHDRAW,
		name: 'BTC withdraw',
		options: {
			from: 'account',
			subject: ['btc_addr'],
			amount: 'value',
			asset: null,
		},
	},
	sidechain_btc_aggregate: {
		value: OPERATIONS_IDS.SIDECHAIN_BTC_AGGREGATE,
		name: 'BTC aggregate',
		options: {
			from: 'committee_member_id',
			subject: ['transaction_id'],
			amount: 'aggregation_out_value',
			asset: null,
		},
	},
	sidechain_btc_approve_aggregate: {
		value: OPERATIONS_IDS.SIDECHAIN_BTC_APPROVE_AGGREGATE,
		name: 'BTC approve aggregate',
		options: {
			from: 'committee_member_id',
			subject: ['transaction_id'],
			amount: null,
			asset: null,
		},
	},
	sidechain_btc_spv_create: {
		value: OPERATIONS_IDS.SIDECHAIN_BTC_SPV_CREATE,
		name: 'BTC spv create',
		options: {
			from: 'committee_member_id',
			subject: null,
			amount: null,
			asset: null,
		},
	},
	sidechain_btc_spv_add_missed_tx_receipt: {
		value: OPERATIONS_IDS.SIDECHAIN_BTC_SPV_ADD_MISSED_TX_RECEIPT,
		name: 'BTC spv add missed tx receipt',
		options: {
			from: 'reporter',
			subject: null,
			amount: null,
			asset: null,
		},
	},
	sidechain_spv_exchange_excess_funds: {
		value: OPERATIONS_IDS.SIDECHAIN_SPV_EXCHANGE_EXCESS_FUNDS,
		name: 'BTC spv exchange excess funds',
		options: {
			from: 'account',
			subject: null,
			amount: 'amount.amount',
			asset: 'amount.asset_id',
		},
	},
	sidechain_stake_eth_update: {
		value: OPERATIONS_IDS.SIDECHAIN_STAKE_ETH_UPDATE,
		name: 'ETH stake update',
		options: {
			from: null,
			subject: null,
			value: 'amount.amount',
			asset: 'asset_id',
		},
	},
	sidechain_stake_btc_create_script: {
		value: OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_STAKE_SCRIPT,
		name: 'BTC stake create script',
		options: {
			from: 'account',
			subject: null,
			amount: null,
			asset: null,
		},
	},
	sidechain_stake_btc_update: {
		value: OPERATIONS_IDS.SIDECHAIN_STAKE_BTC_UPDATE,
		name: 'BTC stake update',
		options: {
			from: 'committee_member_id',
			subject: null,
			amount: 'btc_tx_info.out.amount',
			asset: null,
		},
	},
	block_reward: {
		value: OPERATIONS_IDS.BLOCK_REWARD,
		name: 'Block reward',
		options: {
			from: null,
			subject: ['receiver', 'name'],
			value: 'assets[0].amount',
			asset: null,
		},
	},
	evm_address_register: {
		value: OPERATIONS_IDS.EVM_ADDRESS_REGISTER,
		name: 'Evm address register',
		options: {
			from: 'owner',
			subject: ['evm_address'],
			value: 'amount',
			asset: null,
		},
	},
	did_create_operation: {
		value: OPERATIONS_IDS.DID_CREATE_OPERATION,
		name: 'Did create',
		options: {
			from: 'registrar',
			subject: null,
			value: null,
			asset: null,
		},
	},
	did_update_operation: {
		value: OPERATIONS_IDS.DID_UPDATE_OPERATION,
		name: 'Did update',
		options: {
			from: 'registrar',
			subject: null,
			value: null,
			asset: null,
		},
	},
	did_delete_operation: {
		value: OPERATIONS_IDS.DID_DELETE_OPERATION,
		name: 'Did delete',
		options: {
			from: 'registrar',
			subject: null,
			value: null,
			asset: null,
		},
	},
};

export const accountOperations = [
	Operations.account_create.name,
	Operations.account_update.name,
	Operations.account_whitelist.name,
	Operations.account_address_create.name,
	Operations.evm_address_register.name,
	Operations.block_reward.name,
];
export const assetOperations = [
	Operations.asset_create.name,
	Operations.asset_update.name,
	Operations.asset_update_bitasset.name,
	Operations.asset_update_feed_producers.name,
	Operations.asset_issue.name,
	Operations.asset_reserve.name,
	Operations.asset_fund_fee_pool.name,
	Operations.asset_publish_feed.name,
	Operations.asset_claim_fees.name,
];
export const freezeOperations = [
	Operations.request_balance_unfreeze.name,
];
export const contractOperations = [
	Operations.contract_create.name,
	Operations.contract_call.name,
	Operations.contract_internal_create.name,
	Operations.contract_internal_call.name,
	Operations.contract_selfdestruct.name,
	Operations.contract_update.name,
	Operations.contract_fund_pool.name,
	Operations.contract_whitelist.name,
];
export const committeeOperations = [
	Operations.committee_member_create.name,
	Operations.committee_member_update.name,
	Operations.committee_member_update_global_parameters.name,
	Operations.committee_member_activate.name,
	Operations.committee_member_deactivate.name,
	Operations.committee_frozen_balance_deposit.name,
	Operations.committee_frozen_balance_withdraw.name,
];
export const proposalOperations = [
	Operations.proposal_create.name,
	Operations.proposal_update.name,
	Operations.proposal_delete.name,
];

export const sidechainOperations = [
	Operations.sidechain_eth_create_address.name,
	Operations.sidechain_eth_spv_create.name,
	Operations.sidechain_eth_spv_add_missed_tx_receipt.name,
	Operations.sidechain_eth_approve_address.name,
	Operations.deposit_eth.name,
	Operations.eth_send_deposit.name,
	Operations.approve_erc20_token_withdraw.name,
	Operations.sidechain_erc20_issue.name,
	Operations.sidechain_erc20_burn.name,
	Operations.sidechain_erc20_register_contract_operation.name,
	Operations.sidechain_erc20_transfer_asset.name,
	Operations.withdraw_eth.name,
	Operations.eth_send_withdraw.name,
	Operations.approve_withdraw_eth.name,
	Operations.eth_update_contract_address.name,
	Operations.sidechain_issue.name,
	Operations.sidechain_burn.name,
	Operations.register_erc20_token.name,
	Operations.deposit_erc20_token.name,
	Operations.erc20_send_deposit.name,
	Operations.withdraw_erc20_token.name,
	Operations.erc20_send_withdraw.name,
	Operations.sidechain_stake_eth_update.name,
	Operations.sidechain_spv_exchange_excess_funds.name,
];

export const sidechainBtcOperations = [
	Operations.sidechain_btc_create_address.name,
	Operations.sidechain_btc_deposit.name,
	Operations.sidechain_btc_withdraw.name,
	Operations.sidechain_btc_aggregate.name,
	Operations.sidechain_btc_approve_aggregate.name,
	Operations.sidechain_stake_btc_create_script.name,
	Operations.sidechain_stake_btc_update.name,
	Operations.sidechain_btc_spv_create.name,
	Operations.sidechain_btc_spv_add_missed_tx_receipt.name,
];

export const didOperations = [
	Operations.did_create_operation.name,
	Operations.did_update_operation.name,
	Operations.did_delete_operation.name,
];

export default Operations;

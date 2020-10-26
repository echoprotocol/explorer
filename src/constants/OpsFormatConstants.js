import { OPERATIONS_IDS } from 'echojs-lib';

import Operations from './Operations';

export const OPS_TYPES = {
	[OPERATIONS_IDS.TRANSFER]: Operations.transfer.name,
	[OPERATIONS_IDS.TRANSFER_TO_ADDRESS]: Operations.transfer_to_address.name,
	[OPERATIONS_IDS.OVERRIDE_TRANSFER]: Operations.override_transfer.name,
	[OPERATIONS_IDS.ACCOUNT_CREATE]: Operations.account_create.name,
	[OPERATIONS_IDS.CONTRACT_CREATE]: Operations.contract_create.name,
	[OPERATIONS_IDS.ACCOUNT_UPDATE]: Operations.account_update.name,
	[OPERATIONS_IDS.ACCOUNT_WHITELIST]: Operations.account_whitelist.name,
	[OPERATIONS_IDS.ACCOUNT_ADDRESS_CREATE]: Operations.account_address_create.name,
	[OPERATIONS_IDS.ASSET_CREATE]: Operations.asset_create.name,
	[OPERATIONS_IDS.ASSET_UPDATE]: Operations.asset_update.name,
	[OPERATIONS_IDS.ASSET_UPDATE_BITASSET]: Operations.asset_update_bitasset.name,
	[OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS]: Operations.asset_update_feed_producers.name,
	[OPERATIONS_IDS.ASSET_ISSUE]: Operations.asset_issue.name,
	[OPERATIONS_IDS.ASSET_RESERVE]: Operations.asset_reserve.name,
	[OPERATIONS_IDS.ASSET_FUND_FEE_POOL]: Operations.asset_fund_fee_pool.name,
	[OPERATIONS_IDS.ASSET_PUBLISH_FEED]: Operations.asset_publish_feed.name,
	[OPERATIONS_IDS.ASSET_CLAIM_FEES]: Operations.asset_claim_fees.name,
	[OPERATIONS_IDS.PROPOSAL_CREATE]: Operations.proposal_create.name,
	[OPERATIONS_IDS.PROPOSAL_UPDATE]: Operations.proposal_update.name,
	[OPERATIONS_IDS.PROPOSAL_DELETE]: Operations.proposal_delete.name,
	[OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE]: Operations.committee_member_create.name,
	[OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE]: Operations.committee_member_update.name,
	[OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS]: Operations.committee_member_update_global_parameters.name,
	[OPERATIONS_IDS.COMMITTEE_MEMBER_ACTIVATE]: Operations.committee_member_activate.name,
	[OPERATIONS_IDS.COMMITTEE_MEMBER_DEACTIVATE]: Operations.committee_member_deactivate.name,
	[OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_DEPOSIT]: Operations.committee_frozen_balance_deposit.name,
	[OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_WITHDRAW]: Operations.committee_frozen_balance_withdraw.name,
	[OPERATIONS_IDS.VESTING_BALANCE_CREATE]: Operations.vesting_balance_create.name,
	[OPERATIONS_IDS.VESTING_BALANCE_WITHDRAW]: Operations.vesting_balance_withdraw.name,
	[OPERATIONS_IDS.BALANCE_CLAIM]: Operations.balance_claim.name,
	[OPERATIONS_IDS.BALANCE_FREEZE]: Operations.balance_freeze.name,
	[OPERATIONS_IDS.BALANCE_UNFREEZE]: Operations.balance_unfreeze.name,
	[OPERATIONS_IDS.REQUEST_BALANCE_UNFREEZE]: Operations.request_balance_unfreeze.name,
	[OPERATIONS_IDS.CONTRACT_CREATE]: Operations.contract_create.name,
	[OPERATIONS_IDS.CONTRACT_CALL]: Operations.contract_call.name,
	[OPERATIONS_IDS.CONTRACT_INTERNAL_CREATE]: Operations.contract_internal_create.name,
	[OPERATIONS_IDS.CONTRACT_INTERNAL_CALL]: Operations.contract_internal_call.name,
	[OPERATIONS_IDS.CONTRACT_SELFDESTRUCT]: Operations.contract_selfdestruct.name,
	[OPERATIONS_IDS.CONTRACT_UPDATE]: Operations.contract_update.name,
	[OPERATIONS_IDS.CONTRACT_FUND_POOL]: Operations.contract_fund_pool.name,
	[OPERATIONS_IDS.CONTRACT_WHITELIST]: Operations.contract_whitelist.name,
	[OPERATIONS_IDS.SIDECHAIN_ETH_CREATE_ADDRESS]: Operations.sidechain_eth_create_address.name,
	[OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_ADDRESS]: Operations.sidechain_eth_approve_address.name,
	[OPERATIONS_IDS.SIDECHAIN_ETH_DEPOSIT]: Operations.deposit_eth.name,
	[OPERATIONS_IDS.SIDECHAIN_ETH_SEND_DEPOSIT]: Operations.eth_send_deposit.name,
	[OPERATIONS_IDS.SIDECHAIN_ERC20_APPROVE_TOKEN_WITHDRAW]: Operations.approve_erc20_token_withdraw.name,
	[OPERATIONS_IDS.SIDECHAIN_ERC20_ISSUE]: Operations.sidechain_erc20_issue.name,
	[OPERATIONS_IDS.SIDECHAIN_ERC20_BURN]: Operations.sidechain_erc20_burn.name,
	[OPERATIONS_IDS.SIDECHAIN_ETH_WITHDRAW]: Operations.withdraw_eth.name,
	[OPERATIONS_IDS.SIDECHAIN_ETH_SEND_WITHDRAW]: Operations.eth_send_withdraw.name,
	[OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_WITHDRAW]: Operations.approve_withdraw_eth.name,
	[OPERATIONS_IDS.SIDECHAIN_ETH_UPDATE_CONTRACT_ADDRESS]: Operations.eth_update_contract_address.name,
	[OPERATIONS_IDS.SIDECHAIN_ISSUE]: Operations.sidechain_issue.name,
	[OPERATIONS_IDS.SIDECHAIN_BURN]: Operations.sidechain_burn.name,
	[OPERATIONS_IDS.SIDECHAIN_ERC20_REGISTER_TOKEN]: Operations.register_erc20_token.name,
	[OPERATIONS_IDS.SIDECHAIN_ERC20_DEPOSIT_TOKEN]: Operations.deposit_erc20_token.name,
	[OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_DEPOSIT_TOKEN]: Operations.erc20_send_deposit.name,
	[OPERATIONS_IDS.SIDECHAIN_ERC20_WITHDRAW_TOKEN]: Operations.withdraw_erc20_token.name,
	[OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_WITHDRAW_TOKEN]: Operations.erc20_send_withdraw.name,
	[OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_ADDRESS]: Operations.sidechain_btc_create_address.name,
	[OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_INTERMEDIATE_DEPOSIT]: Operations.sidechain_btc_create_intermediate_deposit.name,
	[OPERATIONS_IDS.SIDECHAIN_BTC_INTERMEDIATE_DEPOSIT]: Operations.sidechain_btc_intermediate_deposit.name,
	[OPERATIONS_IDS.SIDECHAIN_BTC_DEPOSIT]: Operations.sidechain_btc_deposit.name,
	[OPERATIONS_IDS.SIDECHAIN_BTC_WITHDRAW]: Operations.sidechain_btc_withdraw.name,
	[OPERATIONS_IDS.SIDECHAIN_BTC_AGGREGATE]: Operations.sidechain_btc_aggregate.name,
	[OPERATIONS_IDS.SIDECHAIN_BTC_APPROVE_AGGREGATE]: Operations.sidechain_btc_approve_aggregate.name,
	[OPERATIONS_IDS.BLOCK_REWARD]: Operations.block_reward.name,
	[OPERATIONS_IDS.EVM_ADDRESS_REGISTER]: Operations.evm_address_register.name,
	[OPERATIONS_IDS.DID_CREATE]: Operations.did_create_operation.name,
	[OPERATIONS_IDS.DID_UPDATE]: Operations.did_update_operation.name,
	[OPERATIONS_IDS.DID_DELETE]: Operations.did_delete_operation.name,
};

export const OPS_DESCRIPTIONS = {
	[OPERATIONS_IDS.TRANSFER]: {
		description: 'Transfers an amount of one asset from one account to another.',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-transfer#transfer_operation',
	},
	[OPERATIONS_IDS.TRANSFER_TO_ADDRESS]: {
		description: '',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-transfer#transfer_to_address_operation',
	},
	[OPERATIONS_IDS.OVERRIDE_TRANSFER]: {
		description: 'Allows the issuer of an asset to transfer an asset from any account to any account if they have override_authority.',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-transfer#override_transfer_operation',
	},
	[OPERATIONS_IDS.ACCOUNT_CREATE]: {
		description: 'This operation is used to create an account',
		link: 'https://docs.echo.org/api-reference/echo-operations/account-management#account_create_operation',
	},
	[OPERATIONS_IDS.ACCOUNT_UPDATE]: {
		description: 'This operation is used to update an existing account. It can be used to update the authorities, or adjust the options on the account. See account_object::options_type for the options which may be updated. Optional fields can be added or not depending on your intentions.',
		link: 'https://docs.echo.org/api-reference/echo-operations/account-management#account_update_operation',
	},
	[OPERATIONS_IDS.ACCOUNT_WHITELIST]: {
		description: `This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets
			Accounts can freely specify opinions about other accounts, in the form of either whitelisting or blacklisting them. This information is used in chain validation only to determine whether an account is authorized to transact in an asset type which enforces a whitelist, but third parties can use this information for other uses as well, as long as it does not conflict with the use of whitelisted assets.
			An asset which enforces a whitelist specifies a list of accounts to maintain its whitelist, and a list of accounts to maintain its blacklist. In order for a given account A to hold and transact in a whitelisted asset S, A must be whitelisted by at least one of S's whitelist_authorities and blacklisted by none of S's blacklist_authorities. If A receives a balance of S, and is later removed from the whitelist(s) which allowed it to hold S, or added to any blacklist S specifies as authoritative, A's balance of S will be frozen until A's authorization is reinstated.
			This operation requires authorizing_account's signature, but not account_to_list's. The fee is paid by authorizing_account`,
		link: 'https://docs.echo.org/api-reference/echo-operations/account-management#account_whitelist_operation',
	},
	[OPERATIONS_IDS.ACCOUNT_ADDRESS_CREATE]: {
		description: 'Creates an address for an account to which money can be transferred.',
		link: 'https://docs.echo.org/api-reference/echo-operations/account-management#account_address_create_operation',
	},
	[OPERATIONS_IDS.ASSET_CREATE]: {
		description: 'This operation is used to create assets.',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-management#asset_create_operation',
	},
	[OPERATIONS_IDS.ASSET_UPDATE]: {
		description: 'Update options common to all assets.\n' +
			'There are a number of options which all assets in the network use. These options are enumerated in the asset_options struct. This operation is used to update these options for an existing asset.',
		link: 'https://docs.echo.org/api-reference/echo-operations/account-management#account_address_create_operation',
	},
	[OPERATIONS_IDS.ASSET_UPDATE_BITASSET]: {
		description: 'Update options specific to BitAssets.\n' +
			'BitAssets have some options which are not relevant to other asset types. This operation is used to update those options an an existing BitAsset.',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-management#asset_update_bitasset_operation',
	},
	[OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS]: {
		description: 'Update the set of feed-producing accounts for a BitAsset.\n' +
		'BitAssets have price feeds selected by taking the median values of recommendations from a set of feed producers. This operation is used to specify which accounts may produce feeds for a given BitAsset.',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-management#asset_update_feed_producers_operation',
	},
	[OPERATIONS_IDS.ASSET_ISSUE]: {
		description: 'Asset issue to account.',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-management#asset_issue_operation',
	},
	[OPERATIONS_IDS.ASSET_RESERVE]: {
		description: 'Used to take an asset out of circulation, returning to the issuer',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-management#asset_reserve_operation',
	},
	[OPERATIONS_IDS.ASSET_FUND_FEE_POOL]: {
		description: '',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-management#asset_fund_fee_pool_operation',
	},
	[OPERATIONS_IDS.ASSET_PUBLISH_FEED]: {
		description: `Publish price feeds for market-issued assets.
			Price feed providers use this operation to publish their price feeds for market-issued assets. A price feed is used to tune the market for a particular market-issued asset. For each value in the feed, the median across all committee_member feeds for that asset is calculated and the market for the asset is configured with the median of that value.
			The feed in the operation contains three prices: a call price limit, a short price limit, and a settlement price. The call limit price is structured as (collateral asset) / (debt asset) and the short limit price is structured as (asset for sale) / (collateral asset). Note that the asset IDs are opposite to eachother, so if we're publishing a feed for USD, the call limit price will be ECHO/USD and the short limit price will be USD/ECHO. The settlement price may be flipped either direction, as long as it is a ratio between the market-issued asset and its collateral.`,
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-management#asset_publish_feed_operation',
	},
	[OPERATIONS_IDS.ASSET_CLAIM_FEES]: {
		description: 'Used to transfer accumulated fees back to the issuer\'s balance',
		link: 'https://docs.echo.org/api-reference/echo-operations/asset-management#asset_claim_fees_operation',
	},
	[OPERATIONS_IDS.PROPOSAL_CREATE]: {
		description: `The proposal_create_operation creates a transaction proposal, for use in multi-sig scenarios.
			Creates a transaction proposal. The operations which compose the transaction are listed in order in proposed_ops, and expiration_time specifies the time by which the proposal must be accepted or it will fail permanently. The expiration_time cannot be farther in the future than the maximum expiration time set in the global properties object.`,
		link: 'https://docs.echo.org/api-reference/echo-operations/proposals#proposal_create_operation',
	},
	[OPERATIONS_IDS.PROPOSAL_UPDATE]: {
		description: 'The proposal_update_operation updates an existing transaction proposal.\n' +
		'This operation allows accounts to add or revoke approval of a proposed transaction. Signatures sufficient to satisfy the authority of each account in approvals are required on the transaction containing this operation.\n' +
		'If an account with a multi-signature authority is listed in approvals_to_add or approvals_to_remove, either all required signatures to satisfy that account\'s authority must be provided in the transaction containing this operation, or a secondary proposal must be created which contains this operation.\n' +
		'NOTE: If the proposal requires only an account\'s active authority, the account must not update adding its owner authority\'s approval. This is considered an error. An owner approval may only be added if the proposal requires the owner\'s authority.\n' +
		'If an account\'s owner and active authority are both required, only the owner authority may approve. An attempt to add or remove active authority approval to such a proposal will fail.',
		link: 'https://docs.echo.org/api-reference/echo-operations/proposals#proposal_update_operation',
	},
	[OPERATIONS_IDS.PROPOSAL_DELETE]: {
		description: 'The proposal_delete_operation deletes an existing transaction proposal.\n' +
			'This operation allows the early veto of a proposed transaction. It may be used by any account which is a required authority on the proposed transaction, when that account\'s holder feels the proposal is ill-advised and he decides he will never approve of it and wishes to put an end to all discussion of the issue. Because he is a required authority, he could simply refuse to add his approval, but this would leave the topic open for debate until the proposal expires. Using this operation, he can prevent any further breath from being wasted on such an absurd proposal.',
		link: 'https://docs.echo.org/api-reference/echo-operations/proposals#proposal_delete_operation',
	},
	[OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE]: {
		description: 'Create a committee_member object, as a bid to hold a committee_member seat on the network.\n' +
		'Accounts which wish to become committee_members may use this operation to create a committee_member object which stakeholders may vote on to approve its position as a committee_member.',
		link: 'https://docs.echo.org/api-reference/echo-operations/committee-member#committee_member_create_operation',
	},
	[OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE]: {
		description: 'Update a committee_member object.\n' +
			'Currently the only field which can be updated is the url field.',
		link: 'https://docs.echo.org/api-reference/echo-operations/committee-member#committee_member_update_operation',
	},
	[OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS]: {
		description: 'Used by committee_members to update the global parameters of the blockchain.\n' +
			'This operation allows the committee_members to update the global parameters on the blockchain. These control various tunable aspects of the chain, including block and maintenance intervals, maximum data sizes, the fees charged by the network, etc.\n' +
			'This operation may only be used in a proposed transaction, and a proposed transaction which contains this operation must have a review period specified in the current global parameters before it may be accepted.',
		link: 'https://docs.echo.org/api-reference/echo-operations/committee-member#committee_member_update_global_parameters_operation',
	},
	[OPERATIONS_IDS.COMMITTEE_MEMBER_ACTIVATE]: {
		description: 'Used by active committee_members to propose activation of committee_member\n' +
			'This operation may only be used in a proposed transaction, and a proposed transaction which contains this operation must have a review period specified in the current global parameters before it may be accepted.',
		link: 'https://docs.echo.org/api-reference/echo-operations/committee-member#committee_member_activate_operation',
	},
	[OPERATIONS_IDS.COMMITTEE_MEMBER_DEACTIVATE]: {
		description: 'Used by active committee_members to propose deactivation of committee_member\n' +
			'This operation may only be used in a proposed transaction, and a proposed transaction which contains this operation must have a review period specified in the current global parameters before it may be accepted.',
		link: 'https://docs.echo.org/api-reference/echo-operations/committee-member#committee_member_deactivate_operation',
	},
	[OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_DEPOSIT]: {
		description: 'Used by a committee_member to deposit a frozen balance',
		link: 'https://docs.echo.org/api-reference/echo-operations/committee-member#committee_frozen_balance_deposit_operation',
	},
	[OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_WITHDRAW]: {
		description: 'Used by a committee_member to withdraw a frozen balance',
		link: 'https://docs.echo.org/api-reference/echo-operations/committee-member#committee_frozen_balance_withdraw_operation',
	},
	[OPERATIONS_IDS.VESTING_BALANCE_CREATE]: {
		description: 'Create a vesting balance.\n' +
			'The chain allows a user to create a vesting balance. Normally, vesting balances are created automatically as part of cashback and worker operations. This operation allows vesting balances to be created manually as well.',
		link: 'https://docs.echo.org/api-reference/echo-operations/vesting-balances#vesting_balance_create_operation',
	},
	[OPERATIONS_IDS.VESTING_BALANCE_WITHDRAW]: {
		description: 'Withdraw from a vesting balance',
		link: 'https://docs.echo.org/api-reference/echo-operations/vesting-balances#vesting_balance_withdraw_operation',
	},
	[OPERATIONS_IDS.BALANCE_CLAIM]: {
		description: 'Claim a balance in a @ref balance_object.\n' +
			'This operation is used to claim the balance in a given @ref balance_object. If the balance object contains a vesting balance, total_claimed must not exceed @ref balance_object::available at the time of evaluation. If the object contains a non-vesting balance, total_claimed must be the full balance of the object.',
		link: 'https://docs.echo.org/api-reference/echo-operations/balance-object#balance_claim_operation',
	},
	[OPERATIONS_IDS.BALANCE_FREEZE]: {
		description: 'Freeze balance to increase the likelihood of getting out as a producer or verifier and get more rewards.\n' +
			'Duration is indicated in days. For the selected duration, the balance modifier must be specified in the chain parameters.',
		link: 'https://docs.echo.org/api-reference/echo-operations/balance-object#balance_freeze_operation',
	},
	[OPERATIONS_IDS.BALANCE_UNFREEZE]: {
		description: 'Unfreeze balance.',
		link: 'https://docs.echo.org/api-reference/echo-operations/balance-object#balance_unfreeze_operation',
	},
	[OPERATIONS_IDS.REQUEST_BALANCE_UNFREEZE]: {
		description: 'Request unfreeze balance.',
		link: 'https://docs.echo.org/api-reference/echo-operations/balance-object#request_balance_unfreeze_operation',
	},
	[OPERATIONS_IDS.CONTRACT_CREATE]: {
		description: 'Creates new contract.',
		link: 'https://docs.echo.org/api-reference/echo-operations/contracts#contract_create_operation',
	},
	[OPERATIONS_IDS.CONTRACT_CALL]: {
		description: 'Operation to call specified contract.',
		link: 'https://docs.echo.org/api-reference/echo-operations/contracts#contract_call_operation',
	},
	[OPERATIONS_IDS.CONTRACT_INTERNAL_CREATE]: {
		description: 'Virtual operation created when contract creates another contract.',
		link: 'https://docs.echo.org/api-reference/echo-operations/contracts#contract_internal_create_operation',
	},
	[OPERATIONS_IDS.CONTRACT_INTERNAL_CALL]: {
		description: 'Virtual operation created when contract calls another contract or transfers asset',
		link: 'https://docs.echo.org/api-reference/echo-operations/contracts#contract_internal_call_operation',
	},
	[OPERATIONS_IDS.CONTRACT_SELFDESTRUCT]: {
		description: 'Virtual operation created when contract self-destructs',
		link: 'https://docs.echo.org/api-reference/echo-operations/contracts#contract_selfdestruct_operation',
	},
	[OPERATIONS_IDS.CONTRACT_UPDATE]: {
		description: 'Update contract data.',
		link: 'https://docs.echo.org/api-reference/echo-operations/contracts#contract_update_operation',
	},
	[OPERATIONS_IDS.CONTRACT_FUND_POOL]: {
		description: 'Transfer asset to fee pool',
		link: 'https://docs.echo.org/api-reference/echo-operations/contracts#contract_fund_pool_operation',
	},
	[OPERATIONS_IDS.CONTRACT_WHITELIST]: {
		description: 'Manage the blacklist and whitelist pool of the contract',
		link: 'https://docs.echo.org/api-reference/echo-operations/contracts#contract_whitelist_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ETH_CREATE_ADDRESS]: {
		description: 'Used to generate address in ETH blockchain. After the address is generated eth_address_object(s) will be created in echo db and can be retrieved using get_eth_address method.\n' +
		'Until one of the objects will receive sufficient amount of approvals the number of objects connected to account id can be more than one',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_eth_create_address_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_ADDRESS]: {
		description: 'An internal operation by which committee members confirm the created Ethereum address',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_eth_approve_address_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ETH_DEPOSIT]: {
		description: 'An internal operation by which committee members confirm Ethereum deposit',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_eth_deposit_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ETH_SEND_DEPOSIT]: {
		description: 'An internal operation by which committee members confirm Ethereum deposit after 24h and credit eETH',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_eth_send_deposit_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ETH_WITHDRAW]: {
		description: 'Used to withdraw the eETH and receive ETH to provided address.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_eth_withdraw_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ETH_SEND_WITHDRAW]: {
		description: 'An internal operation by which committee members confirm the withdrawal of ETH after 24h.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_eth_send_withdraw_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ETH_APPROVE_WITHDRAW]: {
		description: 'An internal operation by which committee members confirm the withdrawal of ETH and burn the eETH.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_eth_approve_withdraw_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ETH_UPDATE_CONTRACT_ADDRESS]: {
		description: 'An internal operation, sent by committee member to propose update of the eth contract address.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_eth_update_contract_address_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ISSUE]: {
		description: 'Virtual operation, which reports that the money entered with the help of sidechain.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_issue_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_BURN]: {
		description: 'Virtual operation, which reports that the conclusion was successful and funds burned(withdrawn).',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_burn_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ERC20_REGISTER_TOKEN]: {
		description: 'Used to register a token in the sidechain',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_erc20_register_token_operation.',
	},
	[OPERATIONS_IDS.SIDECHAIN_ERC20_DEPOSIT_TOKEN]: {
		description: 'An internal operation by which committee members confirm the entry of tokens.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_erc20_deposit_token_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_DEPOSIT_TOKEN]: {
		description: 'An internal operation by which committee members confirm the entry of tokens after 24h and credit token.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_erc20_send_deposit_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ERC20_WITHDRAW_TOKEN]: {
		description: 'Executed by the user and initiates the withdrawal of the token from the Echo network to the specified address.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_erc20_withdraw_token_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_ERC20_SEND_WITHDRAW_TOKEN]: {
		description: 'An internal operation by which committee members confirm the removal of tokens after 24h.',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_erc20_send_withdraw_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_ADDRESS]: {
		description: 'Used to generate address in BTC blockchain. After the address is generated btc_address_object(s) will be created in echo db and can be retrieved using get_btc_address method',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_btc_create_address_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_BTC_CREATE_INTERMEDIATE_DEPOSIT]: {
		description: 'An internal operation by which committee members processed deposit to account',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_btc_create_intermediate_deposit_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_BTC_INTERMEDIATE_DEPOSIT]: {
		description: 'An internal operation by which committee members send from intermediate address to deposit address',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_btc_intermediate_deposit_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_BTC_DEPOSIT]: {
		description: 'An internal operation by which committee members processed deposit to deposit address from intermediate address',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_btc_deposit_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_BTC_WITHDRAW]: {
		description: 'Used to withdraw the eBTC and receive BTC to provided address',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_btc_withdraw_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_BTC_AGGREGATE]: {
		description: 'An internal operation by which committee members collect an aggregate transaction',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_btc_aggregate_operation',
	},
	[OPERATIONS_IDS.SIDECHAIN_BTC_APPROVE_AGGREGATE]: {
		description: ' An internal operation by which committee members confirm the aggregate transaction',
		link: 'https://docs.echo.org/api-reference/echo-operations/sidechain#sidechain_btc_approve_aggregate_operation',
	},
	[OPERATIONS_IDS.BLOCK_REWARD]: {
		description: 'Virtual operation that indicates payout of block reward',
		link: 'https://github.com/echoprotocol/echowiki/blob/fba3e7b342a0192369621908292bc9cd969b901d/api-reference/echo-operations/block-reward.md#block_reward_operation',
	},
	[OPERATIONS_IDS.EVM_ADDRESS_REGISTER]: {
		description: 'Register EVM address',
		link: 'https://docs.echo.org/api-reference/echo-operations/account-management#evm_address_register_operation',
	},
	[OPERATIONS_IDS.DID_CREATE]: {
		description: 'Create new DID',
		link: 'https://github.com/echoprotocol/echowiki/blob/266df7813ef42fef9e2d3a4d35cc8b6c7fc84044/api-reference/echo-operations/did.md#did_create_operation',
	},
	[OPERATIONS_IDS.DID_UPDATE]: {
		description: 'Update an existing DID',
		link: 'https://github.com/echoprotocol/echowiki/blob/266df7813ef42fef9e2d3a4d35cc8b6c7fc84044/api-reference/echo-operations/did.md#did_update_operation',
	},
	[OPERATIONS_IDS.DID_DELETE]: {
		description: 'Remove DID',
		link: 'https://github.com/echoprotocol/echowiki/blob/266df7813ef42fef9e2d3a4d35cc8b6c7fc84044/api-reference/echo-operations/did.md#did_delete_operation',
	},
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

export const ECHO_COMMITTEE_ACCOUNT = {
	NAME: 'committee-account',
	ID: '1.2.1',
};

export const ETH_EXPLORER = 'https://etherscan.io/';
export const BTC_EXPLORER = 'https://www.blockchain.com/btc';

export const OPERATIONS_WITH_ERC20_WHICH_REQUIRES_TOKEN_FETCHING = [
	Operations.deposit_erc20_token.name,
	Operations.sidechain_erc20_issue.name,
	Operations.sidechain_erc20_burn.name,
];
export const SIDECHAIN_OPS_DEFAULT_ASSETS = {
	BTC: [
		Operations.sidechain_btc_deposit.value,
		Operations.sidechain_btc_withdraw.value,
	],
	ETH: [
		Operations.withdraw_eth.value,
		Operations.deposit_eth.value,
		Operations.eth_send_deposit.value,
		Operations.sidechain_issue.value,
		Operations.sidechain_burn.value,
	],
};

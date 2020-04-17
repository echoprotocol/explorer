import { OPERATION_TYPES } from '../constants/OperationTypeConstants';

// It should be connected to real data
export const transformOperationDataByType = (type, data) => {
	switch (type) {
		case OPERATION_TYPES.TRANSFER:
			return {
				operationInfo: {
					type: 'Transfer',
					from: data.from,
					to: data.to,
					amount: data.amount,
					fee: data.fee,
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					directLink: 'https://explorer.echo.org/blocks/70/1?op=1',
				},
			};
		case OPERATION_TYPES.TRANSFER_TO_ADDRESS:
			return {
				operationInfo: {
					type: 'Transfer to address',
					from: {
						value: 'init1',
						link: '1.2.3',
					},
					to_address: 'https://explorer.echo.org/blocks/70/1?op=1',
					to_account: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					directLink: 'https://explorer.echo.org/blocks/70/1?op=1',
				},
			};
		case OPERATION_TYPES.OVERRIDE_TRANSFER:
			return {
				operationInfo: {
					type: 'Override transfer',
					sender: {
						value: 'init1',
						link: '1.2.3',
					},
					from: {
						value: 'init1',
						link: '1.2.3',
					},
					to: {
						value: 'init1',
						link: '1.2.3',
					},
					amount: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		case OPERATION_TYPES.ACCOUNT_CREATE:
			return {
				operationInfo: {
					type: 'Create account',
					registrar: data.registrar,
					account_name: {
						value: 'account',
						link: '1.2.3',
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
						value: 'account',
						link: '1.2.3',
					},
					delegate_share: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: data.fee,
				},
			};
		case OPERATION_TYPES.ACCOUNT_UPDATE:
			return {
				operationInfo: {
					type: 'Update account',
					delegate_share: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					account_updated: {
						value: 'account',
						link: '1.2.3',
					},
					echorand_key: 'anyStringValue',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		case OPERATION_TYPES.ACCOUNT_WHITELIST:
			return {
				operationInfo: {
					type: 'Account whitelist',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					listed_account: {
						value: 'account',
						link: '1.2.3',
					},
					new_status: 'statusString',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						account_white_list: 'anyStringValue',
						account_black_list: 'anyStringValue',
					},
				},
			};
		case OPERATION_TYPES.ACCOUNT_ADDRESS_CREATE:
			return {
				operationInfo: {
					type: 'Account address create',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					label: 'anyStringValue',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		case OPERATION_TYPES.ASSET_CREATE:
			return {
				operationInfo: {
					type: 'Create asset',
					issuer: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'Asset name',
					precision: '8',
					max_suply: '12,000,000,000. 00000000',
					asset_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
					rate: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					is_bit_asset: true,
					settings: [{
						key: 'Whitelist',
						value: 'disabled',
					}, {
						key: 'Override authority',
						value: 'on',
					}, {
						key: 'Override authority',
						value: 'off',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.ASSET_UPDATE:
			return {
				operationInfo: {
					type: 'Update asset',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'Asset name',
					max_suply: '12,000,000,000. 00000000',
					asset_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
					rate: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					settings: [{
						key: 'Whitelist',
						value: 'disabled',
					}, {
						key: 'Override authority',
						value: 'on',
					}, {
						key: 'Override authority',
						value: 'off',
					}],
					bit_asset_options: [{
						key: 'Feed lifetime',
						value: '12w, 23d, 34:34:56',
					}, {
						key: 'Minimum feeds',
						value: '3',
					}, {
						key: 'Short backing asset:',
						value: 'off',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.ASSET_UPDATE_BITASSET:
			return {
				operationInfo: {
					type: 'bitAsset update',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'Asset name',
					max_suply: '12,000,000,000. 00000000',
					asset_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
					rate: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					bit_asset_options: [{
						key: 'Feed lifetime',
						value: '12w, 23d, 34:34:56',
					}, {
						key: 'Minimum feeds',
						value: '3',
					}, {
						key: 'Short backing asset:',
						value: 'off',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.ASSET_UPDATE_FEED_PRODUCERS:
			return {
				operationInfo: {
					type: 'Update asset feeders',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'Asset name',
					new_feed_producers: [{
						value: 'account',
						link: '1.2.3',
					}, {
						value: 'pink-n-floyd01230',
						link: '1.2.4',
					}, {
						value: 'ViolletyLetty',
						link: '1.2.5',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					additionalInfo: {
						current_asset_feed_producers: [{
							value: 'account',
							link: '1.2.3',
						}, {
							value: 'pink-n-floyd01230',
							link: '1.2.4',
						}, {
							value: 'ViolletyLetty',
							link: '1.2.5',
						}],
					},
				},
			};
		case OPERATION_TYPES.ASSET_ISSUE:
			return {
				operationInfo: {
					type: 'Issue asset',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					receiver: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					additionalInfo: {
						current_asset_total_supply: '12,000,000,000. 00000000',
					},
				},
			};
		case OPERATION_TYPES.ASSET_REVERSE:
			return {
				operationInfo: {
					type: 'Reverse asset',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_asset_total_supply: '12,000,000,000. 00000000',
					},
				},
			};
		case OPERATION_TYPES.ASSET_FUND_FEE_POOL:
			return {
				operationInfo: {
					type: 'Fund asset fee pool',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_asset_fee_pool: '12,000,000,000. 00000000',
					},
				},
			};
		case OPERATION_TYPES.ASSET_PUBLISH_FEED:
			return {
				operationInfo: {
					type: 'Publish feed',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'ECHO',
					feeded_asset_price: {
						amount: 17,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_asset_price: {
							amount: 3000,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				},
			};
		case OPERATION_TYPES.ASSET_CLAIM_FEES:
			return {
				operationInfo: {
					type: 'Claim fee',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'ECHO',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						feeded_asset_fee_pool: {
							amount: 430,
							precision: 8,
							symbol: 'ECHO',
						},
						current_asset_unclaimed_fee: {
							amount: 3430,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				},
			};
		case OPERATION_TYPES.PROPOSAL_CREATE:
			return {
				operationInfo: {
					type: 'Create proposal',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					expiration_time: new Date(),
					preview_period: '23h',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					additionalInfo: {
						count_approvals: {
							value: 2,
							total: 4,
						},
						proposal_status: 'rejected',
						result_transaction: 'https://explorer.echo.org/blocks/70/1?op=1',
					},
				},
				proposalOperations: [{
					operationInfo: {
						type: 'Reverse asset',
						sender: {
							value: 'account',
							link: '1.2.3',
						},
						amount: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						fee: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						additionalInfo: {
							current_asset_total_supply: '12,000,000,000. 00000000',
						},
					},
				}, {
					operationInfo: {
						type: 'Create account',
						registrar: {
							value: 'account',
							link: '1.2.3',
						},
						account_name: {
							value: 'account',
							link: '1.2.3',
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
							value: 'account',
							link: '1.2.3',
						},
						delegate_share: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						fee: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				}],
			};
		case OPERATION_TYPES.PROPOSAL_UPDATE:
			return {
				operationInfo: {
					type: 'Update proposal',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
					approvals_to_add: [{
						value: 'ECHOd9f8LmNjn32GUMXZwNZDsfBqa6qcBGvGk86kKTuvzkMjdW9saCrTtrPwGpuB',
						weight: '1',
					}],
					approvals_to_remove: [{
						value: 'vic.tor',
						weight: '1',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						count_signatures: '2',
						proposal_status: 'approved',
					},
				},
				proposalOperations: [{
					operationInfo: {
						type: 'Reverse asset',
						sender: {
							value: 'account',
							link: '1.2.3',
						},
						amount: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						fee: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						additionalInfo: {
							current_asset_total_supply: '12,000,000,000. 00000000',
						},
					},
				}, {
					operationInfo: {
						type: 'Create account',
						registrar: {
							value: 'account',
							link: '1.2.3',
						},
						account_name: {
							value: 'account',
							link: '1.2.3',
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
							value: 'account',
							link: '1.2.3',
						},
						delegate_share: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						fee: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				}],
			};
		case OPERATION_TYPES.PROPOSAL_DELETE:
			return {
				operationInfo: {
					type: 'Reject proposal',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						count_signatures: '2',
						proposal_status: 'approved',
					},
				},
				proposalOperations: [{
					operationInfo: {
						type: 'Reverse asset',
						sender: {
							value: 'account',
							link: '1.2.3',
						},
						amount: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						fee: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						additionalInfo: {
							current_asset_total_supply: '12,000,000,000. 00000000',
						},
					},
				}, {
					operationInfo: {
						type: 'Create account',
						registrar: {
							value: 'account',
							link: '1.2.3',
						},
						account_name: {
							value: 'account',
							link: '1.2.3',
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
							value: 'account',
							link: '1.2.3',
						},
						delegate_share: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
						fee: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				}],
			};
		case OPERATION_TYPES.COMMITTEE_MEMBER_CREATE:
			return {
				operationInfo: {
					type: 'Create committee member',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					url: 'https://explorer.echo.org/blocks/70/1?op=1',
					eth_address: 'https://etherscan.io/',
					btc_address: 'https://www.blockchain.com/explorer',
					deposit_amount: '12,000,000,000. 00000000',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					additionalInfo: {
						current_account_committee_status: 'Not a member of the committee',
					},
				},
			};
		case OPERATION_TYPES.COMMITTEE_MEMBER_UPDATE:
			return {
				operationInfo: {
					type: 'Update committee member',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					new_url: 'https://explorer.echo.org/blocks/70/1?op=1',
					new_eth_address: 'https://etherscan.io/',
					new_btc_address: 'https://www.blockchain.com/explorer',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					additionalInfo: {
						current_account_committee_status: 'Not a member of the committee',
					},
				},
			};
		case OPERATION_TYPES.COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS:
			return {
				operationInfo: {
					type: 'Global parameters update',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					changed_parameters: ['param1', 'param2', 'param3'],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_global_parametres: 'https://explorer.echo.org/blocks/70/1?op=1',
					},
				},
			};
		case OPERATION_TYPES.COMMITTEE_MEMBER_ACTIVATE:
			return {
				operationInfo: {
					type: 'Activate committee member',
					account_name: {
						value: 'account',
						link: '1.2.3',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_account_committee_status: 'Not a member of the committee',
					},
				},
			};
		case OPERATION_TYPES.COMMITTEE_MEMBER_DEACTIVATE:
			return {
				operationInfo: {
					type: 'Deactivate committee member',
					account_name: {
						value: 'account',
						link: '1.2.3',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_account_committee_status: 'Not a member of the committee',
					},
				},
			};
		case OPERATION_TYPES.COMMITTEE_FROZEN_BALANCE_DEPOSIT:
			return {
				operationInfo: {
					type: 'Freeze commitee balance',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_account_committee_status: 'Not a member of the committee',
						current_account_frozen_balance: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				},
			};
		case OPERATION_TYPES.COMMITTEE_FROZEN_BALANCE_WITHDRAW:
			return {
				operationInfo: {
					type: 'Unfreeze commitee balance',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_account_committee_status: 'Not a member of the committee',
						current_account_frozen_balance: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				},
			};
		case OPERATION_TYPES.VESTING_BALANCE_CREATE:
			return {
				operationInfo: {
					type: 'Create vesting balance',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					owner: {
						value: 'dima1',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					policy: [{
						name: 'Object 1',
						begin_date: new Date(),
						duration: '3 days, 23h:59m',
						cliff: '14 days, 12h:33m',
					}, {
						name: 'Object 41',
						begin_date: new Date(),
						duration: '3 days, 23h:59m',
						cliff: '14 days, 12h:33m',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: 'statusString',
						}, {
							key: 'Vested balance',
							value: '1000.000000234 ECHO',
						}, {
							key: 'Available to claim',
							value: 'string',
						}, {
							key: 'Allow to withdraw',
							value: 'string',
						}],
					},
				},
			};
		case OPERATION_TYPES.VESTING_BALANCE_WITHDRAW:
			return {
				operationInfo: {
					type: 'Withdraw vesting balance',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					owner: {
						value: 'dima1',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: 'statusString',
						}, {
							key: 'Vested balance',
							value: '1000.000000234 ECHO',
						}, {
							key: 'Available to claim',
							value: 'string',
						}, {
							key: 'Allow to withdraw',
							value: 'string',
						}],
					},
				},
			};
		case OPERATION_TYPES.BALANCE_CLAIM:
			return {
				operationInfo: {
					type: OPERATION_TYPES.BALANCE_CLAIM,
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					balance_object_id: 'https://explorer.echo.org/blocks/70/1?op=1',
					receiver: {
						value: 'dima1',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					balance_owner_key: [{
						value: 'ECHOd9f8LmNjn32GUMXZwNZDsfBqa6qcBGvGk86kKTuvzkMjdW9saCrTtrPwGpuB',
						weight: '1',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: 'statusString',
						}, {
							key: 'Vested balance',
							value: '1000.000000234 ECHO',
						}, {
							key: 'Available to claim',
							value: 'string',
						}, {
							key: 'Allow to withdraw',
							value: 'string',
						}],
					},
				},
			};
		case OPERATION_TYPES.BALANCE_FREEZE:
			return {
				operationInfo: {
					type: 'Freeeze balance',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					duration: 'ReadableString',
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		case OPERATION_TYPES.BALANCE_UNFREEZE:
			return {
				operationInfo: {
					type: 'Unfreeze balance (virtual)',
					receiver: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_CREATE:
			return {
				operationInfo: {
					type: 'Create contract',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					contract_type: 'x64',
					deployed_contract_bytecode: '60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c792060806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c7920',
					deploy_arguments: ['stringElement1', 'stringElement2', 'stringElement3', 'stringElement4', 'stringElement5'],
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					eth_accuracy_is_enabled: 'String',
					supported_asset: 'ECHO',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						erc20_token_info: [{
							key: 'Token symbol (name)',
							value: 'ZSCHN (Zachekoin token)',
						}, {
							key: 'Decimals',
							value: '18',
						}, {
							key: 'Current sypply (Total supply)',
							value: '21 000 000.00000000934 (90 000 000.000000000000000001)',
						}],
						erc20_token_transfers: [{
							amount: {
								amount: 230,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: 'account',
								link: '1.2.4',
							},
							to: {
								value: 'account',
								link: '1.2.5',
							},
						}, {
							amount: {
								amount: 16,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: 'pink-n-floyd01230',
								link: '1.2.3',
							},
							to: {
								value: 'nathen1234',
								link: '1.2.3',
							},
						}],
						asset_transfers: [{
							amount: {
								amount: 230,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: '',
								link: '1.2.3',
							},
							to: {
								value: 'account',
								link: '1.2.3',
							},
						}],
					},
				},
				logs: [{
					address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					name: {
						name: 'String',
						params: ['param1', 'param2', 'param3'],
					},
					topics: ['ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3eh', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ek'],
					data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000001408de424e0172550000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000005e745a6c',
				}, {
					address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc3',
					name: {
						name: 'String',
						params: ['param1', 'param2', 'param3'],
					},
					topics: ['ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3eh', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ek'],
					data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000001408de424e0172550000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000005e745a6c',
				}],
				internalOperations: [{
					operationInfo: {
						type: 'Contract call',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
						asset_amount_sent: {
							amount: 230,
							precision: 8,
							symbol: 'ECHO',
						},
						bytecode: '60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c7920',
					},
				}, {
					operationInfo: {
						type: 'Contract create',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc3',
						asset_amount_sent: {
							amount: 230,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				}, {
					operationInfo: {
						type: 'Contract delete',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc4',
					},
				}],
			};
		case OPERATION_TYPES.CONTRACT_CALL:
			return {
				operationInfo: {
					type: 'Call contract',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					contract_type: 'x64',
					call_bytecode: '60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c792060806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c7920',
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						called_contract_type: 'String',
						erc20_token_info: [{
							key: 'Token symbol (name)',
							value: 'ZSCHN (Zachekoin token)',
						}, {
							key: 'Decimals',
							value: '18',
						}, {
							key: 'Current sypply (Total supply)',
							value: '21 000 000.00000000934 (90 000 000.000000000000000001)',
						}],
						erc20_token_transfers: [{
							amount: {
								amount: 230,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: 'account',
								link: '1.2.4',
							},
							to: {
								value: 'account',
								link: '1.2.5',
							},
						}, {
							amount: {
								amount: 16,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: 'pink-n-floyd01230',
								link: '1.2.3',
							},
							to: {
								value: 'nathen1234',
								link: '1.2.3',
							},
						}],
						asset_transfers: [{
							amount: {
								amount: 230,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: '',
								link: '1.2.3',
							},
							to: {
								value: 'account',
								link: '1.2.3',
							},
						}],
					},
				},
				logs: [{
					address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					name: {
						name: 'String',
						params: ['param1', 'param2', 'param3'],
					},
					topics: ['ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3eh', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ek'],
					data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000001408de424e0172550000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000005e745a6c',
				}, {
					address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc3',
					name: {
						name: 'String',
						params: ['param1', 'param2', 'param3'],
					},
					topics: ['ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3eh', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ek'],
					data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000001408de424e0172550000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000005e745a6c',
				}],
				internalOperations: [{
					operationInfo: {
						type: 'Contract call',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
						asset_amount_sent: {
							amount: 230,
							precision: 8,
							symbol: 'ECHO',
						},
						bytecode: '60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c7920',
					},
				}, {
					operationInfo: {
						type: 'Contract create',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc3',
						asset_amount_sent: {
							amount: 230,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				}, {
					operationInfo: {
						type: 'Contract delete',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc4',
					},
				}],
			};
		case OPERATION_TYPES.CONTRACT_INTERNAL_CREATE:
			return {
				operationInfo: {
					type: 'Create internal contract (virt)',
					caller_contract: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					new_contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					eth_accuracy_is_enabled: 'String',
					supported_asset: 'ECHO',
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_INTERNAL_CALL:
			return {
				operationInfo: {
					type: 'Call internal contract (virt)',
					caller_contract: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_SELFDESTRUCT:
			return {
				operationInfo: {
					type: 'Destruct contract (virt)',
					destructed_contract: '0xc02aaa39b223fe8d0a0e',
					recipient: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						original_operation: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_UPDATE:
			return {
				operationInfo: {
					type: 'Update contract owner',
					sender: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					new_owner: {
						value: 'thebluezz',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_contract_owner: {
							value: 'nathen1234',
							link: '1.2.3',
						},
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_FUND_POOL:
			return {
				operationInfo: {
					type: 'Contract fund pool',
					sender: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_contract_owner: {
							value: 'nathen1234',
							link: '1.2.3',
						},
						current_contract_whitelist: ['String1', 'String2'],
						current_contract_blacklist: ['String1', 'String2'],
						current_contract_fee_pool_balance: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				},
			};
		case OPERATION_TYPES.CONTRACT_WHITELIST:
			return {
				operationInfo: {
					type: 'Update contract whitelist',
					sender: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					added_to_whitelist: {
						value: 'nathen1234',
						link: '1.2.3',
					},
					removed_from_whitelist: [{
						value: 'nathen1234',
						link: '1.2.3',
					}, {
						value: 'yelly-jelly',
						link: '1.2.4',
					}, {
						value: 'account',
						link: '1.2.4',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						current_contract_owner: {
							value: 'nathen1234',
							link: '1.2.3',
						},
						current_contract_whitelist: ['String1', 'String2'],
						current_contract_blacklist: ['String1', 'String2'],
						current_contract_fee_pool_balance: {
							amount: 23,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				},
			};
		case OPERATION_TYPES.SIDECHAIN_ETH_CREATE_ADDRESS:
			return {
				operationInfo: {
					type: 'Request Eth address',
					sender: {
						value: 'nathen1234',
						link: '1.2.3',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					additionalInfo: {
						number_of_confirmations: {
							value: '2',
							total: '8',
						},
						received_deposit_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.SIDECHAIN_ETH_APPROVE_ADDRESS:
			return {
				operationInfo: {
					type: 'Approve Eth address',
					sender: {
						value: 'nathen1234',
						link: '1.2.3',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					additionalInfo: {
						number_of_confirmations: {
							value: '2',
							total: '8',
						},
						received_deposit_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					},
				},
			};
		case OPERATION_TYPES.SIDECHAIN_ETH_DEPOSIT:
			return {
				operationInfo: {
					type: 'eETH Deposit',
					sender: {
						value: 'nathen1234',
						link: '1.2.3',
					},
					account_name: {
						value: 'yelly-jelly',
						link: '1.2.3',
					},
					amount: {
						amount: 230,
						precision: 8,
						symbol: 'ECHO',
					},
					deposit_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		default:
			return {};
	}
};

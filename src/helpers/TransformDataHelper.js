import { ACCOUNT_BLACK_WHITE, OPERATION_TYPES } from '../constants/OperationTypeConstants';
import getAdditionalInfoByOpType, { getAssetFlags } from './AdditionalInfoHelper';
// import getAdditionalInfoByOpType from './AdditionalInfoHelper';

// It shold be connected to real data
export const transformOperationDataByType = async (type, data) => {
	switch (type) {
		case OPERATION_TYPES.TRANSFER:
			return {
				operationInfo: {
					type,
					from: data.from,
					to: data.to,
					amount: data.amount,
					fee: data.fee,
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.TRANSFER_TO_ADDRESS:
			return {
				operationInfo: {
					type,
					from: data.from,
					amount: data.amount,
					fee: data.fee,
					to_address: data.to_address,
					to_account: data.to_account,
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.OVERRIDE_TRANSFER:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					from: data.from,
					amount: data.amount,
					fee: data.fee,
					to: data.to,
				},
			};
		case OPERATION_TYPES.ACCOUNT_CREATE:
			return {
				operationInfo: {
					type,
					registrar: data.registrar,
					account_name: {
						value: data.mainInfo.subject.name,
						link: data.mainInfo.subject.id,
					},
					new_account_id: data.mainInfo.subject.id,
					authority: [...data.active.key_auths, ...data.active.account_auths].map(([value, weight]) => ({
						value,
						weight,
					})),
					weight_threshold: data.active.weight_threshold,
					echorand_key: data.echorand_key,
					delegating_account: data.delegating_account,
					delegate_share: data.delegate_share,
					fee: data.fee,
				},
			};
		case OPERATION_TYPES.ACCOUNT_UPDATE:
			return {
				operationInfo: {
					type,
					delegate_share: data.delegate_share,
					account_updated: data.delegating_account,
					echorand_key: data.echorand_key,
					fee: data.fee,
				},
			};
		case OPERATION_TYPES.ACCOUNT_WHITELIST: {
			const additionalInfo = await getAdditionalInfoByOpType(type, data.authorizing_account.link);
			return {
				operationInfo: {
					type,
					fee: data.fee,
					sender: data.authorizing_account,
					listed_account: data.account_to_list,
					new_status: ACCOUNT_BLACK_WHITE[data.new_listing],
					additionalInfo,
				},
			};
		}
		case OPERATION_TYPES.ACCOUNT_ADDRESS_CREATE:
			return {
				operationInfo: {
					type,
					sender: data.owner,
					address: data.address,
					label: data.label,
					fee: data.fee,
				},
			};
		case OPERATION_TYPES.ASSET_CREATE:
			// TODO check bitasset
			// Global settle
			// Disable force settle
			const settings = await getAssetFlags(data.objectInfo.toJS());
			const additionalInfo = await getAdditionalInfoByOpType(type, data.mainInfo.result);
			return {
				operationInfo: {
					type,
					issuer: data.issuer,
					asset_name: data.symbol,
					precision: data.precision.precision,
					max_suply: data.objectInfo.get('maxSupply'),
					description: data.objectInfo.get('description'),
					fee: data.fee,
					rate: data.rate,
					is_bit_asset: data.objectInfo.get('bitasset_opts') ? 'Yes' : 'No',
					settings: [{
						key: 'Whitelist',
						value: settings.isWhiteList,
					}, {
						key: 'Override authority',
						value: settings.isOvveride,
					}, {
						key: 'Transfer restricted',
						value: settings.isTransfer,
					}, {
						key: 'Commitee fed asset authority',
						value: settings.isCommette,
					}],
					additionalInfo: {
						settings: [{
							key: 'Whitelist',
							value: additionalInfo.isWhiteList,
						}, {
							key: 'Override authority',
							value: additionalInfo.isOvveride,
						}, {
							key: 'Transfer restricted',
							value: additionalInfo.isTransfer,
						}, {
							key: 'Commitee fed asset authority',
							value: additionalInfo.isCommette,
						}],
					},
					// description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.ASSET_UPDATE: {
			const settings = await getAssetFlags(data.objectInfo.toJS());
			console.log('ASSET_UPDATE data', data);
			console.log('ASSET_UPDATE data', data.objectInfo.toJS());
			return {
				operationInfo: {
					type,
					issuer: data.issuer,
					new_issuer: data.new_issuer,
					asset_name: data.asset_to_update.value,
					max_suply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					rate: data.rate,
					settings: [{
						key: 'Whitelist',
						value: settings.isWhiteList,
					}, {
						key: 'Override authority',
						value: settings.isOvveride,
					}, {
						key: 'Transfer restricted',
						value: settings.isTransfer,
					}, {
						key: 'Commitee fed asset authority',
						value: settings.isCommette,
					}],
					// bit_asset_options: [{
					// 	key: 'Feed lifetime',
					// 	value: '12w, 23d, 34:34:56',
					// }, {
					// 	key: 'Minimum feeds',
					// 	value: '3',
					// }, {
					// 	key: 'Short backing asset:',
					// 	value: 'off',
					// }],
					fee: data.fee,
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		}
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
					// bit_asset_options: [{
					// 	key: 'Feed lifetime',
					// 	value: '12w, 23d, 34:34:56',
					// }, {
					// 	key: 'Minimum feeds',
					// 	value: '3',
					// }, {
					// 	key: 'Short backing asset:',
					// 	value: 'off',
					// }],
					fee: data.fee,
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
					type,
					sender: data.issuer,
					asset_amount: data.asset_to_issue,
					receiver: data.issue_to_account,
					fee: data.fee,
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
		default:
			return {};
	}
};

import { OPERATIONS_IDS } from 'echojs-lib';

import {
	ACCOUNT_BLACK_WHITE,
	OPS_DESCRIPTIONS,
	OPS_TYPES,
} from '../constants/FormattingOperationConstants';
import getAdditionalInfoByOpId, { getAssetFlags } from './AdditionalInfoHelper';
import BN from 'bignumber.js';
import { ECHO_ASSET } from '../constants/GlobalConstants';
// import getAdditionalInfoByOpType from './AdditionalInfoHelper';

// It shold be connected to real data
export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];

	switch (opNumber) {
		case OPERATIONS_IDS.TRANSFER:
			return {
				operationInfo: {
					type,
					from: data.from,
					to: data.to,
					amount: data.amount,
					fee: data.fee,
					description,
				},
			};
		case OPERATIONS_IDS.TRANSFER_TO_ADDRESS:
			return {
				operationInfo: {
					type,
					from: data.from,
					amount: data.amount,
					fee: data.fee,
					to_address: data.to_address,
					to_account: data.to_account,
					description,
				},
			};
		case OPERATIONS_IDS.OVERRIDE_TRANSFER:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					from: data.from,
					amount: data.amount,
					fee: data.fee,
					to: data.to,
					description,
				},
			};
		case OPERATIONS_IDS.ACCOUNT_CREATE:
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
					description,
				},
			};
		case OPERATIONS_IDS.ACCOUNT_UPDATE:
			return {
				operationInfo: {
					type,
					delegate_share: data.delegate_share,
					account_updated: data.delegating_account,
					echorand_key: data.objectInfo.get('echorandKey'),
					fee: data.fee,
					description,
				},
			};
		case OPERATIONS_IDS.ACCOUNT_WHITELIST: {
			const additionalInfo = await getAdditionalInfoByOpId(opNumber, data.authorizing_account.link);
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
		case OPERATIONS_IDS.ACCOUNT_ADDRESS_CREATE:
			return {
				operationInfo: {
					type,
					sender: data.owner,
					address: data.address,
					label: data.label,
					fee: data.fee,
					description,
				},
			};
		case OPERATIONS_IDS.ASSET_CREATE: {
			const settings = await getAssetFlags(data.objectInfo.toJS());
			const additionalInfo = await getAdditionalInfoByOpId(opNumber, data.mainInfo.result);
			return {
				operationInfo: {
					type,
					issuer: data.issuer,
					asset_name: data.symbol,
					precision: data.precision.precision,
					max_suply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					fee: data.fee,
					rate: data.objectInfo.get('rate'),
					is_bit_asset: data.objectInfo.get('isBitAsset') ? 'Yes' : 'No',
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
					description,
				},
			};
		}
		case OPERATIONS_IDS.ASSET_UPDATE: {
			// TODO check issuer and new_issuer
			const settings = await getAssetFlags(data.objectInfo.toJS());
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					new_issuer: data.new_issuer,
					asset_name: data.asset_to_update.value,
					max_suply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					rate: data.objectInfo.get('rate'),
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
					fee: data.fee,
					description,
				},
			};
		}
		case OPERATIONS_IDS.ASSET_UPDATE_BITASSET:
			// TODO check
			console.log('data', data);
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					asset_name: data.asset_to_update,
					max_suply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					rate: data.objectInfo.get('rate'),
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
					description,
				},
			};
		case OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS:
			// TODO check
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					asset_name: 'Asset name',
					asset_description: data.objectInfo.get('description'),
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
					fee: data.fee,
					description,
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
		case OPERATIONS_IDS.ASSET_ISSUE:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					amount: data.asset_to_issue,
					receiver: data.issue_to_account,
					fee: data.fee,
					description,
					additionalInfo: {
						current_asset_total_supply: data.objectInfo.get('totalSupply'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_RESERVE:
			return {
				operationInfo: {
					type,
					sender: data.payer,
					amount: data.amount_to_reserve,
					fee: data.fee,
					description,
					additionalInfo: {
						current_asset_total_supply: data.objectInfo.get('totalSupply'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_FUND_FEE_POOL:
			return {
				operationInfo: {
					type,
					sender: data.from_account,
					amount: data.mainInfo.value,
					fee: data.fee,
					description,
					additionalInfo: {
						current_asset_fee_pool: data.objectInfo.get('totalSupply'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_PUBLISH_FEED:
			// TODO check
			return {
				operationInfo: {
					type,
					sender: data.publisher,
					asset_name: data.asset_id,
					feeded_asset_price: data.asset_id,
					fee: data.fee,
					description,
					additionalInfo: {
						current_asset_price: data.objectInfo.get('price'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_CLAIM_FEES:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					amount: data.amount_to_claim,
					fee: data.fee,
					description,
					additionalInfo: {
						feeded_asset_fee_pool: data.objectInfo.get('totalSupply'),
						current_asset_unclaimed_fee: data.objectInfo.get('accumulated_fees'),
					},
				},
			};
		case OPERATIONS_IDS.PROPOSAL_CREATE:
			return {
				operationInfo: {
					type,
					sender: data.fee_paying_account,
					expiration_time: data.expiration_time,
					preview_period: data.review_period_seconds,
					fee: data.fee,
					description,
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
		case OPERATIONS_IDS.PROPOSAL_UPDATE:
			return {
				operationInfo: {
					type,
					sender: data.fee_paying_account,
					proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
					approvals_to_add: [{
						value: 'ECHOd9f8LmNjn32GUMXZwNZDsfBqa6qcBGvGk86kKTuvzkMjdW9saCrTtrPwGpuB',
						weight: '1',
					}],
					approvals_to_remove: [{
						value: 'vic.tor',
						weight: '1',
					}],
					fee: data.fee,
					description,
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
		case OPERATIONS_IDS.PROPOSAL_DELETE:
			return {
				operationInfo: {
					type,
					sender: data.fee_paying_account,
					proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
					fee: data.fee,
					description,
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
		case OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE:
			return {
				operationInfo: {
					type,
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					url: 'https://explorer.echo.org/blocks/70/1?op=1',
					eth_address: 'https://etherscan.io/',
					btc_address: 'https://www.blockchain.com/explorer',
					deposit_amount: '12,000,000,000. 00000000',
					fee: data.fee,
					description,
					additionalInfo: {
						current_account_committee_status: 'Not a member of the committee',
					},
				},
			};
		case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE:
			return {
				operationInfo: {
					type,
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					new_url: 'https://explorer.echo.org/blocks/70/1?op=1',
					new_eth_address: 'https://etherscan.io/',
					new_btc_address: 'https://www.blockchain.com/explorer',
					fee: data.fee,
					description,
					additionalInfo: {
						current_account_committee_status: 'Not a member of the committee',
					},
				},
			};
		case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS:
			return {
				operationInfo: {
					type,
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					changed_parameters: ['param1', 'param2', 'param3'],
					fee: data.fee,
					description,
					additionalInfo: {
						current_global_parametres: 'https://explorer.echo.org/blocks/70/1?op=1',
					},
				},
			};
		default:
			return {};
	}
};

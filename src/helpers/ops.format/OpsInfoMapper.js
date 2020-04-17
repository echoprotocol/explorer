import { OPERATIONS_IDS } from 'echojs-lib';

import {
	ACCOUNT_BLACK_WHITE, ECHO_COMMITTEE_ACCOUNT,
	OPS_DESCRIPTIONS,
	OPS_TYPES,
} from '../../constants/OpsFormatConstants';

import getAdditionalInfoByOpId, { getAssetFlags } from './AddInfoHelper';

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
					...description,
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
					...description,
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
					...description,
				},
			};
		case OPERATIONS_IDS.ACCOUNT_CREATE: {
			const { active } = data.objectInfo.toJS();
			return {
				operationInfo: {
					type,
					registrar: data.registrar,
					account_name: {
						value: data.mainInfo.subject.name,
						link: data.mainInfo.subject.id,
					},
					new_account_id: data.mainInfo.subject.id,
					authority: [...active.key_auths, ...active.account_auths].map(([value, weight]) => ({ value, weight })),
					weight_threshold: active.weight_threshold,
					echorand_key: data.echorand_key,
					delegating_account: data.delegating_account,
					delegate_share: data.delegate_share,
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ACCOUNT_UPDATE: {
			const { active } = data.objectInfo.toJS();
			return {
				operationInfo: {
					type,
					delegate_share: data.delegate_share,
					delegating_account: data.delegating_account,
					authority: [...active.key_auths, ...active.account_auths].map(([value, weight]) => ({ value, weight })),
					echorand_key: data.objectInfo.get('echorandKey'),
					fee: data.fee,
					...description,
				},
			};
		}
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
					...description,
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
					...description,
				},
			};
		case OPERATIONS_IDS.ASSET_CREATE: {
			const settings = await getAssetFlags(data.objectInfo.toJS());
			const additionalInfo = await getAdditionalInfoByOpId(opNumber, data.mainInfo.result);
			const asset = { value: data.mainInfo.subject.name, link: data.mainInfo.subject.id };
			return {
				operationInfo: {
					type,
					issuer: data.issuer,
					asset,
					precision: data.precision.precision,
					max_supply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					fee: data.fee,
					rate: data.objectInfo.get('rate'),
					is_bit_asset: data.objectInfo.get('bitAssetOps') ? 'Yes' : 'No',
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
					...description,
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
					asset: data.asset_to_update,
					max_supply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					rate: data.objectInfo.get('rate'),
					new_issuer: data.new_issuer,
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
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ASSET_UPDATE_BITASSET: {
			const { bitAssetOps } = data.objectInfo.toJS();
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					asset: data.asset_to_update,
					max_supply: data.objectInfo.get('maxSupply'),
					rate: data.objectInfo.get('rate'),
					bit_asset_options: [{
						key: 'Feed lifetime',
						value: bitAssetOps.feed_lifetime_sec,
					}, {
						key: 'Minimum feeds',
						value: bitAssetOps.minimum_feeds,
					}, {
						key: 'Short backing asset:',
						value: bitAssetOps.short_backing_asset,
					}],
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS: {
			const additionalInfo = await getAdditionalInfoByOpId(opNumber, data.asset_to_update.link);
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					asset: data.asset_to_update,
					asset_description: data.objectInfo.get('description'),
					new_feed_producers: data.new_feed_producers,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_asset_feed_producers: additionalInfo.assetFeedProducers,
					},
				},
			};
		}
		case OPERATIONS_IDS.ASSET_ISSUE:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					amount: data.asset_to_issue,
					receiver: data.issue_to_account,
					fee: data.fee,
					...description,
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
					...description,
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
					...description,
					additionalInfo: {
						current_asset_fee_pool: data.objectInfo.get('totalSupply'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_PUBLISH_FEED:
			return {
				operationInfo: {
					type,
					sender: data.publisher,
					asset: data.asset_id,
					feeded_asset_price: data.asset_id,
					fee: data.fee,
					...description,
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
					...description,
					additionalInfo: {
						feeded_asset_fee_pool: data.objectInfo.get('totalSupply'),
						current_asset_unclaimed_fee: data.objectInfo.get('accumulated_fees'),
					},
				},
			};
		case OPERATIONS_IDS.PROPOSAL_CREATE: {
			// console.log('data.objectInfo', data.proposed_ops);
			const proposalOperations = await Promise.all(data.proposed_ops.map(([idOp, op]) => transformOperationDataByType(idOp, op)));
			return {
				operationInfo: {
					type,
					sender: data.fee_paying_account,
					expiration_time: data.expiration_time,
					preview_period: data.review_period_seconds.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						// count_approvals: { // ADD after succce proposal
						// 	value: 2,
						// 	total: 4,
						// },
						proposal_status: data.objectInfo ? 'resolve' : 'rejected',
						result_transaction: 'https://explorer.echo.org/blocks/70/1?op=1',
					},
				},
				proposalOperations,
			};
		}
		case OPERATIONS_IDS.PROPOSAL_UPDATE: {
			const proposalOperations = await Promise.all(data.proposed_ops.map(([idOp, op]) => transformOperationDataByType(idOp, op)));
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
					...description,
					additionalInfo: {
						count_signatures: '2',
						proposal_status: 'approved',
					},
				},
				proposalOperations,
			};
		}
		case OPERATIONS_IDS.PROPOSAL_DELETE: {
			const proposalOperations = await Promise.all(data.proposed_ops.map(([idOp, op]) => transformOperationDataByType(idOp, op)));
			return {
				operationInfo: {
					type,
					sender: data.fee_paying_account,
					proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
					fee: data.fee,
					...description,
					additionalInfo: {
						count_signatures: '2',
						proposal_status: 'approved',
					},
				},
				proposalOperations,
			};
		}
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
					...description,
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
					...description,
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
						value: ECHO_COMMITTEE_ACCOUNT.NAME,
						link: ECHO_COMMITTEE_ACCOUNT.ID,
					},
					// changed_parameters: ['param1', 'param2', 'param3'],
					fee: data.fee,
					...description,
					additionalInfo: {
						current_global_parametres: 'https://explorer.echo.org/blocks/70/1?op=1',
					},
				},
			};
		default:
			return {};
	}
};

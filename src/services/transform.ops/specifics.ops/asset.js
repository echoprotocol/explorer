import { OPERATIONS_IDS } from 'echojs-lib';

import { OPS_DESCRIPTIONS, OPS_TYPES } from '../../../constants/OpsFormatConstants';
import getAdditionalInfoByOpId, { getAssetFlags } from '../AddInfoHelper';

export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];

	switch (opNumber) {
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
					}, {
						key: 'Stake asset',
						value: settings.isStake,
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
						}, {
							key: 'Stake asset',
							value: settings.isStake,
						}],
					},
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ASSET_UPDATE: {
			const isShowIssuer = data.new_issuer && data.issuer.link !== data.new_issuer.link;
			const settings = await getAssetFlags(data.objectInfo.toJS());
			const bitAssetOps = data.objectInfo.get('bitAssetOps');
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					asset: data.asset_to_update,
					max_supply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					rate: data.objectInfo.get('rate'),
					...(isShowIssuer && ({ new_issuer: data.new_issuer })),
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
					}, {
						key: 'Stake asset',
						value: settings.isStake,
					}],
					bit_asset_options: bitAssetOps && [{
						key: 'Feed lifetime',
						value: bitAssetOps.feed_lifetime_sec,
					}, {
						key: 'Minimum feeds',
						value: bitAssetOps.minimum_feeds,
					}, {
						key: 'Short backing asset',
						value: bitAssetOps.short_backing_asset,
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
						current_asset_total_supply: data.objectInfo.get('total_supply'),
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
						current_asset_total_supply: data.objectInfo.get('total_supply'),
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
						current_asset_fee_pool: data.objectInfo.get('total_supply'),
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
						feeded_asset_fee_pool: data.objectInfo.get('total_supply'),
						current_asset_unclaimed_fee: data.objectInfo.get('accumulated_fees'),
					},
				},
			};
		default:
			return null;
	}
};

export default transformOperationDataByType;

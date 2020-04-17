import echo, { OPERATIONS_IDS } from 'echojs-lib';
import BN from 'bignumber.js';

import { ASSET_ISSUER_PERMISSION_FLAGS } from '../../constants/OpsFormatConstants';
import { ECHO_ASSET } from '../../constants/GlobalConstants';

export async function countRate(asset, { base, quote }) {
	const amount = (new BN(base.amount).div(`1e${ECHO_ASSET.PRECISION}`))
		.div(new BN(quote.amount).div(`1e${asset.precision}`)).toString();

	return {
		amount,
		asset_id: asset.id,
		symbol: asset.symbol,
		precision: asset.precision,
	};
}

async function getAccountWhiteListInfo(accountId) {
	const [account] = await echo.api.getAccounts([accountId]);
	return {
		whitelisting_accounts: account.whitelisted_accounts.map((id) => ({ link: id, value: id })),
		blacklisting_accounts: account.blacklisted_accounts.map((id) => ({ link: id, value: id })),
	};
}

export function getAssetFlags({ flags, issuer_permissions: permissionFlags }) {
	let [isWhiteList, isOvveride, isTransfer, isCommette] = ['disable', 'disable', 'disable', 'disable'];
	if (!permissionFlags) {
		return {
			isWhiteList, isOvveride, isTransfer, isCommette,
		};
	}
	/* eslint-disable */
	isWhiteList = (ASSET_ISSUER_PERMISSION_FLAGS.WHITE_LIST & flags) ? 'on' : 'off';
	isOvveride = (ASSET_ISSUER_PERMISSION_FLAGS.OVVERIDE_AUTHORITY & flags) ? 'on' : 'off';
	isTransfer = (ASSET_ISSUER_PERMISSION_FLAGS.TRANSFER_RESTRICTED & flags) ? 'on' : 'off';
	isCommette = (ASSET_ISSUER_PERMISSION_FLAGS.COMMITTEE_FED_ASSET & flags) ? 'on' : 'off';
	/* eslint-enable */
	return {
		isWhiteList, isOvveride, isTransfer, isCommette,
	};
}

async function getAssetCreateInfo(assetId) {
	const [asset] = await echo.api.getAssets([assetId]);
	return getAssetFlags(asset.options);
}

async function getAssetUpdateFeedProducersInfo(assetId) {
	const asset = await echo.api.getObject(assetId);
	const producersIds = asset.bitasset.feeds.map(([producerId]) => producerId);
	const producers = await echo.api.getAccounts(producersIds);
	const assetFeedProducers = producers.map(({ name, id }) => ({ value: name, link: id }));
	return { assetFeedProducers };
}

async function getAdditionalInfoByOpId(opId, data) {
	try {
		switch (opId) {
			case OPERATIONS_IDS.ACCOUNT_WHITELIST:
				return await getAccountWhiteListInfo(data);
			case OPERATIONS_IDS.ASSET_CREATE:
				return await getAssetCreateInfo(data);
			case OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS:
				return await getAssetUpdateFeedProducersInfo(data);
			default:
				return null;
		}
	} catch (err) {
		console.log('Error to get additional data ops: ', err);
		return null;
	}
}

export default getAdditionalInfoByOpId;

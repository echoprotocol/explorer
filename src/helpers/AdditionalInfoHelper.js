import echo from 'echojs-lib';
import { OPERATIONS_IDS } from 'echojs-lib';

import { ASSET_ISSUER_PERMISSION_FLAGS } from '../constants/FormattingOperationConstants';

async function getAccountWhiteListInfo(accountId) {
	const [account] = await echo.api.getAccounts([accountId]);
	return {
		whitelisting_accounts: account.whitelisted_accounts,
		blacklisting_accounts: account.blacklisted_accounts,
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

async function getAdditionalInfoByOpId(opId, data) {
	try {
		switch (opId) {
			case OPERATIONS_IDS.ACCOUNT_WHITELIST:
				return await getAccountWhiteListInfo(data);
			case OPERATIONS_IDS.ASSET_CREATE:
				return await getAssetCreateInfo(data);
			default:
				return null;
		}
	} catch (err) {
		console.log('Error to get additional data ops: ', err);
		return null;
	}
}

export default getAdditionalInfoByOpId;

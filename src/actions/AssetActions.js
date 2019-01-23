import echo from 'echojs-lib';

import { NOT_FOUND_PATH } from '../constants/RouterConstants';

import history from '../history';

/**
 *  @method setLatestBlock
 *
 * 	Set latest block from blockchain to redux store
 */
// eslint-disable-next-line import/prefer-default-export
export const getFullAssetInformation = (assetId) => async () => {
	try {
		const asset = await echo.api.getObject(assetId);

		if (!asset) {
			history.push(NOT_FOUND_PATH);
			return;
		}

		await echo.api.getObject(asset.issuer);

	} catch (_) {
		history.push(NOT_FOUND_PATH);
	}
};

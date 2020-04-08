import echo from 'echojs-lib';

import GlobalActions from './GlobalActions';

/**
 * @method getFullAssetInformation
 * @param {string} assetId
 */
// eslint-disable-next-line import/prefer-default-export
export const getFullAssetInformation = (assetId) => async (dispatch) => {
	try {
		const asset = await echo.api.getObject(assetId);

		if (!asset) {
			dispatch(GlobalActions.toggleErrorPath(true));
			return;
		}

		const issuer = await echo.api.getObject(asset.issuer);

		// eslint-disable-next-line consistent-return
		return { asset, issuer };
	} catch (err) {
		dispatch(GlobalActions.toggleErrorPath(true));
	}
};

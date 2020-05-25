import echo from 'echojs-lib';

import GlobalActions from './GlobalActions';
import { getAssetFlags } from '../services/transform.ops/AddInfoHelper';

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

		const issuerPermissions = asset && asset.options.issuer_permissions;
		const flags = asset && asset.options.flags;
		const flagsValues = getAssetFlags({ flags, issuer_permissions: issuerPermissions });
		asset.options.flags = Object.entries(flagsValues).map((el) => ({ key: el[0], value: el[1] }));

		// eslint-disable-next-line consistent-return
		return { asset, issuer };
	} catch (err) {
		dispatch(GlobalActions.toggleErrorPath(true));
	}
};

import echo from 'echojs-lib';
import { fromJS, Map } from 'immutable';

import GlobalActions from './GlobalActions';
import AssetReducer from '../reducers/AssetReducer';

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

		dispatch(AssetReducer.actions.set({ field: 'asset', value: fromJS(asset) }));
		dispatch(AssetReducer.actions.set({ field: 'issuer', value: issuer ? new Map(issuer) : null }));
	} catch (err) {
		dispatch(GlobalActions.toggleErrorPath(true));
	}
};

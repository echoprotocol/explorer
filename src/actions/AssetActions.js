import echo from 'echojs-lib';
import { batchActions } from 'redux-batched-actions';
import { fromJS, Map } from 'immutable';

import GlobalActions from './GlobalActions';
import AssetReducer from '../reducers/AssetReducer';

/**
 *  @method setLatestBlock
 *
 * 	Set latest block from blockchain to redux store
 */
// eslint-disable-next-line import/prefer-default-export
export const getFullAssetInformation = (assetId) => async (dispatch) => {
	try {
		console.log('getFullAssetInformation');
		const asset = await echo.api.getObject(assetId);

		console.log('asset', asset);
		if (!asset) {
			dispatch(GlobalActions.toggleErrorPath(true));
			return;
		}

		const issuer = await echo.api.getObject(asset.issuer);

		dispatch(batchActions([
			AssetReducer.actions.set({ field: 'asset', value: fromJS(asset) }),
			AssetReducer.actions.set({ field: 'issuer', value: issuer ? new Map(issuer) : null }),
		]));
	} catch (err) {
		console.log('err', err);
		dispatch(GlobalActions.toggleErrorPath(true));
	}
};

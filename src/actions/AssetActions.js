import echo from 'echojs-lib';
import GlobalReducer from '../reducers/GlobalReducer';

/**
 *  @method setLatestBlock
 *
 * 	Set latest block from blockchain to redux store
 */
// eslint-disable-next-line import/prefer-default-export
export const getFullAssetInformation = (assetId) => async (dispatch) => {
	try {
		const asset = await echo.api.getObject(assetId);

		if (!asset) {
			dispatch(GlobalReducer.actions.set({ field: 'errorPath', value: true }));
			return;
		}

		await echo.api.getObject(asset.issuer);

	} catch (_) {
		dispatch(GlobalReducer.actions.set({ field: 'errorPath', value: true }));
	}
};

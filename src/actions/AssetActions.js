import echo from 'echojs-lib';
import GlobalActions from './GlobalActions';

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
			dispatch(GlobalActions.toggleErrorPath(true));
			return;
		}

		await echo.api.getObject(asset.issuer);

	} catch (_) {
		dispatch(GlobalActions.toggleErrorPath(true));
	}
};

import echo from 'echojs-lib';
import { List } from 'immutable';

import GlobalActions from './GlobalActions';
import { getAssetFlags } from '../services/transform.ops/AddInfoHelper';
import { ASSET_GRID } from '../constants/TableConstants';
import { getAssetHistory } from '../services/queries/asset';
import GridActions from './GridActions';
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

export const getAssetTransfers = (assetId) => async (dispatch, getState) => {
	const queryData = getState().grid.get(ASSET_GRID).toJS();
	const getObjectId = async (objectId) => {
		if (!objectId) { return; }
		let account = null;
		try {
			account = await echo.api.getAccountByName(objectId.trim());
			if (account) {
				account = account.id;
			}
			// eslint-disable-next-line no-empty
		} catch (err) { }
		// eslint-disable-next-line consistent-return
		return account;
	};

	const [fromFilter, toFilter] = await Promise.all([
		getObjectId(queryData.filters.from),
		getObjectId(queryData.filters.to),
	]);
	let items = [];
	let total = 0;

	try {
		({ items, total } = await getAssetHistory({
			assetId,
			fromFilter: fromFilter || undefined,
			toFilter: toFilter || undefined,
			offset: (queryData.currentPage - 1) * queryData.sizePerPage,
			count: queryData.sizePerPage,
		}));
	} catch (err) {
		console.log('EchoDB error', err);
	}

	dispatch(GridActions.setTotalDataSize(ASSET_GRID, total));
	dispatch(AssetReducer.actions.set({ field: 'history', value: new List(items) }));
};

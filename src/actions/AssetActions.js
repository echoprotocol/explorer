import echo from 'echojs-lib';
import { List } from 'immutable';
import moment from 'moment';

import GlobalActions from './GlobalActions';
import { getAssetFlags } from '../services/transform.ops/AddInfoHelper';
import { ASSET_GRID } from '../constants/TableConstants';
import { getAssetHistory } from '../services/queries/asset';
import { getTransfersHistoryWithInterval } from '../services/queries/history';
import GridActions from './GridActions';
import AssetReducer from '../reducers/AssetReducer';
import Operations from '../constants/Operations';

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
	if (!echo.api) {
		return;
	}
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

	({ total } = await getAssetHistory({
		assetId,
		from: fromFilter || undefined,
		to: toFilter || undefined,
	}));
	GridActions.setTotalDataSize(ASSET_GRID, total);
	const offset = total - (queryData.currentPage * queryData.sizePerPage);
	const count = offset < 0 ? queryData.sizePerPage + offset : queryData.sizePerPage;
	try {
		({ items, total } = await getAssetHistory({
			assetId,
			count,
			offset: offset < 0 ? 0 : offset,
			from: fromFilter || undefined,
			to: toFilter || undefined,
		}));
	} catch (err) {
		console.log('EchoDB error', err);
	}
	let transfers = items.map(async (el) => {
		const feeAsset = await echo.api.getObject(el.fee.asset_id);
		const operation = Object.values(Operations).find((o) => o.value === el.operationId);
		el.feeData = {
			asset_id: feeAsset.id,
			precision: feeAsset.precision,
			symbol: feeAsset.symbol,
			value: el.fee.amount,
		};
		if (el.contract) {
			el.asset = {
				id: el.contract.id,
				symbol: el.contract.token.symbol,
				precision: Number(el.contract.token.decimals),
			};
		}
		el.operation = operation.name;
		return el;
	});
	transfers = await Promise.all(transfers);

	dispatch(GridActions.setTotalDataSize(ASSET_GRID, total));
	dispatch(AssetReducer.actions.set({ field: 'history', value: new List(transfers) }));
};

const formatAssetTransfersHistoyAccounts = (history) => history.map((data) => ({
	price: data.rate,
	date: moment(data.startIntervalDateString).format('DD-MM-YYYY'),
}));

export const getAssetTransfersHistoryWithInterval = (assetId) => async (dispatch) => {
	let ratesMap = [];
	let from = moment().subtract(1, 'month').toISOString();

	try {
		const [asset] = await echo.api.getAssets([assetId]);

		if (!asset) {
			return;
		}
		const firstBlock = await echo.api.getBlock(1);
		from = firstBlock && moment(firstBlock.timestamp).toISOString();
		const interval = moment.duration(1, 'day').as('second');

		({ ratesMap } = await getTransfersHistoryWithInterval({
			from,
			interval,
			targetSubject: String(asset.id),
		}));
	} catch (err) {
		console.log('EchoDB error', err);
	} finally {
		if (!ratesMap.length) {
			const nowTime = moment().toISOString();
			ratesMap = [
				{ startIntervalDateString: from, rate: 0 },
				{ startIntervalDateString: nowTime, rate: 0 },
			];
		}
		ratesMap = formatAssetTransfersHistoyAccounts(ratesMap);
	}

	dispatch(AssetReducer.actions.set({ field: 'transferHistoryWithInterval', value: new List(ratesMap) }));
};

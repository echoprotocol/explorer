import echo from 'echojs-lib';
import GlobalActions from './GlobalActions';

import BaseActionsClass from './BaseActionsClass';
import StatisticsReducer from '../reducers/StatisticsReducer';

class StatisticsActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(StatisticsReducer);
	}

	/**
	 * @method getAssetInformationByIds
	 * @param {string[]} assetIds
	 */
	getAssetInformationByIds(assetIds) {
		return async (dispatch) => {
			let assets = [];
			try {
				assets = await echo.api.getObjects(assetIds);
			} catch (_) {
				dispatch(GlobalActions.toggleErrorPath(true));
			}
			assets = assets.reduce((map, asset) => ({
				...map,
				[asset.id]: asset,
			}), {});
			dispatch(this.setValue('assets', assets));
		};
	}

}

const StatisticsActions = new StatisticsActionsClass();
export default StatisticsActions;


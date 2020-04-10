import echo from 'echojs-lib';
import moment from 'moment';

import GlobalActions from './GlobalActions';
import BaseActionsClass from './BaseActionsClass';
import StatisticsReducer from '../reducers/StatisticsReducer';

import { getStatistics } from '../services/queries/statistics';
import { MONITORING_ASSETS } from '../constants/TotalSupplyConstants';

class StatisticsActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(StatisticsReducer);
	}

	/**
	 * updateStatistics
	 */
	updateStatistics() {
		return async (dispatch) => {
			const from = moment().subtract(1, 'month').toISOString();
			const interval = moment.duration(1, 'day').as('second');

			const { data: { getDelegationPercent, getDecentralizationRate } } = await getStatistics(from, interval);
			dispatch(this.updateTotalSupply(MONITORING_ASSETS));
			dispatch(this.updateDelegationRate(getDelegationPercent));
			dispatch(this.updateDecentralizationRate(getDecentralizationRate));
		};
	}
	/**
	 * @method updateTotalSupply
	 * @param {string[]} assetIds
	 */
	updateTotalSupply(assetIds) {
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

	/**
	 *
	 * @param delegatePercent
	 * @param ratesMap
	 * @return {Promise<function(...[*]=)>}
	 */
	updateDelegationRate({ delegatePercent, ratesMap }) {
		return (dispatch) => {
			dispatch(this.setMultipleValue({
				delegationRate: Number(delegatePercent.toFixed(2)),
				delegationRates: ratesMap.map((el) => ({ rate: el.rate })),
			}));
		};
	}

	/**
	 *
	 * @param decentralizationPercent
	 * @param ratesMap
	 * @return {Promise<function(...[*]=)>}
	 */
	updateDecentralizationRate({ decentralizationRatePercent, ratesMap }) {
		return (dispatch) => {
			dispatch(this.setMultipleValue({
				decentralizationRate: Number(decentralizationRatePercent.toFixed(2)),
				decentralizationRates: ratesMap.map((el) => ({ rate: el.rate })),
			}));
		};
	}

}

const StatisticsActions = new StatisticsActionsClass();
export default StatisticsActions;


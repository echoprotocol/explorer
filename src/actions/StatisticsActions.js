import echo from 'echojs-lib';
import moment from 'moment';
import BN from 'bignumber.js';

import GlobalActions from './GlobalActions';
import BaseActionsClass from './BaseActionsClass';
import StatisticsReducer from '../reducers/StatisticsReducer';

import { getStatistics } from '../services/queries/statistics';
import { MONITORING_ASSETS } from '../constants/TotalSupplyConstants';
import { getLatestOperations } from './BlockActions';

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
	updateStatistics(block) {
		const getBlock = {};
		return async (dispatch) => {
			const from = moment().subtract(1, 'month').toISOString();
			const interval = moment.duration(1, 'day').as('second');
			try {
				const {
					data: {
						getDelegationPercent,
						getDecentralizationRate,
						getOperationCountHistory,
						getFrozenBalancesData,
					},
				} = await getStatistics(from, interval);
				getBlock.average_block_time = block.average_block_time;
				getDecentralizationRate.decentralizationRatePercent = block.decentralization_rate;
				getFrozenBalancesData.frozen_balances_data = block.frozen_balances_data;
				await dispatch(getLatestOperations());
				dispatch(this.updateTotalSupply(MONITORING_ASSETS));
				dispatch(this.updateDelegationRate(getDelegationPercent));
				dispatch(this.updateDecentralizationRate(getDecentralizationRate));
				dispatch(this.updateOperationCount(getOperationCountHistory));
				dispatch(this.updateAverageBlocktime(getBlock));
				dispatch(this.updateFrozenData(getFrozenBalancesData));
			} catch (error) {
				console.log('EchoDB err', error);
			}
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
				delegationRate: new BN(delegatePercent).integerValue(BN.ROUND_CEIL).toNumber(),
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
				decentralizationRate: new BN(decentralizationRatePercent).integerValue(BN.ROUND_CEIL).toNumber(),
				decentralizationRates: ratesMap.map((el) => ({ rate: el.rate })),
			}));
		};
	}

	/**
	 *
	 * @param updateOperationCount
	 * @param ratesMap
	 * @return {Promise<function(...[*]=)>}
	 */
	updateOperationCount({ total, ratesMap }) {
		return (dispatch) => {
			dispatch(this.setMultipleValue({
				operationCount: total,
				operationCountRates: ratesMap.map(({ rate }) => ({ rate })),
			}));
		};
	}

	/**
	 *
	 * @param updateAverageBlocktime
	 * @param average_block_time
	 * @return {Promise<function(...[*]=)>}
	 */
	updateAverageBlocktime({ average_block_time: averageBlockTime }) {
		return (dispatch) => {
			dispatch(this.setMultipleValue({
				averageBlockTime,
			}));
		};
	}

	updateFrozenData(newBlock) {
		return (dispatch) => {
			const { frozenData } = newBlock;
			const historyFrozenData = frozenData.map((el) => el.frozenSums);
			dispatch(this.setMultipleValue({
				currentFrozenData: newBlock.currentFrozenData,
				frozenData: historyFrozenData,
			}));
		};
	}

}
const StatisticsActions = new StatisticsActionsClass();
export default StatisticsActions;

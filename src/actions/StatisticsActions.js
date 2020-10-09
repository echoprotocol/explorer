import echo from 'echojs-lib';
import moment from 'moment';
import BN from 'bignumber.js';

import GlobalActions from './GlobalActions';
import BaseActionsClass from './BaseActionsClass';
import StatisticsReducer from '../reducers/StatisticsReducer';

import { getStatistics, getReducedStatistics } from '../services/queries/statistics';
import { MONITORING_ASSETS, MONITORING_INCENTIVE_ASSET } from '../constants/TotalSupplyConstants';
import { getLatestOperations } from './BlockActions';
import FormatHelper from '../helpers/FormatHelper';

class StatisticsActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(StatisticsReducer);
	}

	/**
	 * partUpdateStatistics
	 */
	partUpdateStatistics(block) {
		const getBlock = {};
		return async (dispatch) => {
			const from = moment().subtract(1, 'month').toISOString();
			const interval = moment.duration(1, 'day').as('second');
			try {
				const {
					data: {
						getOperationCountHistory,
						getFrozenBalancesData,
					},
				} = await getReducedStatistics(from, interval);
				const incentive = await echo.api.getIncentivesInfo();
				const coreAsset = await echo.api.getObject(MONITORING_INCENTIVE_ASSET);
				getBlock.average_block_time = block.average_block_time;
				getFrozenBalancesData.frozen_balances_data = block.frozen_balances_data;

				await dispatch(getLatestOperations());
				dispatch(this.updateTotalSupply(MONITORING_ASSETS));
				dispatch(this.updateOperationCount(getOperationCountHistory));
				dispatch(this.updateAverageBlocktime(getBlock));
				dispatch(this.updateOnlyDecentralizationRate(block.decentralization_rate));
				dispatch(this.updateFrozenData(getFrozenBalancesData));
				dispatch(this.updateIncentivesPool(incentive, coreAsset));
				dispatch(this.updateIncentives(incentive, coreAsset));
			} catch (error) {
				console.log('EchoDB err', error);
			}
		};
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
				const incentive = await echo.api.getIncentivesInfo();
				const coreAsset = await echo.api.getObject(MONITORING_INCENTIVE_ASSET);
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
				dispatch(this.updateIncentivesPool(incentive, coreAsset));
				dispatch(this.updateIncentives(incentive, coreAsset));
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
	 * @param updateOnlyDecentralizationRate
	 * @param decentralizationRatePercent
	 * @return {Promise<function(...[*]=)>}
	 */
	updateOnlyDecentralizationRate(decentralizationRatePercent) {
		return (dispatch) => {
			dispatch(this.setValue('decentralizationRate', new BN(decentralizationRatePercent)
				.integerValue(BN.ROUND_CEIL).toNumber()));
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

	/**
	 *
	 * @param {object} incentive
	 * @param {object} assetToWatch
	 * @return {Promise<function(...[*]=)>}
	 */
	// eslint-disable-next-line camelcase
	updateIncentivesPool({ incentives_pool }, { id, precision }) {
		return (dispatch) => {
			const echoIncentivesPool = incentives_pool.find(([assetId]) => assetId === id);
			if (!echoIncentivesPool) {
				return;
			}

			const amount = FormatHelper.formatAmount(echoIncentivesPool[1], precision);
			dispatch(this.setValue('incentivesPool', amount));
		};
	}

	/**
	 *
	 * @param {object} incentive
	 * @param {object} assetToWatch
	 * @return {Promise<function(...[*]=)>}
	 */
	updateIncentives({ incentives }, { id, precision }) {
		return (dispatch) => {
			const idWithoutPrefix = parseInt(id.split('.')[2], 10);
			const echoIncentives = incentives.find(([assetId]) => assetId === idWithoutPrefix);
			if (!echoIncentives) {
				return;
			}

			const amount = FormatHelper.formatAmount(echoIncentives[1], precision);

			dispatch(this.setMultipleValue({
				incentive: amount,
				incentiveRates: [],
			}));
		};
	}

}
const StatisticsActions = new StatisticsActionsClass();
export default StatisticsActions;

/* eslint-disable no-underscore-dangle */
import GridReducer from '../reducers/GridReducer';
import BaseActionsClass from './BaseActionsClass';
import { DEFAULT_SIZE_PER_PAGE } from '../constants/TableConstants';
import TypesHelper from '../helpers/TypesHelper';

export class GridActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GridReducer);
	}

	clearTimeout(gridName) {
		return (dispatch, getState) => {
			const state = getState();
			const loadingTimeout = state.grid.getIn([gridName, 'loadingTimeout']);
			clearTimeout(loadingTimeout);
			dispatch(this.setValue([gridName, 'loadingTimeout'], null));
		};
	}

	/**
	 * @method initData
	 * @param {String} gridName
	 * @param {Object} params
	 * @return {function(*, *)}
	 */
	initData(gridName, params = { }) {
		return (dispatch) => new Promise((resolve) => {
			const sizePerPage = TypesHelper.isStringNumber(params.l) ? parseInt(params.l, 10) : DEFAULT_SIZE_PER_PAGE;
			const currentPage = TypesHelper.isStringNumber(params.p) ? parseInt(params.p, 10) : 1;
			const transformParams = {
				totalDataSize: params.totalDataSize || 0,
				sizePerPage,
				currentPage,
				filters: {
					from: params.from || '',
					to: params.to || '',
				},
			};
			dispatch(this.reducer.actions.initData({ gridName, params: transformParams }));
			resolve();
		});
	}

	/**
	 * Set total data size
	 * @param {String} gridName
	 * @param {Object} totalDataSize
	 * @return {function(*, *)}
	 */
	setTotalDataSize(gridName, totalDataSize) {
		return (dispatch) => {
			dispatch(this.reducer.actions.setTotalDataSize({ gridName, totalDataSize }));
		};
	}

	/**
	 * Set page
	 * @param {String} gridName
	 * @param {Number} currentPage
	 * @return {function(*, *)}
	 */
	setPage(gridName, currentPage) {
		return (dispatch) => {
			dispatch(this.reducer.actions.setPage({ gridName, currentPage }));
		};
	}

	/**
	 * Set number of row on the page
	 * @param {String} gridName
	 * @param {Number} value
	 * @return {function(*, *)}
	 */
	setPageSize(gridName, value) {
		return (dispatch) => {
			dispatch(this.setValue([gridName, 'sizePerPage'], value));
		};
	}

	/**
	 * Set sort
	 * @param {String} gridName
	 * @param {String} field
	 * @param {String} destination asc|desc
	 * @return {function(*, *)}
	 */
	setSort(gridName, field, destination) {
		return (dispatch) => {
			dispatch(this.reducer.actions.setSort({ gridName, field, destination }));
		};
	}

	/**
	 * Set filter by field
	 * @param {String} gridName
	 * @param {Object} params
	 * @return {function(*, *)}
	 */
	setFilter(gridName, params) {
		return (dispatch) => new Promise((resolve) => {
			dispatch(this.reducer.actions.setFilter({ gridName, params }));
			resolve();
		});
	}

	/**
	 * Get page options
	 * @param {String} gridName
	 */
	getPageOptions(gridName) {
		return (dispatch, getState) => {
			const state = getState();
			const options = {
				count: state.grid.getIn([gridName, 'sizePerPage']),
				offset: state.grid.getIn([gridName, 'offset']),
			};

			if (state.grid.getIn([gridName, 'currentPage']) !== 1) {
				options.currentPage = state.grid.getIn([gridName, 'currentPage']);
			}

			return options;
		};
	}

	/**
	 * Get sort
	 * @param {String} gridName
	 */
	getSort(gridName) {
		return (dispatch, getState) => {
			const state = getState();
			return {
				sortBy: state.grid.getIn([gridName, 'sort', 'field']),
				sortDestination: state.grid.getIn([gridName, 'sort', 'destination']),
			};
		};
	}

	/**
	 * Get filters by state
	 * @param {String} gridName
	 */
	getFilters(gridName) {
		return (dispatch, getState) => {
			const state = getState();
			return state.grid.getIn([gridName, 'filters']);
		};
	}

	/**
	 * Clear by field
	 * @param {String} gridName
	 */
	clearByField(gridName) {
		return (dispatch) => {
			dispatch(this.reducer.actions.clearByField({ gridName }));
		};
	}

	/**
	 * Clear error by field
	 * @param {Array} field
	 * @returns {Function}
	 */
	clearError(field) {
		return (dispatch, getState) => {
			const state = getState();
			const error = state.grid.getIn(field);
			if (error) {
				dispatch(this.setValue(field, ''));
			}
		};
	}

}

const GridActions = new GridActionsClass();
export default GridActions;

import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import _ from 'lodash';

import {
	COUNT_PAGE,
	USERS_GRID,
} from '../constants/GridConstants';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	data: List([]),
	totalDataSize: 0,
	sizePerPage: COUNT_PAGE,
	currentPage: 1,
	offset: 0,
	sort: Map({
		field: '',
		destination: '',
	}),
	filters: {},
	loading: false,
});

const DEFAULT_GRID_FIELDS = {
	[USERS_GRID]: Map({
		sort: Map({
			field: 'date',
			destination: 'desc',
		}),
		filters: {
			type: '',
			user: '',
		},
	}),
};

const DEFAULT_STATE = Map({
	[USERS_GRID]: _.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_GRID_FIELDS[USERS_GRID]),
});

export default createModule({
	name: 'grid',
	initialState: DEFAULT_STATE,
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_STATE)),
		setTotalDataSize: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.gridName, 'totalDataSize'], payload.totalDataSize);

				return state;
			},
		},
		setSort: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.gridName, 'sort', 'field'], payload.field);
				state = state.setIn([payload.gridName, 'sort', 'destination'], payload.destination);

				return state;
			},
		},
		setPage: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.gridName, 'currentPage'], payload.currentPage);
				state = state.setIn([payload.gridName, 'offset'], payload.offset);

				return state;
			},
		},
		setFilter: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.gridName, 'filters'], payload.params);

				return state;
			},
		},
		clearByField: {
			reducer: (state, { payload }) => {
				state = state.set(payload.gridName, _.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_GRID_FIELDS[payload.gridName]));
				return state;
			},
		},
	},
});

import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';

import {
	DEFAULT_SIZE_PER_PAGE,
	ACCOUNT_GRID, BLOCK_GRID,
} from '../constants/TableConstants';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	totalDataSize: 0,
	sizePerPage: DEFAULT_SIZE_PER_PAGE,
	currentPage: 1,
	filters: {
		from: '',
		to: '',
	},
});

const DEFAULT_STATE = Map({
	[ACCOUNT_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[BLOCK_GRID]: _.cloneDeep(DEFAULT_FIELDS),
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
				state = state.set(payload.gridName, _.cloneDeep(DEFAULT_FIELDS));
				return state;
			},
		},
	},
});

import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';

import {
	DEFAULT_SIZE_PER_PAGE,
	ACCOUNT_GRID,
	CONTRACT_GRID,
	BLOCK_GRID,
	TRANSACTION_GRID,
	ERC20_GRID,
	BLOCKS_GRID,
	CURRENT_COMMITTEE_GRID,
	CANDIDATE_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
	ASSET_GRID,
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
	[ASSET_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[ACCOUNT_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[CONTRACT_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[BLOCK_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[TRANSACTION_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[ERC20_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[BLOCKS_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[CURRENT_COMMITTEE_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[CANDIDATE_COMMITTEE_GRID]: _.cloneDeep(DEFAULT_FIELDS),
	[DEACTIVATED_COMMITTEE_GRID]: _.cloneDeep(DEFAULT_FIELDS),
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
		initData: {
			reducer: (state, { payload }) => {
				state = state.set(payload.gridName, new Map(payload.params));
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

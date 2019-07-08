import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

import { DEFAULT_ROWS_COUNT } from '../constants/GlobalConstants';

const DEFAULT_FIELDS = new Map({
	loading: false,
	loadingMoreHistory: false,
	isFullHistory: false,
	balances: new List([]),
	history: new List([]),
	bytecode: null,
	lastOperationId: '',
	name: '',
	description: '',
	icon: '',
	sourceCode: '',
	abi: new List(),
	compilerVersion: '',
	verified: false,
	stars: new List(),
	registrar: '',
	blockNumber: 0,
	countUsedByAccount: 0,
	type: new List(),
	supportedAsset: '',
	ethAccuracy: false,
	contractTxs: 0,
	creationFee: new Map(),
	createdAt: '',
	owner: new Map(),
});

export default createModule({
	name: 'contract',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
		update: {
			reducer: (state, { payload }) => {
				let list = state.get(payload.field);

				if (list.size >= DEFAULT_ROWS_COUNT && !state.get('isFullHistory')) {
					list = list.slice(0, list.size - payload.value.size);
				}

				if (list.size < DEFAULT_ROWS_COUNT && list.size + payload.value.size > DEFAULT_ROWS_COUNT) {
					const diff = (list.size + payload.value.size) - DEFAULT_ROWS_COUNT;
					list = list.slice(0, list.size - diff);
					state = state.set('isFullHistory', false);
				}

				state = state.set(payload.field, payload.value.concat(list));

				return state;
			},
		},
		concat: {
			reducer: (state, { payload }) => {
				state = state.set(payload.field, state.get(payload.field).concat(payload.value));

				return state;
			},
		},
	},
});

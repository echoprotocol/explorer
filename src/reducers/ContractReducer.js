import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = new Map({
	loading: false,
	bytecode: null,
	balances: new List([]),
	history: new List([]),
	isFullHistory: false,
});

export default createModule({
	name: 'contract',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
		concat: {
			reducer: (state, { payload }) => {
				state = state.set(payload.field, state.get(payload.field).concat(payload.value));

				return state;
			},
		},
	},
});

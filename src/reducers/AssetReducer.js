import _ from 'lodash';
import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = new Map({
	history: new List([]),
});

export default createModule({
	name: 'contract',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
		set: {
			reducer: (state, { payload }) => {
				state = state.set(payload.field, payload.value);
				return state;
			},
		},
	},
});

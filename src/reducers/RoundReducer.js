import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	producers: 0,
	preparingBlock: 0,
	stepProgress: '',
	readyProducers: 0,
});

export default createModule({
	name: 'round',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
		set: {
			reducer: (state, { payload }) => {
				state = state.set(payload.field, payload.value);

				return state;
			},
		},
		increment: {
			reducer: (state, { payload }) => {
				let count = state.get(payload.field);
				state = state.set(payload.field, count += 1);

				return state;
			},
		},
	},
});

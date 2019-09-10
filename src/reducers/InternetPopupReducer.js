import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	timeoutId: null,
	show: false,
	connect: true,
});

export default createModule({
	name: 'internetPopup',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
		set: {
			reducer: (state, { payload }) => {
				state = state.set(payload.field, payload.value);

				return state;
			},
		},
		clearTimeout: {
			reducer: (state) => {
				clearTimeout(state.timeoutId);
				state = state.set('timeoutId', null);

				return state;
			},
		},
	},
});

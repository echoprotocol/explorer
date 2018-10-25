import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';

import { MODAL_CONFIRM } from '../constants/ModalConstants';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	show: false,
});

export default createModule({
	name: 'modal',
	initialState: Map({
		[MODAL_CONFIRM]: _.cloneDeep(DEFAULT_FIELDS).merge({
			title: null,
			content: null,
			btnTitleSuccess: null,
			btnTitleCancel: null,
			successCallback: () => {},
			cancelCallback: () => {},
		}),
		currentOpens: [],
	}),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
		setIn: {
			reducer: (state, { payload }) => {
				Object.keys(payload.params).forEach((field) => {
					state = state.setIn([payload.type, field], payload.params[field]);
				});

				return state;
			},
		},
		open: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.type, 'show'], true);
				const currentOpens = state.get('currentOpens');
				currentOpens.push(payload.type);
				state = state.set('currentOpens', currentOpens);
				return state;
			},
		},
		close: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.type, 'show'], false);
				const currentOpens = state.get('currentOpens');
				currentOpens.splice(currentOpens.length - 1, 1);
				state = state.set('currentOpens', currentOpens);
				return state;
			},
		},
	},
});

import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';

import {
	MODAL_EXTENSION_INFO,
	MODAL_SUCCESS,
	MODAL_ERROR,
	MODAL_INCENTIVES_INFO,
} from '../constants/ModalConstants';

import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	show: false,
});

const INITIAL_STATE = Map({
	[MODAL_SUCCESS]: _.cloneDeep(DEFAULT_FIELDS),
	[MODAL_ERROR]: _.cloneDeep(DEFAULT_FIELDS),
	[MODAL_EXTENSION_INFO]: _.cloneDeep(DEFAULT_FIELDS),
	[MODAL_INCENTIVES_INFO]: _.cloneDeep(DEFAULT_FIELDS),
});

export default createModule({
	name: 'modal',
	initialState: INITIAL_STATE,
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
				const { type, params } = payload;
				state = state.setIn([type, 'show'], true);
				Object.keys(params).forEach((key) => {
					state = state.setIn([type, key], params[key]);
				});
				return state;
			},
		},
		close: {
			reducer: (state) => {
				state = INITIAL_STATE;
				return state;
			},
		},
	},
});

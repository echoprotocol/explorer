import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';

import { FORM_CONTRACT_VERIFY, FORM_LOGIN, FORM_ABI, FORM_MANAGE_CONTRACT } from '../constants/FormConstants';

import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	error: null,
	loading: false,
});

const DEFAULT_FORM_FIELDS = {
	[FORM_LOGIN]: Map({
		login: {
			value: '',
			error: null,
		},
		password: {
			value: '',
			error: null,
		},
	}),
	[FORM_CONTRACT_VERIFY]: Map({
		code: '',
		currentCompiler: {
			value: '',
			error: null,
		},
		contractName: '',
		contractInputs: Map({}),
	}),
	[FORM_MANAGE_CONTRACT]: new Map({
		isChangedForm: false,
		isErrorForm: false,
		contractId: '',
		name: {
			value: '',
			error: '',
		},
		description: {
			value: '',
			error: '',
		},
		icon: {
			value: null,
			error: '',
		},
		iconBase64: {
			value: '',
		},
	}),
	[FORM_ABI]: Map({
		abi: {
			value: '',
			error: '',
		},
	}),
};

export default createModule({
	name: 'form',
	initialState: Map({
		[FORM_LOGIN]: _.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[FORM_LOGIN]),
		[FORM_CONTRACT_VERIFY]: _.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[FORM_CONTRACT_VERIFY]),
		[FORM_MANAGE_CONTRACT]: _.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[FORM_MANAGE_CONTRACT]),
		[FORM_ABI]: _.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[FORM_ABI]),
	}),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
		set: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.form, payload.field], payload.value);

				return state;
			},
		},

		setIn: {
			reducer: (state, { payload }) => {
				Object.keys(payload.params).forEach((field) => {
					state = state.setIn([payload.form, field], payload.params[field]);
				});

				return state;
			},
		},

		setFormValue: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.form, 'error'], null);

				const field = state.getIn([payload.form, payload.field]);

				state = state.setIn([payload.form, payload.field], Object.assign({}, field, {
					...field,
					value: payload.value,
					error: null,
				}));

				return state;
			},
		},

		setFormError: {
			reducer: (state, { payload }) => {
				if (payload.field === 'error') {
					state = state.setIn([payload.form, payload.field], payload.value);
				} else {
					const field = state.getIn([payload.form, payload.field]);

					state = state.setIn([payload.form, payload.field], Object.assign({}, field, {
						value: field.value,
						error: payload.value,
					}));
				}

				return state;
			},
		},

		setInFormValue: {
			reducer: (state, { payload }) => {
				const path = [payload.form].concat(payload.fields);

				const field = state.getIn(path) || {};

				state = state.setIn(path, Object.assign({}, field, {
					...field,
					value: payload.value,
					error: null,
				}));

				return state;
			},
		},

		setInFormError: {
			reducer: (state, { payload }) => {
				const path = [payload.form].concat(payload.fields);

				const field = state.getIn(path);

				state = state.setIn(path, Object.assign({}, field, {
					...field,
					error: payload.value,
				}));

				return state;
			},
		},

		toggleLoading: {
			reducer: (state, { payload }) => {
				if (payload.field) {
					if (typeof DEFAULT_FORM_FIELDS[payload.form].get(payload.field).loading === 'undefined') {
						return state;
					}
					const field = state.getIn([payload.form, payload.field]);
					state = state.setIn([payload.form, payload.field], Object.assign({}, field, {
						loading: !!payload.value,
					}));

				} else {
					state = state.setIn([payload.form, 'loading'], !!payload.value);
				}

				return state;
			},
		},

		setListValues: {
			reducer: (state, { payload }) => {
				if (!DEFAULT_FORM_FIELDS[payload.form].get(payload.field).listValues) {
					return state;
				}
				const field = state.getIn([payload.form, payload.field]);
				state = state.setIn([payload.form, payload.field], Object.assign({}, field, {
					listValues: payload.list,
				}));

				return state;
			},
		},

		setTimeoutField: {
			reducer: (state, { payload }) => {
				const field = state.getIn([payload.form, payload.field]);
				state = state.setIn([payload.form, payload.field], Object.assign({}, field, {
					timeoutId: payload.timeoutId,
				}));
				return state;
			},
		},

		clearForm: {
			reducer: (state, { payload }) => {
				state = state.set(payload.form, _.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[payload.form]));

				return state;
			},
		},

		clearByField: {
			reducer: (state, { payload }) => {
				state = state.setIn([payload.form, payload.field], _.cloneDeep(DEFAULT_FORM_FIELDS[payload.form].get(payload.field)));

				return state;
			},
		},

		setMultipleFormValue: {
			reducer: (state, { payload }) => {
				Object.entries(payload.fields).forEach(([key, value]) => {
					state = state.setIn([payload.form, key], {
						value,
						error: null,
					});
				});

				return state;
			},
		},
	},
});

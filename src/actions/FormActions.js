import FormReducer from '../reducers/FormReducer';
import BaseActionsClass from './BaseActionsClass';

class FormActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(FormReducer);
	}


	setValue(form, field, value) {
		return (dispatch) => {
			dispatch(this.reducer.actions.set({ form, field, value }));
		};
	}

	/**
	 * Set value by field for object {value, error}
	 * @param form
	 * @param field
	 * @param value
	 * @returns {Function}
	 */
	setFormValue(form, field, value) {
		return (dispatch) => {
			dispatch(this.reducer.actions.setFormValue({ form, field, value }));
		};
	}

	/**
	 * Set error by field form
	 * @param form
	 * @param field
	 * @param value
	 * @returns {Function}
	 */
	setFormError(form, field, value) {
		return (dispatch) => {
			dispatch(this.reducer.actions.setFormError({ form, field, value }));
		};
	}

	/**
	 * Toggle loading
	 * This function used for form and button loading.
	 * You can call this with 2 params(without loading for button loading)
	 * and with 3 params(for form loading).
	 * If you call without third param(loading), loading equals field,
	 * and field equals null(because field doesn't used
	 * in button reducer.
	 * @param {String} form
	 * @param {String|Boolean} field
	 * @param {Boolean} loading
	 */
	toggleLoading(form, field, loading) {
		return (dispatch) => {
			if (typeof loading === 'undefined') {
				loading = field;
				field = null;
			}
			dispatch(this.reducer.actions.toggleLoading({
				form,
				field,
				value: loading,
			}));
		};
	}

	/**
	 * Clear form
	 * @param {String} form
	 * @returns {Function}
	 */
	clearForm(form) {
		return (dispatch) => {
			dispatch(this.reducer.actions.clearForm({ form }));
		};
	}

	/**
	 * Clear by field
	 * @param {String} form
	 * @param {String} field
	 * @returns {Function}
	 */
	clearByField(form, field) {
		return (dispatch) => {
			dispatch(this.reducer.actions.clearByField({ form, field }));
		};
	}

}

const FormActions = new FormActionsClass();
export default FormActions;

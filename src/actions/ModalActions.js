import BaseActionsClass from './BaseActionsClass';
import ModalReducer from './../reducers/ModalReducer';

import { extendObjectKey } from '../helpers/FunctionHelper';

import { MODAL_CONFIRM } from '../constants/ModalConstants';

class ModalActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(ModalReducer);
	}

	/**
	 * Open modal
	 * @param {String} type
	 */
	openModal(type) {
		return (dispatch) => {
			dispatch(this.reducer.actions.open({ type }));
		};
	}

	/**
	 * Close modal
	 * @param {String} type
	 */
	closeModal(type) {
		return (dispatch) => {
			dispatch(this.reducer.actions.close({ type }));
		};
	}

	/**
	 * Open confirm modal
	 * @param {Object} params
	 * @param {String} params.title
	 * @param {String} params.description
	 * @param {String} params.btnTitleSuccess
	 * @param {String} params.btnTitleCancel
	 * @param {Function} params.successCallback
	 * @param {Function} params.cancelCallback
	 */
	confirmModal(params = {}) {
		return (dispatch) => {
			dispatch(this.openModal(MODAL_CONFIRM));
			const obj = {
				title: params.title,
				description: params.description,
				btnTitleSuccess: params.btnTitleSuccess,
				btnTitleCancel: params.btnTitleCancel,
				successCallback: params.successCallback || (() => {}),
				cancelCallback: params.cancelCallback || (() => {}),
			};
			dispatch(this.reducer.actions.setMultiple(extendObjectKey(MODAL_CONFIRM, obj)));
		};
	}

}

const ModalActions = new ModalActionsClass();
export default ModalActions;

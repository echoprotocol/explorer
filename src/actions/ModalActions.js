import ModalReducer from './../reducers/ModalReducer';
import BaseActionsClass from './BaseActionsClass';

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
	 * @param params
	 * @param {object} type
	 */
	openModal(type, params) {
		return (dispatch) => {
			dispatch(this.reducer.actions.open({ type, params }));
		};
	}

	/**
	 * Close modal
	 */
	closeModal() {
		return (dispatch) => {
			dispatch(this.reducer.actions.close());
		};
	}

}

const ModalActions = new ModalActionsClass();
export default ModalActions;

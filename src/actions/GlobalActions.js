import { MODAL_ERROR, MODAL_EXTENSION_INFO } from '../constants/ModalConstants';
import GlobalReducer from '../reducers/GlobalReducer';
import BaseActionsClass from './BaseActionsClass';
import ModalActions from './ModalActions';
import { BridgeService } from '../services/BridgeService';
import GridActions from './GridActions';
import { fullClientInit, partialClientConnect } from './SocketActions';

class GlobalActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GlobalReducer);
	}

	/**
	 *  Actions after init app
	 * @returns {function(*): *}
	 */
	afterInit() {
		return () => new Promise((resolve, reject) => {
			Promise.all([
				// Load data after start page
			]).then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	/**
	 * Init app
	 * @returns {function(*=): Promise<any>}
	 */
	init() {
		return (dispatch, getState) => new Promise((resolve) => {
			const connect = getState().global.get('connectedServer') ? partialClientConnect : fullClientInit;
			Promise.all([
				dispatch(connect()),
				dispatch(GridActions.initData()),
			]).then((data) => {
				dispatch(this.afterInit()).then(() => {
					resolve(data);
				});
			}).catch((error) => {
				resolve(error);
			});
		});
	}

	/**
	 * Set title browser tab
	 * @param title
	 * @returns {Function}
	 */
	setTitle(title) {
		return (dispatch) => {
			dispatch(this.setValue('title', title));
		};
	}

	/**
	 * Show not found screen
	 * @returns {function(*=): Promise<any>}
	 */
	toggleErrorPath(value) {
		return (dispatch) => {
			dispatch(this.setValue('errorPath', value));
		};
	}

	/**
	 * Show error screen
	 * @returns {function(*=): Promise<any>}
	 */
	toggleErrorScreen(value) {
		return (dispatch) => {
			dispatch(this.setValue('errorScreen', value));
		};
	}

	checkAccessToBridge() {
		return async (dispatch) => {
			if (!BridgeService.isExist()) {
				dispatch(ModalActions.openModal(MODAL_EXTENSION_INFO, {}));
				return false;
			}

			const access = await BridgeService.getAccess();

			if (!access) {
				dispatch(ModalActions.openModal(MODAL_ERROR, { title: 'No access' }));
				return false;
			}

			return true;
		};
	}

}

const GlobalActions = new GlobalActionsClass();
export default GlobalActions;

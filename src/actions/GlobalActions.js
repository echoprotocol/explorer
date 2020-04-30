import { MODAL_ERROR, MODAL_EXTENSION_INFO } from '../constants/ModalConstants';
import GlobalReducer from '../reducers/GlobalReducer';
import BaseActionsClass from './BaseActionsClass';
import ModalActions from './ModalActions';
import { BridgeService } from '../services/BridgeService';
import { fullClientInit, partialClientConnect } from './SocketActions';
import config from '../config/chain';

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
	 * @method incrementHistoryLength
	 * @return {function(...[*]=)}
	 */
	incrementHistoryLength() {
		return (dispatch, getState) => {
			dispatch(this.setValue('historyLength', getState().global.get('historyLength') + 1));
		};
	}

	/**
	 * @method updateHistoryPath
	 * @param {string} newPath
	 * @param {string} newRoute
	 * @return {function(...[*]=)}
	 */
	updateHistoryPath(newPath, newRoute) {
		return (dispatch) => {
			dispatch(this.setValue('history', { path: newPath, route: newRoute }));
		};
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
	 * Set network mode
	 * @returns {Function}
	 */
	setMode() {
		return (dispatch) => {
			dispatch(this.setValue('mode', config.MODE));
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

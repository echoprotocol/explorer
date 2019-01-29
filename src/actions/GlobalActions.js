import GlobalReducer from '../reducers/GlobalReducer';
import BaseActionsClass from './BaseActionsClass';
import { connect } from './SocketActions';

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
		return (dispatch) => new Promise((resolve) => {
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

	incrementHistoryLength() {
		return (dispatch, getState) => {
			dispatch(this.setValue('historyLength', getState().global.get('historyLength') + 1));
		};
	}

	setTitle(title) {
		return (dispatch) => {
			dispatch(this.setValue('title', title));
		};
	}

}

const GlobalActions = new GlobalActionsClass();
export default GlobalActions;

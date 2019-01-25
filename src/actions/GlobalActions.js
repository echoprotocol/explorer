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
		return (dispatch) => new Promise((resolve, reject) => {
			Promise.all([
				dispatch(connect()),
			]).then((data) => {
				dispatch(this.afterInit()).then(() => {
					resolve(data);
				});
			}).catch((error) => {
				console.error(error);
				reject(error);
			});
		});
	}

	incrementHistoryLength() {
		return (dispatch, getState) => {
			dispatch(this.setValue('historyLength', getState().global.get('historyLength') + 1));
		};
	}

}

const GlobalActions = new GlobalActionsClass();
export default GlobalActions;

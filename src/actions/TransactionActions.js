import echo from 'echojs-lib';

import TransactionReducer from '../reducers/TransactionReducer';
import BaseActionsClass from './BaseActionsClass';
import { connect } from './SocketActions';

class TransactionActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(TransactionReducer);
	}

	/**
	 * Init app
	 * @returns {function(*=): Promise<any>}
	 */
	init() {
		return (dispatch) => new Promise((resolve) => {
			Promise.all([
				dispatch(connect()),
				// Load data before start page
			]).then((data) => {
				dispatch(this.afterInit()).then(() => {
					resolve(data);
				});
			}).catch((error) => {
				resolve(error);
			});
		});
	}

	getTransaction(blockNumber, index) {
		return async (dispatch) => {
			const block = await echo.api.getBlock(blockNumber);

			if (!block || !block.transactions[index - 1]) {
				return;
			}

			dispatch(this.setValue('info', block));
		};
	}


}

export default new TransactionActionsClass();

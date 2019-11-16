import { getName } from 'country-list';

import NetworkReducer from './../reducers/NetworkReducer';
import BaseActionsClass from './BaseActionsClass';
import ApiService from '../services/ApiService';


class NetworkActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(NetworkReducer);
	}

	/**
	 * get peers
	 * @param {String} type
	 * @param params
	 * @param {object} type
	 */
	getPeers(connected) {
		return async (dispatch) => {

			const options = connected ? { connected: true } : {};

			const peers = await ApiService.getPeers(options);

			const value = peers
				.filter((p) => p)
				.map((p) => ({ ...p, country: getName(p.country) || p.country }))
				.reduce((acc, p) => {
					const key = `${p.ll[0]}${p.ll[1]}`;

					if (!acc[key]) {
						acc[key] = { ...p, node: 1 };
					} else {
						acc[key].node += 1;
					}

					return acc;
				}, {});

			dispatch(this.reducer.actions.set({ field: 'peers', value: Object.values(value), fromJS: false }));
		};
	}

}

const NetworkActions = new NetworkActionsClass();
export default NetworkActions;

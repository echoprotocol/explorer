/* eslint-disable no-underscore-dangle */
import { Echo } from 'echojs-lib';
import { batchActions } from 'redux-batched-actions';

import GlobalReducer from '../reducers/GlobalReducer';
import RoundReducer from '../reducers/RoundReducer';

import FormatHelper from '../helpers/FormatHelper';

import rounderSteps from '../constants/RoundConstants';

import { initBlocks, setLatestBlock } from './BlockActions';

const roundSubscribe = (notification) => (dispatch) => {
	const steps = Object.keys(rounderSteps);

	switch (notification[0].type) {
		case steps[0]:
			dispatch(setLatestBlock());

			dispatch(RoundReducer.actions.set({ field: 'readyProducers', value: 0 }));
			dispatch(batchActions([
				RoundReducer.actions.set({ field: 'preparingBlock', value: notification[0].round }),
				RoundReducer.actions.set({ field: 'stepProgress', value: notification[0].type }),
			]));
			break;
		case steps[1]:
			dispatch(RoundReducer.actions.increment({ field: 'readyProducers' }));
			break;
		case steps[2]:
		case steps[3]:
			dispatch(RoundReducer.actions.set({ field: 'stepProgress', value: notification[0].type }));
			break;
		default:
			return null;
	}

	return null;
};

export const connect = () => async (dispatch) => {
	try {
		const socket = new Echo();

		await socket.connect('ws://195.201.164.54:6311', {
			connectionTimeout: 5000,
			maxRetries: 5,
			pingTimeout: 3000,
			pingInterval: 3000,
			debug: false,
			apis: ['database', 'network_broadcast', 'history', 'registration', 'asset', 'login', 'network_node'],
		});

		await socket.subscriber.setEchorandSubscribe((result) => dispatch(roundSubscribe(result, socket)));

		const global = (await socket.api.wsApi.database.getGlobalProperties()).parameters.echorand_config;

		const producers = global._creator_count;

		dispatch(batchActions([
			GlobalReducer.actions.set({ field: 'connected', value: true }),
			RoundReducer.actions.set({ field: 'producers', value: producers }),
		]));

		dispatch(initBlocks(socket));

		return true;
	} catch (err) {
		dispatch(batchActions([
			GlobalReducer.actions.set({ field: 'error', value: FormatHelper.formatError(err) }),
			GlobalReducer.actions.set({ field: 'connected', value: false }),
		]));

		return false;
	}
};

export const disconnect = () => async (dispatch) => {
	const socket = new Echo();

	await socket.disconnect();

	dispatch(GlobalReducer.actions.set({ field: 'connected', value: false }));
};

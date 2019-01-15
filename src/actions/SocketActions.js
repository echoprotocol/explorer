/* eslint-disable no-underscore-dangle */
import echo from 'echojs-lib';
import { batchActions } from 'redux-batched-actions';

import config from '../config/chain';

import GlobalReducer from '../reducers/GlobalReducer';
import RoundReducer from '../reducers/RoundReducer';

import FormatHelper from '../helpers/FormatHelper';

import { BBA_STARTED, BLOCK_PRODUCED, GC_STARTED, ROUND_STARTED } from '../constants/RoundConstants';

import { initBlocks, setLatestBlock, updateAverageTransactions } from './BlockActions';

const roundSubscribe = (notification) => (dispatch) => {
	switch (notification[0].type) {
		case ROUND_STARTED:
			dispatch(setLatestBlock());
			dispatch(updateAverageTransactions());

			dispatch(batchActions([
				RoundReducer.actions.set({ field: 'readyProducers', value: 0 }),
				RoundReducer.actions.set({ field: 'preparingBlock', value: notification[0].round }),
				RoundReducer.actions.set({ field: 'stepProgress', value: notification[0].type }),
			]));
			break;
		case BLOCK_PRODUCED:
			dispatch(RoundReducer.actions.increment({ field: 'readyProducers' }));
			break;
		case GC_STARTED:
		case BBA_STARTED:
			dispatch(RoundReducer.actions.set({ field: 'stepProgress', value: notification[0].type }));
			break;
		default:
			return null;
	}

	return null;
};

export const connect = () => async (dispatch) => {
	try {
		await echo.connect(config.url, {
			connectionTimeout: 5000,
			maxRetries: 5,
			pingTimeout: 3000,
			pingInterval: 3000,
			debug: false,
			apis: ['database', 'network_broadcast', 'history', 'registration', 'asset', 'login', 'network_node'],
		});

		await dispatch(initBlocks());

		await echo.subscriber.setEchorandSubscribe((result) => dispatch(roundSubscribe(result)));

		const global = (await echo.api.wsApi.database.getGlobalProperties()).parameters.echorand_config;
		// const chainProps = await echo.api.getChainProperties();
		// const globalProps = await echo.api.getGlobalProperties();
		// const configProps = await echo.api.getConfig();
		// console.log(chainProps, globalProps, configProps);

		const producers = global._creator_count;

		dispatch(batchActions([
			GlobalReducer.actions.set({ field: 'connected', value: true }),
			RoundReducer.actions.set({ field: 'producers', value: producers }),
		]));

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
	await echo.disconnect();

	dispatch(GlobalReducer.actions.set({ field: 'connected', value: false }));
};

/* eslint-disable no-underscore-dangle */
import echo from 'echojs-lib';
import { batchActions } from 'redux-batched-actions';

import config from '../config/chain';

import GlobalReducer from '../reducers/GlobalReducer';
import InternetPopupReducer from '../reducers/InternetPopupReducer';
import RoundReducer from '../reducers/RoundReducer';

import FormatHelper from '../helpers/FormatHelper';

import { BBA_STARTED, BLOCK_PRODUCED, GC_STARTED, ROUND_STARTED, DONE } from '../constants/RoundConstants';
import { DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES } from '../constants/GlobalConstants';

import { initBlocks, setLatestBlock, updateAverageTransactions, updateBlockList } from './BlockActions';

/**
 * set connected parameter to true
 */
const onConnectSubscriber = () => (dispatch) => {

	const timeoutId = setTimeout(() => {
		dispatch(batchActions([
			InternetPopupReducer.actions.set({ field: 'show', value: false }),
			InternetPopupReducer.actions.clearTimeout(),
		]));
	}, 3000);

	dispatch(batchActions([
		InternetPopupReducer.actions.set({ field: 'timeoutId', value: timeoutId }),
		InternetPopupReducer.actions.set({ field: 'show', value: true }),
		InternetPopupReducer.actions.set({ field: 'connect', value: true }),
	]));
};

/**
 * set connected parameter to false
 */
const onDisconnectSubscriber = () => (dispatch) => {
	dispatch(batchActions([
		InternetPopupReducer.actions.clearTimeout(),
		InternetPopupReducer.actions.set({ field: 'connect', value: false }),
		InternetPopupReducer.actions.set({ field: 'show', value: true }),
	]));
};

/**
 *  @method roundSubscribe
 *
 * 	Call when trigger setEchorandSubscribe (round process notifications)
 *
 * 	@param {Object} notification
 */
const roundSubscribe = (notification) => (dispatch) => {
	switch (notification[0].type) {
		case ROUND_STARTED:
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

/**
 *  @method blockRelease
 *
 * 	Call when trigger setBlockApplySubscribe (release new block)
 */
const blockRelease = () => async (dispatch) => {
	const global = await echo.api.getObject(DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES, true);
	dispatch(setLatestBlock(global.head_block_number));
	dispatch(updateAverageTransactions());
	dispatch(updateBlockList(global.head_block_number));

	dispatch(RoundReducer.actions.set({ field: 'stepProgress', value: DONE }));
};

/**
 *  @method connect
 *
 * 	WS connect to blockchain and set subscribe callbacks
 */
export const connect = () => async (dispatch) => {
	try {
		await echo.connect(config.API_URL, {
			connectionTimeout: 5000,
			maxRetries: 1e10,
			pingTimeout: 3000,
			pingDelay: 5000,
			debug: false,
			apis: ['database', 'network_broadcast', 'history', 'registration', 'asset', 'login', 'network_node'],
		});

		await dispatch(initBlocks());

		await echo.subscriber.setEchorandSubscribe((result) => dispatch(roundSubscribe(result)));

		await echo.subscriber.setBlockApplySubscribe(() => dispatch(blockRelease()));

		echo.subscriber.setStatusSubscribe('connect', () => dispatch(onConnectSubscriber()));
		echo.subscriber.setStatusSubscribe('disconnect', () => dispatch(onDisconnectSubscriber()));

		const global = (await echo.api.wsApi.database.getGlobalProperties()).parameters.echorand_config;
		const producers = global._creator_count;
		dispatch(batchActions([
			GlobalReducer.actions.set({ field: 'connected', value: true }),
			RoundReducer.actions.set({ field: 'producers', value: producers }),
		]));
	} catch (err) {
		dispatch(batchActions([
			GlobalReducer.actions.set({ field: 'error', value: FormatHelper.formatError(err) }),
			GlobalReducer.actions.set({ field: 'connected', value: false }),
		]));

		throw err;
	}
};

/**
 *  @method disconnect
 *
 * 	Disconnect from web socket
 */
export const disconnect = () => async (dispatch) => {
	await echo.disconnect();
	dispatch(GlobalReducer.actions.set({ field: 'connected', value: false }));
};

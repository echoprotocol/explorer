/* eslint-disable no-underscore-dangle */
import echo from 'echojs-lib';
import { batchActions } from 'redux-batched-actions';
import Router from 'next/router';

import config from '../config/chain';

import GlobalReducer from '../reducers/GlobalReducer';
import InternetPopupReducer from '../reducers/InternetPopupReducer';
import RoundReducer from '../reducers/RoundReducer';

import FormatHelper from '../helpers/FormatHelper';

import {
	BBA_STARTED,
	BLOCK_PRODUCED,
	GC_STARTED,
	ROUND_STARTED,
	BLOCK_APPLIED_CALLBACK,
} from '../constants/RoundConstants';
import { DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES } from '../constants/GlobalConstants';

import { initBlocks, setLatestBlock, updateAverageTransactions, updateBlockList } from './BlockActions';
import { INDEX_PATH } from '../constants/RouterConstants';
import StatisticsActions from './StatisticsActions';
import { MONITORING_ASSETS } from '../constants/TotalSupplyConstants';

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
			dispatch(batchActions([
				RoundReducer.actions.increment({ field: 'readyProducers' }),
				RoundReducer.actions.set({ field: 'stepProgress', value: notification[0].type }),
			]));
			break;
		case GC_STARTED:
			dispatch(RoundReducer.actions.set({ field: 'stepProgress', value: notification[0].type }));
			break;
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
	await dispatch(updateBlockList(global.head_block_number));
	await dispatch(StatisticsActions.getAssetInformationByIds(MONITORING_ASSETS));
	dispatch(updateAverageTransactions());
	dispatch(RoundReducer.actions.set({ field: 'stepProgress', value: BLOCK_APPLIED_CALLBACK }));
	dispatch(RoundReducer.actions.set({ field: 'preparingBlock', value: global.head_block_number + 1 }));
};

/**
 * @method serverConnect
 *
 * Server WS init preload data
 */

export const serverConnect = () => async (dispatch) => {
	try {
		if (!echo.isConnected) {
			dispatch(GlobalReducer.actions.set({ field: 'connectedServer', value: false }));
			return;
		}

		const globalParams = (await echo.api.wsApi.database.getGlobalProperties()).parameters;
		const blockReward = globalParams.block_producer_reward_ratio;

		await dispatch(batchActions([
			RoundReducer.actions.set({ field: 'blockReward', value: blockReward }),
		]));

		await dispatch(StatisticsActions.getAssetInformationByIds(MONITORING_ASSETS));
		await dispatch(initBlocks());

		const global = globalParams.echorand_config;
		const producers = global._creator_count;
		dispatch(batchActions([
			RoundReducer.actions.set({ field: 'producers', value: producers }),
			GlobalReducer.actions.set({ field: 'connectedServer', value: true }),
		]));
	} catch (err) {
		dispatch(batchActions([
			GlobalReducer.actions.set({ field: 'error', value: FormatHelper.formatError(err) }),
			GlobalReducer.actions.set({ field: 'connected', value: false }),
		]));
	}

};

/**
 *  @method fullClientInit
 *
 * 	WS connect to blockchain and set subscribe callbacks
 */
export const fullClientInit = () => async (dispatch) => {
	try {
		await echo.connect(config.ECHO_NODE.API_URL, {
			connectionTimeout: config.ECHO_NODE.CONNECTION_TIMEOUT,
			maxRetries: config.ECHO_NODE.MAX_RETRIES,
			pingDelay: config.ECHO_NODE.PING_DELAY,
			debug: config.ECHO_NODE.DEBUG,
			apis: config.ECHO_NODE.APIS,
		});

		const globalParams = (await echo.api.wsApi.database.getGlobalProperties()).parameters;
		const blockReward = globalParams.block_producer_reward_ratio;

		await dispatch(batchActions([
			RoundReducer.actions.set({ field: 'blockReward', value: blockReward }),
		]));

		await dispatch(initBlocks());
		await dispatch(StatisticsActions.getAssetInformationByIds(MONITORING_ASSETS));
		await echo.subscriber.setEchorandSubscribe((result) => dispatch(roundSubscribe(result)));

		await echo.subscriber.setBlockApplySubscribe(() => dispatch(blockRelease()));

		echo.subscriber.setStatusSubscribe('connect', () => dispatch(onConnectSubscriber()));
		echo.subscriber.setStatusSubscribe('disconnect', () => dispatch(onDisconnectSubscriber()));

		dispatch(blockRelease());

		const global = globalParams.echorand_config;
		const producers = global._creator_count;

		dispatch(batchActions([
			GlobalReducer.actions.set({ field: 'connected', value: true }),
			RoundReducer.actions.set({ field: 'producers', value: producers }),
		]));
		Router.push(INDEX_PATH);
	} catch (err) {
		dispatch(batchActions([
			GlobalReducer.actions.set({ field: 'error', value: FormatHelper.formatError(err) }),
			GlobalReducer.actions.set({ field: 'connected', value: false }),
		]));

		throw err;
	}
};


/**
 *  @method partialClientConnect
 *
 * 	WS connect to blockchain and set subscribe callbacks
 */
export const partialClientConnect = () => async (dispatch) => {
	try {
		if (!echo.isConnected) {
			await echo.connect(config.ECHO_NODE.API_URL, {
				connectionTimeout: config.ECHO_NODE.CONNECTION_TIMEOUT,
				maxRetries: config.ECHO_NODE.MAX_RETRIES,
				pingDelay: config.ECHO_NODE.PING_DELAY,
				debug: config.ECHO_NODE.DEBUG,
				apis: config.ECHO_NODE.APIS,
			});
		}

		await echo.subscriber.setEchorandSubscribe((result) => dispatch(roundSubscribe(result)));
		await echo.subscriber.setBlockApplySubscribe(() => dispatch(blockRelease()));

		echo.subscriber.setStatusSubscribe('connect', () => dispatch(onConnectSubscriber()));
		echo.subscriber.setStatusSubscribe('disconnect', () => dispatch(onDisconnectSubscriber()));

		dispatch(blockRelease());

		dispatch(GlobalReducer.actions.set({ field: 'connected', value: true }));
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

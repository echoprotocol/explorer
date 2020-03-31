import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import echo, { echoReducer } from 'echojs-lib';

import reducers from './reducers';

export default function configureStore(preloadState) {
	const store = createStore(
		combineReducers({
			...reducers,
		}), preloadState,
		composeWithDevTools(applyMiddleware(thunk)),
	);
	echo.syncCacheWithStore(store);
	return store;
}

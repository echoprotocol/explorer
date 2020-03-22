import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { batchDispatchMiddleware } from 'redux-batched-actions';

import { echoReducer } from 'echojs-lib';

import reducers from './reducers';

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export default function configureStore(preloadedState = {}) {
	return createStore(
		combineReducers({
			...reducers,
			echoCache: echoReducer(),
		}), preloadedState,
		compose(
			applyMiddleware(thunk),
			applyMiddleware(batchDispatchMiddleware),
			IS_CLIENT && window.devToolsExtension ? window.devToolsExtension() : (f) => f,
		),
	);
}

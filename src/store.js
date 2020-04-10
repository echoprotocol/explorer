import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { batchDispatchMiddleware } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

export default function configureStore(preloadState) {
	return createStore(
		combineReducers({
			...reducers,
		}), preloadState,
		composeWithDevTools(compose(
			applyMiddleware(thunk),
			applyMiddleware(batchDispatchMiddleware),
		)),
	);
}

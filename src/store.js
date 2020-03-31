import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

export default function configureStore(preloadState) {
	return createStore(
		combineReducers({
			...reducers,
		}), preloadState,
		composeWithDevTools(applyMiddleware(thunk)),
	);
}

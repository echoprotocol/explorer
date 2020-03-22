import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import echo from 'echojs-lib';

import Routes from './routes';
import configureStore from './store';

import './assets/loader';
import './assets/favicon.ico';
import GlobalActions from './actions/GlobalActions';
import history from './history';

// const preloadedState = IS_CLIENT ?  window.__PRELOADED_STATE__ : {};
// delete window.__PRELOADED_STATE__;
const preloadedState = {};

// reproduce the store used to render the page on server
const store = configureStore(preloadedState);

if (IS_CLIENT) {
	history.listen(() => {
		store.dispatch(GlobalActions.incrementHistoryLength());
	});
}

echo.syncCacheWithStore(store);

ReactDOM.hydrate(
	<Provider store={store}>
		<Router history={history}>
			<div>{renderRoutes(Routes)}</div>
		</Router>
	</Provider>,
	document.getElementById('root'),
);

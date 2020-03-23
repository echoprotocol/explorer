import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import echo from 'echojs-lib';
import { deserialize } from 'json-immutable';

import Routes from './routes';
import configureStore from './store';

import './assets/loader';
import './assets/favicon.ico';
import GlobalActions from './actions/GlobalActions';
import history from './history';

const preloadedState = __IS_CLIENT__ ? window.__PRELOADED_STATE__ : null; // eslint-disable-line no-underscore-dangle
delete window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

// reproduce the store used to render the page on server
const store = configureStore(preloadedState && deserialize(preloadedState));

if (__IS_CLIENT__) {
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

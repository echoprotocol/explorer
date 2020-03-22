import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import echo from 'echojs-lib';

import Routes from './routes'; // Or wherever you keep your reducers
import configureStore from './store';

import './assets/loader';
import './assets/favicon.ico';
// import GlobalActions from './actions/GlobalActions';

// const preloadedState = IS_CLIENT ?  window.__PRELOADED_STATE__ : {};
// delete window.__PRELOADED_STATE__;
const preloadedState = {};

// reproduce the store used to render the page on server
const store = configureStore(preloadedState);

// history.listen(() => {
// 	store.dispatch(GlobalActions.incrementHistoryLength());
// });

echo.syncCacheWithStore(store);

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{renderRoutes(Routes)}</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

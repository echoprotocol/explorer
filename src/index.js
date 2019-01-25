import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import echo from 'echojs-lib';

import Routes from './routes'; // Or wherever you keep your reducers
import ErrorScreen from './components/ErrorScreen'; // Or wherever you keep your reducers

import './assets/loader';
import './assets/favicon.ico';
import GlobalActions from './actions/GlobalActions';

import FormatHelper from './helpers/FormatHelper';

// Create a history of your choosing (we're using a browser history in this case)
import history from './history';
import store from './store';

history.listen(() => {
	store.dispatch(GlobalActions.incrementHistoryLength());
});

store.dispatch(GlobalActions.init())
	.then(() => {
		echo.syncCacheWithStore(store);

		ReactDOM.render(
			<Provider store={store}>
				{/* ConnectedRouter will use the store from Provider automatically */}
				<ConnectedRouter history={history}>
					<Routes />
				</ConnectedRouter>
			</Provider>,
			document.getElementById('root'),
		);
	})
	.catch((error) => {
		ReactDOM.render(
			<ErrorScreen error={FormatHelper.formatError(error)} />,
			document.getElementById('root'),
		);
	});

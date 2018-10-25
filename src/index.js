import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from './routes'; // Or wherever you keep your reducers
import './assets/loader';
import GlobalActions from './actions/GlobalActions';

// Create a history of your choosing (we're using a browser history in this case)
import history from './history';
import store from './store';

store.dispatch(GlobalActions.init()).then(() => {
	// Now you can dispatch navigation actions from anywhere!
	// store.dispatch(push('/foo'))
	ReactDOM.render(
		<Provider store={store}>
			{/* ConnectedRouter will use the store from Provider automatically */}
			<ConnectedRouter history={history}>
				<Routes />
			</ConnectedRouter>
		</Provider>,
		document.getElementById('root'),
	);
});

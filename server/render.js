import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import MobileDetect from 'mobile-detect';

import Routes from '../src/routes';

import configureStore from '../src/store';
import GlobalActions from '../src/actions/GlobalActions';
import { INDEX_PATH } from '../src/constants/RouterConstants';

export default async function render(req) {
	const store = configureStore();

	try {
		const routes = matchRoutes(Routes, req.url);

		if (req.url !== INDEX_PATH) {
			await Routes[0].routes[0].loadData(store);
		}

		const promises = routes
			.filter(({ route }) => route.loadData)
			.map(({ route, match }) => route.loadData(store, match))
			.map((promise) => {
				if (promise) {
					return new Promise((resolve) => {
						promise.then(resolve).catch(resolve);
					});
				}
				return null;
			});

		await Promise.all(promises);
	} catch (err) {
		console.log('Error to load data in server', err);
	}

	const context = {};
	let content = '';

	const mobile = new MobileDetect(req.headers['user-agent']);
	store.dispatch(GlobalActions.setValue('isMobileDevice', !!mobile.mobile()));

	try {
		content = renderToString(<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<div>{renderRoutes(Routes)}</div>
			</StaticRouter>
		</Provider>);
	} catch (err) {
		console.log(`Error render server: ${err}`);
	}

	// Get a copy of store data to create the same store on client side
	const preloadedState = store.getState();

	return {
		content,
		preloadedState,
	};
}

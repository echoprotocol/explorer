import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import Routes from '../src/routes';

import configureStore from '../src/store';

export default async function render(url) {
	const store = configureStore();

	try {
		const routes = matchRoutes(Routes, url);
		const promises = routes
			.map(({ route }) => (route.loadData ? route.loadData(store) : null))
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

	try {
		content = renderToString(<Provider store={store}>
			<StaticRouter location={url} context={context}>
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

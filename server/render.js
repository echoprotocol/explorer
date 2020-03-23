import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import Routes from '../src/routes';

import configureStore from '../src/store';

export default function render(url) {
	const store = configureStore();

	// TODO in future  fix component to load start data not only when component did mount
	// const routes = matchRoutes(Routes, url);
	// const promises = routes
	// 	.map(({ route }) => {
	// 		return route.loadData ? route.loadData(store) : null;
	// 	});
	//
	// console.log('promises', promises);
	//
	// const result = await Promise.all(promises);
	// console.log('result', result);

	const context = {};
	let content = {};
	try {
		content = renderToString(
			<Provider store={store}>
				<StaticRouter location={url} context={context}>
					<div>{renderRoutes(Routes)}</div>
				</StaticRouter>
			</Provider>);
	} catch (err) {
		console.log(`Error render server: ${err}`);
	}

	// Get a copy of store data to create the same store on client side
	const preloadedState = store.getState();

	return { content, preloadedState };
}

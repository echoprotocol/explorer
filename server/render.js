import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import Routes from '../src/routes';

import configureStore from '../src/store';

export default async function render(url) {
	const store = configureStore();

	console.log('heheehe', url);
	// const routes = matchRoutes(Routes, url);
	//
	// console.log('Routes', routes);
	//
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

	const content = renderToString(<Provider store={store}>
		<StaticRouter location={url} context={context}>
			<div>{renderRoutes(Routes)}</div>
		</StaticRouter>
	</Provider>);

	// Get a copy of store data to create the same store on client side
	const preloadedState = store.getState();
	// console.log('after', content, preloadedState);

	return {
		content,
		preloadedState,
	};
}

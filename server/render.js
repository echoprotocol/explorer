import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import MobileDetect from 'mobile-detect';
import { parse } from 'url';
import echo from 'echojs-lib';

import Routes from '../src/routes';

import configureStore from '../src/store';
import GlobalActions from '../src/actions/GlobalActions';

export default async function render(req) {
	const store = configureStore();

	echo.syncCacheWithStore(store);

	try {
		const { pathname, query } = parse(req.url);

		const routes = matchRoutes(Routes, pathname);

		const promises = routes
			.filter(({ route }) => route.loadData)
			.map(({ route, match }) => route.loadData(store, {
				query,
				url: req.url,
				params: match.params,
			}))
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

	let content = '';

	const mobile = new MobileDetect(req.headers['user-agent']);
	store.dispatch(GlobalActions.setValue('isMobileDevice', !!mobile.mobile()));

	try {
		content = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url}>
					<div>{renderRoutes(Routes)}</div>
				</StaticRouter>
			</Provider>
		);
	} catch (err) {
		console.log(`Error render server: ${err}`);
	}

	const preloadedState = store.getState();

	return {
		content,
		preloadedState,
	};
}

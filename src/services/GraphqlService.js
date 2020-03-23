
import fetch from 'cross-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { MAX_RETRIES } from '../constants/GlobalConstants';
import { OPERATION_DEFINITION, SUBSCRIPTION } from '../constants/GraphqlConstans';
import config from '../config/chain';

let URL = null;
let ws = null;

if (__IS_SERVER__) {
	/* eslint-disable global-require */
	({ URL } = require('url'));
	ws = require('ws');
	/* eslint-enable global-require */
}

const cache = new InMemoryCache({
	dataIdFromObject: (o) => (o._id ? `${o.__typename}:${o._id}` : null), // eslint-disable-line no-underscore-dangle
});

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'network-only',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'network-only',
		errorPolicy: 'all',
	},
};

class Graphql {

	constructor() {
		const httpLink = new HttpLink({
			uri: config.GRAPHQL_URL.HTTP,
			fetch,
		});

		let wsLink = null;

		if (!__IS_SERVER__) {
			wsLink = new WebSocketLink({
				uri: config.GRAPHQL_URL.WS,
				options: {
					reconnect: true,
					reconnectionAttempts: MAX_RETRIES,
				},
			});
		} else {
			const url2 = new URL('wss://645-echodb.pixelplex-test.by/graphql');
			url2.protocol = 'wss';
			url2.host = '645-echodb.pixelplex-test.by';
			url2.pathname = 'graphql';
			const client = new SubscriptionClient(url2, {
				reconnect: true,
				reconnectionAttempts: MAX_RETRIES,
			}, ws);
			wsLink = new WebSocketLink(client);
		}

		const link = split(
			({ query }) => {
				const { kind, operation } = getMainDefinition(query);
				return (
					kind === OPERATION_DEFINITION && operation === SUBSCRIPTION
				);
			},
			wsLink,
			httpLink,
		);

		this.client = new ApolloClient({ cache, link, defaultOptions });
	}

	getClient() {
		return this.client;
	}

}


export default new Graphql();

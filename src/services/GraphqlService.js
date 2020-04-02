import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { MAX_RETRIES } from '../constants/GlobalConstants';
import { OPERATION_DEFINITION, SUBSCRIPTION } from '../constants/GraphqlConstans';
import config from '../config/chain';

require('es6-promise').polyfill();
require('isomorphic-fetch');

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

class GraphqlBrowser {

	constructor() {
		const httpLink = new HttpLink({
			uri: config.GRAPHQL_URL.HTTP,
		});

		const wsLink = new WebSocketLink({
			uri: config.GRAPHQL_URL.WS,
			options: {
				reconnect: true,
				reconnectionAttempts: MAX_RETRIES,
			},
		});

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

class GraphqlNode {

	constructor() {
		const httpLink = new HttpLink({
			uri: config.GRAPHQL_URL.HTTP,
		});

		this.client = new ApolloClient({ cache, link: httpLink, defaultOptions });
	}

	getClient() {
		return this.client;
	}

}

const client = typeof window !== 'undefined' ? new GraphqlBrowser() : new GraphqlNode();

export default client;

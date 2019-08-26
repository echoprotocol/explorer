import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getAssetsBySymbols = (count, ...symbols) => {
	const query = gql`
		query getAssets($count: Int, $symbols: [String!]) {
			getAssets(count: $count, symbols: $symbols) {
				items {
					id
          		}
			}
		}
	`;

	return client.getClient().query({ query, variables: { count, symbols } }).then(({ data }) => data.getAssets);
};

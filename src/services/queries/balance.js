import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getBalances = async (accounts) => {
	const query = gql`
		query getBalances($accounts: [AccountId!]!) {
			getBalances(accounts: $accounts) {
				type
				amount
				account {
					id
				}
				contract {
					id
					type
					token {
						symbol
						decimals
					}
				}
			}
		}
	`;

	return client.getClient().query({ query, variables: { accounts } });
};

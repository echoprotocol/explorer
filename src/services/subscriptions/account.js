import gql from 'graphql-tag';
import client from '../GraphqlService';

/**
 *
 * @param accounts
 * @returns {Promise<*>}
 */
export const subscribeAccountHistoryUpdate = async (accounts) => {
	const query = gql`
		subscription($accounts: [AccountId!]!) {
			newOperation(accounts: $accounts) {
				id
			}
		}
	`;

	return client.getClient().subscribe({ query, variables: { accounts } });
};

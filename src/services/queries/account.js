import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getTotalAccountHistory = (accountId) => {
	const query = gql`
		query getHistory($accountId: AccountId!) {
			getHistory(accounts: [$accountId]) {
				total
			}
		}
	`;

	return client.getClient().query({ query, variables: { accountId } }).then(({ data }) => data.getHistory);
};

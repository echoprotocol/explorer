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

export const getCommitteAccounts = ({ status, offset, count }) => {
	const query = gql`
		query getCommitteeAccounts($status: String, $offset: Int, $count: Int) {
			getCommitteeAccounts(status: $status, offset: $offset, count: $count) {
				total
				items {
				  id
				  name
				  committee_options {
					status
					eth_address
					btc_public_key
					committee_member_id
					proposal_operation
					approves_count
					last_executed_operation
					last_executed_operation_id
					last_status_change_time
				  }
				}
			}
		}
	`;

	return client.getClient().query({ query, variables: { status, offset, count } }).then(({ data }) => data.getCommitteeAccounts);
};

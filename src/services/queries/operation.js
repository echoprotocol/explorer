import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getOperationCountHistory = async (from, to, interval) => {
	const query = gql`
		query getOperationCountHistory($from: String!, $to: String!, $interval: Int!) {
			getOperationCountHistory(from: $from, to: $to, interval: $interval) {
                ratesMap {
                    startIntervalDateString
                    rate
                }
                total
			}
		}
	`;
	return client.getClient().query({ query, variables: { from, to, interval } }).then(({ data }) => data.getOperationCountHistory);
};

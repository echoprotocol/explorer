import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getDelegationRates = async (from, interval) => {
	const query = gql`
    query getDelegationPercent($from: String, $interval: Int){
      getDelegationPercent(from: $from, interval: $interval){
        delegatePercent,
        ratesMap {
          rate
        }
      }
    }
  `;
	return client.getClient().query({ query, variables: { from, interval } });
};

export const getBlock = async (round) => {
	const query = gql`
		query getBlock($round: Int!) {
			getBlock(round: $round) {
        average_block_time
        round
			}
		}
	`;
	return client.getClient().query({ query, variables: { round } }).then(({ data }) => data.getBlock);
};


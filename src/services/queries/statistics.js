import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getStatistics = async (from, interval, round) => {
	const query = gql`
    query getStatistics($from: String, $interval: Int, $round: Int!){
      getDelegationPercent(from: $from, interval: $interval){
        delegatePercent,
        ratesMap {
          rate
        }
      }
      getDecentralizationRate(from: $from, interval: $interval){
        decentralizationRatePercent,
        ratesMap {
          rate
        }
      } 
      getOperationCountHistory(from: $from, interval: $interval) {
        total,
        ratesMap {
          rate
        }
      }
      getBlock(round: $round) {
        average_block_time,
        round
			}
    }
  `;
	return client.getClient().query({ query, variables: { from, interval, round } });
};

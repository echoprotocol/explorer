import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getStatistics = async (from, interval) => {
	const query = gql`
    query getStatistics($from: String, $interval: Int){
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
    }
  `;
	return client.getClient().query({ query, variables: { from, interval } });
};

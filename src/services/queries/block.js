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

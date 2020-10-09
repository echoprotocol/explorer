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
      getOperationCountHistory(from: $from, interval: $interval) {
        total,
        ratesMap {
          rate
        }
      }
  		getFrozenBalancesData(from: $from, interval: $interval){
   			frozenData {
      		frozenSums {
        		accounts_freeze_sum,
     				committee_freeze_sum
      		}
    		}
    		currentFrozenData {
    			accounts_freeze_sum,
      		committee_freeze_sum
    		}
			}
		}
  `;
	return client.getClient().query({ query, variables: { from, interval } });
};

export const getReducedStatistics = async (from, interval) => {
	const query = gql`
    query getStatistics($from: String, $interval: Int){
      getOperationCountHistory(from: $from, interval: $interval) {
        total,
        ratesMap {
          rate
        }
      }
  		getFrozenBalancesData(from: $from, interval: $interval){
   			frozenData {
      		frozenSums {
        		accounts_freeze_sum,
     				committee_freeze_sum
      		}
    		}
    		currentFrozenData {
    			accounts_freeze_sum,
      		committee_freeze_sum
    		}
			}
		}
  `;
	return client.getClient().query({ query, variables: { from, interval } });
};

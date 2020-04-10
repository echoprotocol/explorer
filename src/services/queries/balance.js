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

export const getCurrentFrozenFunds = async (from, interval) => {
	const query = gql`
    query getFrozenBalancesData($from: String, $interval: Int){
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

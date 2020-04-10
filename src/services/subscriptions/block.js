import gql from 'graphql-tag';
import client from '../GraphqlService';

/**
 *
 * @param contracts
 * @returns {Promise<*>}
 */
export const subscribeNewBlock = async () => {
	const query = gql`
		subscription {
			newBlock {
				frozen_balances_data {
    			accounts_freeze_sum,
      		committee_freeze_sum
    		}
			}
		}
	`;

	return client.getClient().subscribe({ query });
};

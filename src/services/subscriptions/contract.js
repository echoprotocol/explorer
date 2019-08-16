import gql from 'graphql-tag';
import client from '../GraphqlService';

/**
 *
 * @param contracts
 * @returns {Promise<*>}
 */
export const subscribeContractHistoryUpdate = async (...contracts) => {
	const query = gql`
		subscription($contracts: [ContractId!]!) {
			contractHistoryUpdated(contracts: $contracts) {
				calling_accounts {
          			id
        		}
			}
		}
	`;

	return client.getClient().subscribe({ query, variables: { contracts } });
};

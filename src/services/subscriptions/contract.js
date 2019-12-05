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
				callers { accounts { id } }
			}
		}
	`;

	return client.getClient().subscribe({ query, variables: { contracts } });
};

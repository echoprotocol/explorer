import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getContractInfo = async (contractId) => {
	const query = gql`
		query getContract($contractId: ContractId!) {
			getContract(id: $contractId) {
				id,
				registrar {
					name 
				}
				block {
          			round
          			timestamp
		        }
		        calling_accounts {
          			id
        		}
        		type,
        		supported_asset_id
        		eth_accuracy
			}
			getHistory(contracts: [$contractId], operations:[CONTRACT_CREATE]) {
				items {
					body
				}
			}
		}
	`;

	return client.getClient().query({ query, variables: { contractId } })
		.then(({ data }) => ({
			history: data.getHistory,
			contractInfo: data.getContract,
		}));
};


export const getTotalHistory = async (contracts) => {
	const query = gql`
		query getHistory($contracts: [ContractId!]) {
			getHistory(contracts: $contracts) {
				total
			}
		}
	`;

	return client.getClient().query({ query, variables: { contracts } }).then(({ data }) => data.getHistory);
};

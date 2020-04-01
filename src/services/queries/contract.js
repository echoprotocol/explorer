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
		        callers { accounts { id } }
        		type,
        		supported_asset_id
        		eth_accuracy
        		token {
        			name,
					symbol,
					type,
					decimals,
					total_supply
        		}
			}
			getHistory(contracts: [$contractId], operations:[CONTRACT_CREATE]) {
				items {
					body
				}
			}
			getTransferHistory(contracts: [$contractId]) {
				total
			}
		}
	`;

	return client.getClient().query({ query, variables: { contractId } })
		.then(({ data }) => ({
			history: data.getHistory,
			contractInfo: data.getContract,
			transferHistory: data.getTransferHistory,
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

export const getToken = async (id) => {
	const query = gql`
		query getContract($id: ContractId!) {
			getContract(id: $id) {
				type
				token {
					symbol
				}
			}
		}
	`;
	return client.getClient().query({ query, variables: { id } }).then(({ data }) => data.getContract);
};

export const getContractBySymbol = (name, count) => {
	const query = gql`
		query getTokens($count: Int, $name: String) {
			getTokens(count: $count, name: $name, symbol: $name) {
				items {
					symbol
					contract {
            			id
          			}
          		}
			}
		}
	`;
	return client.getClient().query({ query, variables: { count, name } }).then(({ data }) => data.getTokens);
};

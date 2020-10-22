import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getContractInfo = async ({
	id,
}) => {
	const query = gql`
		query getContract($id: ContractId!) {
			getContract(id: $id) {
				id,
				registrar {
					name
				}
				block {
					round
					timestamp
				}
				callers {
					accounts {
						id
					}
				}
				type,
				supported_asset_id
				eth_accuracy
				token {
					name,
					symbol,
					type,
					decimals,
					total_supply,
					holders_count
				},
			}
		}
	`;

	return client.getClient().query({
		query,
		variables: {
			id,
		},
	}).then(({ data }) => ({
		contractInfo: data.getContract,
	}));
};

export const getContractHistoryAndTransfers = async ({
	id, offset, count, to, from,
}) => {
	const query = gql`
		query getContract($id: ContractId!, $from: [AccountOrContractId!], $to: [AccountOrContractId!], $offset: Int, $count: Int) {
			getHistory(contracts: [$id], operations:[CONTRACT_CREATE]) {
				items {
					body
				}
			}
			getTransferHistory(contracts: [$id], from: $from, to: $to, offset: $offset, count: $count) {
				total
				items {
					block,
					timestamp,
					trx_in_block,
          			op_in_trx,
					from {
						name
					},
					to {
						name
					},
					amount
				}
			}
		}
	`;

	return client.getClient().query({
		query,
		variables: {
			id, offset, count, to, from,
		},
	}).then(({ data }) => ({
		history: data.getHistory,
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

export const getERC20Info = async (contractId, count, offset) => {
	const query = gql`
		query getTransferHistory($id: ContractId!, offset: Int, count: Int){
			getTransferHistory(contracts: [$contractId!], count: $count, offset: $offset) {
				total,
				items {
					block,
					timestamp
					from{
						name
					},
					to{
						name
					},
					amount
				}
			}
			getContract(id: $id) {
				type
				token {
					symbol,
          total_supply,
          decimals,
          name,
          holders_count
        },
			}
		}
	`;
	return client.getClient().query({ query, variables: { contractId, count, offset } })
		.then(({ data }) => ({
			transfers: data.getTransferHistory,
			token: data.getContract,
		}));
};

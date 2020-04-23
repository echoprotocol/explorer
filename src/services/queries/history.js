import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getHistory = async ({
	subject, offset, count, operations, toFilter, fromFilter,
}) => {
	const query = gql`
		query getSubjectOperations($subject: AccountOrContractOrAssetId!, $fromFilter: AccountOrContractOrAssetOrProposalId, $toFilter: AccountOrContractOrAssetOrProposalId, $offset: Int, $count: Int, $operations: [OperationIdEnum!]) {
			getSubjectOperations(subject: $subject, fromFilter: $fromFilter, toFilter: $toFilter, offset: $offset, count: $count, operations: $operations) {
			 	total
				items {
					id
					body
					result
					virtual
					trx_in_block
    				op_in_trx
					block {
						round
					}
					transaction {
						ref_block_num
						block {
							round
						}
					}
				}
			}
		}
	`;

	return client.getClient().query({
		query,
		variables: {
			subject, offset, count, operations, toFilter, fromFilter,
		},
	}).then(({ data }) => data.getSubjectOperations);
};

export const getLatestOperationsFromGQL = async () => {
	const query = gql`
	query getHistory{
		getHistory(count: 11, offset: 0){
			items {
				id
				body
				result
				virtual
				trx_in_block
				op_in_trx
				block {
					round
				}
				transaction {
					ref_block_num
						block {
							round
						}
					}
				}
			}
		}
	`;
	return client.getClient().query({ query });
};

export const getConrtactOperations = async (contractId) => {
	const query = gql`
	query getHistory($contractId: ContractId!){
		getHistory(contracts: [$contractId]){
			items {
				id
				body
				result
				virtual
				trx_in_block
				op_in_trx
				block {
					round
				}
				transaction {
					ref_block_num
						block {
							round
						}
					}
				}
			}
		}
	`;
	return client.getClient().query({ query, variables: { contractId } })
		.then(({ data }) => ({
			history: data.getHistory,
		}));
};

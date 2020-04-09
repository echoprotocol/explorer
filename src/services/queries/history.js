import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getHistory = async ({
	subject, offset, count, operations, relationSubjects,
}) => {
	const query = gql`
		query getSubjectOperations($subject: AccountOrContractOrAssetId!, $relationSubjects: [AccountOrContractOrAssetOrProposalId!], $offset: Int, $count: Int, $operations: [OperationIdEnum!]) {
			getSubjectOperations(subject: $subject, relationSubjects: $relationSubjects, offset: $offset, count: $count, operations: $operations) {
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
			subject, offset, count, operations, relationSubjects,
		},
	}).then(({ data }) => data.getSubjectOperations);
};


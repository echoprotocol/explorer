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


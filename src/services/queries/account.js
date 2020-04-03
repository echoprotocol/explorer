import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getAccountHistory = async ({
	from, to, offset, count, operations,
}) => {
	const query = gql`
		query getHistory($from: [AccountId!], $to: [AccountId!], $offset: Int, $count: Int, $operations: [OperationIdEnum!]) {
			getHistory(from: $from, to: $to, offset: $offset, count: $count, operations: $operations) {
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
			from, to, offset, count, operations,
		},
	}).then(({ data }) => data.getHistory);
};

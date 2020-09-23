import gql from 'graphql-tag';
import client from '../GraphqlService';

/**
 *
 * @param contracts
 * @returns {Promise<*>}
 */
export const getBlockFromGraphQl = async (round) => {
	const query = gql`
		query getBlock($round: Int!)  {
			getBlock(round: $round) {
				round,
				decentralization_rate,
				average_block_time,
				block_reward,
				frozen_balances_data {
    			accounts_freeze_sum,
      		committee_freeze_sum
    		}
			}
		}
	`;

	return client.getClient().query({ query, variables: { round } });
};

export const getBlockReward = async (offset, count) => {
	const query = gql`
		query getBlockReward($count: Int, $offset: Int)  {
			getBlocks(count: $count, offset: $offset) {
				items {
					round,
    			block_reward,
  			}
			}
		}
	`;

	return client.getClient().query({ query, variables: { offset, count } });
};

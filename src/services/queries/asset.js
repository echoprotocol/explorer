import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getAssetsBySymbols = (count, ...symbols) => {
	const query = gql`
		query getAssets($count: Int, $symbols: [String!]) {
			getAssets(count: $count, symbols: $symbols) {
				items {
					id
          		}
			}
		}
	`;

	return client.getClient().query({ query, variables: { count, symbols } }).then(({ data }) => data.getAssets);
};

export const getAssetHistory = ({
	id, offset, count, to, from,
}) => {
	const query = gql`
		query getTransferHistory($id: [AssetId!], $from: [AccountOrContractId!], $to: [AccountOrContractId!], $offset: Int, $count: Int) {
			getTransferHistory(assets: $id, from: $from, to: $to, offset: $offset, count: $count) {
				total
				items {
					block,
          operationId
					trx_in_block,
					op_in_trx,
          from {
						id,
            name
          },
          to {
						id,
            name
      		}
          amount,
          asset {
            id
          },
          fee {
						amount,
            asset_id
          }
				}
			}
		}
	`;

	return client.getClient().query({
		query,
		variables: {
			id, offset, count, to, from,
		},
	}).then(({ data }) => data.getTransferHistory);
};

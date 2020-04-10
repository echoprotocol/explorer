import gql from 'graphql-tag';
import client from '../GraphqlService';

/**
 *
 * @param assets
 * @returns {Promise<*>}
 */
export const subscribeAssetUpdate = async (assets) => {
	const query = gql`
		subscription($assets: [AssetId!]) {
			assetUpdated(assets: $assets) {
				id
				symbol
				dynamic {
					current_supply
				}
			}
		}
	`;

	return client.getClient().subscribe({ query, variables: { assets } });
};

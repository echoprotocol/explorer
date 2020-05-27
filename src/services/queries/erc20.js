import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getTokenByETHAddress = (ethAddress) => {
	const query = gql`
		query getTokenByETHAddress($ethAddress: String!) {
			getTokenByETHAddress(ethAddress: $ethAddress){
		    id,
        name,
        contract {
          id
        },
        symbol,
        decimals,
      }
		}
	`;

	return client.getClient().query({ query, variables: { ethAddress } }).then(({ data }) => data.getTokenByETHAddress);
};

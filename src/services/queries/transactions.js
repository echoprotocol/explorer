import gql from 'graphql-tag';
import client from '../GraphqlService';

export const getTransactionByHex = (trxHex) => {
	const query = gql`
		query getTransactionByHex($trx_hex: String!) {
			getTransactionByHex(trx_hex: $trx_hex) {
				block {
          round
        }
        trx_index
			}
		}
	`;

	return client.getClient().query({ query, variables: { trx_hex: trxHex } }).then(({ data }) => data.getTransactionByHex);
};

export const getTransactionHexByBlockAndPosition = (block, trxInBlock) => {
	const query = gql`
		query getTransactionByBlockAndPosition($block: Int!, $trxInBlock: Int!) {
			getTransactionByBlockAndPosition(block: $block, trxInBlock: $trxInBlock) {
        trx_hex
			}
		}
	`;

	return client.getClient().query({ query, variables: { block, trxInBlock } }).then(({ data }) => data.getTransactionByBlockAndPosition);
};

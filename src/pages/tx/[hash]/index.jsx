import { getTransactionByHex } from '../../../services/queries/transactions';
import URLHelper from '../../../helpers/URLHelper';

const TrxPage = () => null;

TrxPage.getInitialProps = async ({ query, res }) => {
	let url;
	try {
		const trxObject = await getTransactionByHex(query.hash);
		if (!trxObject) {
			return;
		}
		if (query.op && query.virtual) {
			const isVirtual = query.virtual === 'true';
			url = URLHelper.createTransactionOperationUrl(URLHelper.createTransactionUrl(trxObject.block.round, trxObject.trx_index + 1), query.op, isVirtual);
		} else {
			url = URLHelper.createTransactionUrl(trxObject.block.round, trxObject.trx_index + 1, false);
		}
		if (res) {
			res.writeHead(301, { Location: url });
			res.end();
		}
	} catch (e) { /* Ignore */ }
};

export default TrxPage;

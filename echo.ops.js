const { default: echo, PrivateKey, constants } = require('echojs-lib');
const config = require('config');

const accountId = '1.2.38';
const privateKey = PrivateKey.fromWif('5KEg4pQVhQGAPWfuZvVKas1pGoMp7Leh4LhbjSoFf5RgXNmBz1e');
const url = config.API_URL;
const assetId = '1.3.8';

echo.connect(url, { connectionTimeout: 30000 }).then(async () => {
	const tx = echo.createTransaction();
	const options = {
		from: accountId,
		to: '1.2.37',
		amount: {
			asset_id: assetId,
			amount: 3,
		},
		extensions: [],
	};
	tx.addOperation(constants.OPERATIONS_IDS.TRANSFER, options);
	tx.addSigner(privateKey);
	await tx.sign();
	await tx.broadcast();
	console.log('it is okay');
}).catch((e) => console.log(JSON.stringify(e, null, 10)));

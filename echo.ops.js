const { echo } = require('echojs-lib/dist/echo');
const { PrivateKey, constants } = require('echojs-lib');
const config = require('config');

const accountId = '1.2.38';
const privateKey = PrivateKey.fromWif('5KEg4pQVhQGAPWfuZvVKas1pGoMp7Leh4LhbjSoFf5RgXNmBz1e');
const url = config.ECHO_NODE.API_URL;
const assetId = '1.3.8';

(async () => {
	try {
		await echo.connect(url, {
			connectionTimeout: 30000,
			maxRetries: 1e10,
			pingTimeout: 6000,
			pingDelay: 5000,
			debug: false,
			apis: ['database', 'network_broadcast', 'history', 'registration', 'asset', 'login', 'network_node', 'echorand'],
		});
		// const acc = '1.2.43';
		// const vestingBalance = '1.7.0';
		// const [account] = await echo.api.getFullAccounts([acc]);
		//
		//
		// console.log('account', await echo.api.getAccountBalances(acc));

		// const vestingBalance = await echo.api.getVestingBalances();
		const vestedBalance = await echo.api.getObjects(['1.8.0']);
		console.log('vestedBalance', vestedBalance);

		// const tx = echo.createTransaction();
		// const options = {
		// 	owner: accountId,
		// 	creator: accountId,
		// 	amount: {
		// 		asset_id: '1.3.0',
		// 		amount: 5,
		// 	},
		// 	policy: [
		// 		{
		// 			begin_timestamp: '1970-01-01T00:00:00',
		// 			vesting_cliff_seconds: 1000,
		// 			vesting_duration_seconds: 1000,
		// 		},
		// 	],
		// };
		// tx.addOperation(constants.OPERATIONS_IDS.VESTING_BALANCE_CREATE, options);
		// tx.addSigner(privateKey);
		// await tx.sign();
		// await tx.broadcast();
	} catch (err) {
		console.log(console.log('hohooh'), err);
	}
	console.log('it is okay');
})();


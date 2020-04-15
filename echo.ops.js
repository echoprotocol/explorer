const { default: echo, PrivateKey, constants } = require('echojs-lib');
const config = require('config');

const accountId = '1.2.38';
const privateKey = PrivateKey.fromWif('5KEg4pQVhQGAPWfuZvVKas1pGoMp7Leh4LhbjSoFf5RgXNmBz1e');
const privateKe2 = PrivateKey.fromWif('5JrLH1GG4ZBK3z7KsJgnwyHvGVHvGv4eUZWqiEgZuTuiUYZiB8C');
const url = config.API_URL;
const assetId = '1.3.8';

echo.connect(url, { connectionTimeout: 30000 }).then(async () => {
	const tx = echo.createTransaction();
	const options = {
		issuer: accountId,
		symbol: 'PASSET',
		precision: 1,
		bitasset_opts: {
			feed_lifetime_sec: 1,
			minimum_feeds: 1,
			short_backing_asset: '1.3.0',
		},
		common_options: {
			max_supply: '1000000000000000',
			issuer_permissions: 1,
			flags: 2,
			core_exchange_rate: {
				base: {
					amount: 1000,
					asset_id: '1.3.0',
				},
				quote: {
					amount: 1,
					asset_id: '1.3.1',
				},
			},
			whitelist_authorities: [],
			blacklist_authorities: [],
			description: '',
			extensions: [],
		},
	};
	tx.addOperation(constants.OPERATIONS_IDS.ASSET_CREATE, options);
	tx.addSigner(privateKey);
	await tx.sign();
	await tx.broadcast();
	console.log('it is okay');
}).catch((e) => console.log(JSON.stringify(e, null, 10)));

/*

* */

/*
	tx.addOperation(constants.OPERATIONS_IDS.ACCOUNT_WHITELIST, options);
		authorizing_account: accountId,
		account_to_list: '1.2.37',
		new_listing: 1,
		extensions: [],
*/

/*
		tx.addOperation(constants.OPERATIONS_IDS.ASSET_ISSUE, options);
		asset_to_issue: { asset_id: assetId, amount: 1e5 },
		extensions: [],
		fee: { asset_id: assetId },
		issue_to_account: accountId,
		issuer: accountId,
* */

/*
	tx.addOperation(constants.OPERATIONS_IDS.OVERRIDE_TRANSFER, options);
	from: '1.2.85',
	issuer: accountId,
	to: '1.2.37',
	amount: {
		asset_id: assetId,
		amount: 3,
	},
	extensions: [],
 */

/*
* */

/*
		tx.addOperation(constants.OPERATIONS_IDS.ASSET_CREATE, options);
		issuer: accountId,
		symbol: 'ALINA',
		precision: 1,
		common_options: {
			max_supply: '1000000000000000',
			issuer_permissions: 0,
			flags: 2,
			core_exchange_rate: {
				base: {
					amount: 1000,
					asset_id: '1.3.0',
				},
				quote: {
					amount: 1,
					asset_id: '1.3.1',
				},
			},
			whitelist_authorities: [],
			blacklist_authorities: [],
			description: '',
			extensions: [],
		},
*/

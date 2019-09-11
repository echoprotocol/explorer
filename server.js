const express = require('express');
const config = require('config');
const axios = require('axios');

const app = express();
const fs = require('fs');

const accountRegex = RegExp(/\/accounts\/.*\/info/);
const contractRegex = RegExp(/\/contracts\/.*\/info/);

const TIMEOUT_FETCH = 3000;

const filePath = `${__dirname}/dist/index.html`;
let fileIndex = null;

fs.readFile(filePath, 'utf8', async (error, data) => {
	fileIndex = data;
	app.listen(3000);
});

app.use(express.static(`${__dirname}/dist/`, { index: false }));

app.get('*', async (req, res) => {
	let result = fileIndex;
	let title = '';
	let description = '';
	let image = '';

	const { url } = req;

	if (accountRegex.test(url)) {
		const accountName = url.split('/')[2];
		title = `Account ${accountName} | Echo Explorer`;
		description = 'ECHO account page';
		image = `${config.SERVER_URL}/api/accounts/${accountName}/avatar.png`;

	} else if (contractRegex.test(url)) {
		const contractId = url.split('/')[2];
		try {
			const contract = await axios.get(`${config.SERVER_URL}/api/contracts/${contractId}`, { timeout: TIMEOUT_FETCH });

			if (contract) {
				title = `Contract ${contract.name || contractId} | Echo Explorer`;
				description = contract.description || 'ECHO contract page';
				image = `${config.SERVER_URL}${contract.icon}`;
			}
		} catch (err) {
			console.warn('Error: ', err.code);
		}
	}

	if (title) {
		const metaTags = `\n<meta property="og:title" content=${title} />
						<meta property="og:description" content=${description} />
						<meta property="og:image" content=${image} />\n`;
		const indexInsert = result.indexOf('</head>');
		result = result.slice(0, indexInsert) + metaTags + result.slice(indexInsert);
	}

	res.send(result);
});

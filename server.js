const express = require('express');
const config = require('config');

const app = express();
const fs = require('fs');
const fetch = require('node-fetch');

const accountRegex = RegExp(/\/accounts\/.*\/info/);
const contractRegex = RegExp(/\/contracts\/.*\/info/);

const OG_TITLE_REGEX = /OG_TITLE/g;
const OG_DESCRIPTION_REGEX = /OG_DESCRIPTION/g;
const OG_IMAGE_REGEX = /OG_IMAGE/g;

let fileIndex = null;
const filePath = `${__dirname}/dist/index.html`;
fs.readFile(filePath, 'utf8', (err, data) => { fileIndex = data; });

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
		await fetch(`${config.SERVER_URL}/api/contracts/${contractId}`)
			.then((contract) => contract.json())
			.then((contract) => {
				title = `Contract ${contract.name || contractId} | Echo Explorer`;
				description = contract.description || 'ECHO contract page';
				image = `${config.SERVER_URL}${contract.icon}`;
			});
	}

	result = result.replace(OG_TITLE_REGEX, title);
	result = result.replace(OG_DESCRIPTION_REGEX, description);
	result = result.replace(OG_IMAGE_REGEX, image);

	res.send(result);
});

app.listen(3000);

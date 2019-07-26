const express = require('express');
const config = require('config');

const app = express();
const fs = require('fs');
const fetch = require('node-fetch');

const {
	API_PREFIX, CONTRACT_PREFIX, ACCOUNT_PREFIX, AVATAR_PREFIX, OG_TITLE_REGEX, OG_DESCRIPTION_REGEX, OG_IMAGE_REGEX,
} = require('./src/constants/ExplorerServerConstans');

let fileIndex = null;
const filePath = `${__dirname}/dist/index.html`;
fs.readFile(filePath, 'utf8', (err, data) => fileIndex = data);

app.use(express.static(`${__dirname}/dist/`));

app.get('*', async (req, res) => {
	let result = fileIndex;

	const { url } = req;
	const accountRegex = RegExp(/\/accounts\/.*\/info/);
	const contractRegex = RegExp(/\/contracts\/.*\/info/);

	if (accountRegex.test(url)) {
		const accountName = url.split('/')[2];
		result = result.replace(OG_TITLE_REGEX, `Account ${accountName} | Echo Explorer`);
		result = result.replace(OG_DESCRIPTION_REGEX, 'ECHO account page');
		result = result.replace(OG_IMAGE_REGEX, `${config.SERVER_URL}/${API_PREFIX}/${ACCOUNT_PREFIX}/${accountName}/${AVATAR_PREFIX}`);

	} else if (contractRegex.test(url)) {
		const contractId = url.split('/')[2];
		await fetch(`${config.SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${contractId}`)
			.then((contract) => contract.json())
			.then((contract) => {
				const { name, description = 'ECHO contract page', icon } = contract;
				const contractTitle = name || contractId;
				result = result.replace(OG_TITLE_REGEX, `Contract ${contractTitle} | Echo Explorer`);
				result = result.replace(OG_DESCRIPTION_REGEX, description);
				result = result.replace(OG_IMAGE_REGEX, `${config.SERVER_URL}/${icon}`);
			});
	}

	res.send(result);
});

app.listen(3000);


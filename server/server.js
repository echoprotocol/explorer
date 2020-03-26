import express from 'express';
import config from 'config';

import template from './template';
import render from './render';
import serverIninitializer from './server.initializer';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static(`${process.env.PWD}/public`));

server.disable('x-powered-by');

server.get('/*', async (req, res) => {
	const { content, preloadedState } = await render(req);
	const response = template(preloadedState, content);
	res.send(response);
});

(async () => {
	try {
		await serverIninitializer.init({
			url: config.API_URL,
			...config.ECHO_CONFIG,
		});
		server.listen(PORT, async () => {
			console.log(`Server listen port ${PORT}`);
		});
	} catch (err) {
		console.log('Server can not connect to echo', err);
	}
})();


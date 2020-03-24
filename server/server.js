import express from 'express';
import echo from 'echojs-lib';
import template from './template';
import render from './render';
import config from '../src/config/chain';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static(`${process.env.PWD}/public`));

server.disable('x-powered-by');

server.get('/*', async (req, res) => {
	const { content, preloadedState } = await render(req);
	const response = template(preloadedState, content);
	res.send(response);
});

server.listen(PORT, async () => {
	// TODO refactoring
	await echo.connect(config.API_URL, {
		connectionTimeout: 5000,
		maxRetries: 1e10,
		pingTimeout: 6000,
		pingDelay: 5000,
		debug: false,
		apis: ['database', 'network_broadcast', 'history', 'registration', 'asset', 'login', 'network_node', 'echorand'],
	});

	console.log(`Server listen port ${PORT}`);
});

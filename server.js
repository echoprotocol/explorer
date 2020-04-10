const echo = require('echojs-lib').default;
const config = require('config');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	}).listen(PORT, async (err) => {
		if (err) throw err;
		try {
			await echo.connect(config.ECHO_NODE.API_URL, {
				connectionTimeout: config.ECHO_NODE.CONNECTION_TIMEOUT,
				maxRetries: config.ECHO_NODE.MAX_RETRIES,
				pingDelay: config.ECHO_NODE.PING_DELAY,
				debug: config.ECHO_NODE.DEBUG,
				apis: config.ECHO_NODE.APIS,
			});
			console.log('echo connected: ', echo.isConnected);
		} catch (error) {
			console.log('Not connect to echo', error);
		}
		console.log('Server listen: ', PORT);
	});
});

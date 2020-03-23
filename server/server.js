import express from 'express';

import template from './template';
import render from './render';

const server = express();
const PORT = process.env.PORT || 3002;

server.use(express.static(`${process.env.PWD}/public`));

server.disable('x-powered-by');

server.listen(PORT, () => {
	console.log(`Server listen port ${PORT}`);
});

server.get('/*', async (req, res) => {
	const { content, preloadedState } = await render(req.url);
	const response = template(preloadedState, content);
	res.send(response);
});

// // Pure client side rendered page
// server.get('/client', (req, res) => {
// 	const response = template('Client Side Rendered page');
// 	res.setHeader('Cache-Control', 'assets, max-age=604800');
// 	res.send(response);
// });

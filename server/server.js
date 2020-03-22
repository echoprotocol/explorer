import express from 'express';

import template from './template';
import ssr from './server';

const app = express();
const PORT = process.env.PORT || 3000;

// Serving static files
app.use(express.static(`${process.env.PWD}/public`));

// hide powered by express
app.disable('x-powered-by');

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});

app.get('/*', async (req, res) => {
	const { content, preloadedState } = await ssr(req.url);
	const response = template('Server Rendered Page', preloadedState, content);
	res.send(response);
});

// // Pure client side rendered page
// app.get('/client', (req, res) => {
// 	const response = template('Client Side Rendered page');
// 	res.setHeader('Cache-Control', 'assets, max-age=604800');
// 	res.send(response);
// });

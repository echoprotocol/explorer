let createBrowserHistory = null;

if (__IS_CLIENT__) {
	/* eslint-disable global-require */
	({ createBrowserHistory } = require('history'));
	/* eslint-enable global-require */
}

// Create a history of your choosing (we're using a browser history in this case)
export default createBrowserHistory && createBrowserHistory();

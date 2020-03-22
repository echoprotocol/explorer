let createBrowserHistory = null;

if (IS_CLIENT) {
	createBrowserHistory = require('history').createBrowserHistory;
}

// Create a history of your choosing (we're using a browser history in this case)
export default createBrowserHistory && createBrowserHistory();

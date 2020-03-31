export default {
	API_URL: process.env.API_URL,
	LANDING_BRIDGE: process.env.LANDING_BRIDGE,
	INSTALL_NODE_LINK: process.env.INSTALL_NODE_LINK,
	GRAPHQL_URL: {
		HTTP: process.env.GRAPHQL_URL_HTTP_LINK,
		WS: process.env.GRAPHQL_URL_WS_LINK,
	},
	SERVER_URL: process.env.SERVER_URL,
	SOLC_LIST_URL: process.env.SOLC_LIST_URL,
	SOLC_BIN_URL: process.env.SOLC_BIN_URL,
	APP_VERSION: process.env.APP_VERSION,
	MAP_API_TOKEN: process.env.MAP_API_TOKEN,
};

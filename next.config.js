const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

const {
	LANDING_BRIDGE,
	GRAPHQL_URL,
	SERVER_URL,
	SOLC_LIST_URL,
	SOLC_BIN_URL,
	MAP_API_TOKEN,
	INSTALL_NODE_LINK,
	ECHO_NODE,
} = require('config');

const packageJson = require('./package.json');

const chainWrapper = (appConfig) => withFonts(withSass(withCSS(appConfig)));

module.exports = chainWrapper({
	env: {
		ECHO_NODE,
		SERVER_URL,
		SOLC_LIST_URL,
		SOLC_BIN_URL,
		LANDING_BRIDGE,
		INSTALL_NODE_LINK,
		MAP_API_TOKEN,
		GRAPHQL_URL_HTTP_LINK: GRAPHQL_URL.HTTP,
		GRAPHQL_URL_WS_LINK: GRAPHQL_URL.WS,
		APP_VERSION: packageJson.version,
	},
	webpack: (_config, { isServer, dev }) => {

		if (dev) {
			_config.devtool = 'cheap-module-source-map';
		}

		if (!isServer) {
			_config.node = {
				fs: 'empty',
				module: 'empty',
				net: 'empty',
				tls: 'empty',
			};
		}
		_config.module.rules.push({
			test: /\.(ico|png|svg)$/,
			use: {
				loader: 'url-loader?limit=100000',
				options: {
					name: '/src/public/images/[name].[ext]',
				},
			},
		});
		return _config;
	},
});

require('@babel/polyfill');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicToolsConfig = require('./webpack-isomorphic-tools-configuration');

const packageJson = require('./package.json');

const {
	API_URL,
	LANDING_BRIDGE,
	GRAPHQL_URL,
	SERVER_URL,
	SOLC_LIST_URL,
	SOLC_BIN_URL,
	MAP_API_TOKEN,
	INSTALL_NODE_LINK,
} = require('config');

const webpackIsomorphicToolsPlugin =
	new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig);

module.exports = {
	mode: 'development',
	target: 'node',
	entry: {
		server: path.resolve(__dirname, 'server/server.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
	},
	module: {
		rules: [
			{
				test: webpackIsomorphicToolsPlugin.regularExpression('images'),
				loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
			},
			{
				test: /\.js|\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							'dynamic-import-node',
						],
					},
				},
			},
			{
				test: /\.css|\.scss$/,
				use: 'null-loader',
			},
		],
	},
	resolve: {
		extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
	},
	plugins: [
		new CleanWebpackPlugin(['build']),
		webpackIsomorphicToolsPlugin,
		new webpack.DefinePlugin({
			__IS_SERVER__: true,
			__IS_CLIENT__: false,
			__API_URL__: JSON.stringify(API_URL),
			__SERVER_URL__: JSON.stringify(SERVER_URL),
			__SOLC_LIST_URL__: JSON.stringify(SOLC_LIST_URL),
			__SOLC_BIN_URL__: JSON.stringify(SOLC_BIN_URL),
			__LANDING_BRIDGE__: JSON.stringify(LANDING_BRIDGE),
			__INSTALL_NODE_LINK__: JSON.stringify(INSTALL_NODE_LINK),
			__MAP_API_TOKEN__: JSON.stringify(MAP_API_TOKEN),
			__GRAPHQL_URL_HTTP_LINK__: JSON.stringify(GRAPHQL_URL.HTTP),
			__GRAPHQL_URL_WS_LINK__: JSON.stringify(GRAPHQL_URL.WS),
			__APP_VERSION__: JSON.stringify(packageJson.version),
		}),
	],
};

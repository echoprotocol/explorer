/* eslint-disable import/no-dynamic-require */
require('@babel/polyfill');

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');

const {
	API_URL,
	LANDING_BRIDGE,
	GRAPHQL_URL,
	SERVER_URL,
	SOLC_LIST_URL,
	SOLC_BIN_URL,
} = require('config');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: `${__dirname}/src/assets/index.html`,
	filename: 'index.html',
	inject: 'body',
});

const extractSass = new ExtractTextPlugin({
	filename: '[name].[hash].css',
	disable: process.env.NODE_ENV === 'local',
});

const timeCache = Date.now();

module.exports = {
	node: {
		fs: 'empty',
		module: 'empty',
		net: 'empty',
		tls: 'empty',
	},
	entry: {
		babel: '@babel/polyfill',
		app: path.resolve('src/index.js'),
	},
	output: {
		publicPath: '/',
		path: path.resolve('dist'),
		filename: `[name].${timeCache}.js`,
		pathinfo: process.env.NODE_ENV === 'local',
		sourceMapFilename: '[name].js.map',
		chunkFilename: `[name].bundle.js?v=${timeCache}`,
	},
	devtool: process.env.NODE_ENV !== 'local' ? 'cheap-module-source-map' : 'eval',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.jsx$/,
				include: /src/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(ico|png|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[ext]',
					},
				},
			},
			{
				test: /\.(scss|css)$/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader',
					}, {
						loader: 'sass-loader',
					}],
					// use style-loader in development
					fallback: 'style-loader',
				}),
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|)$/,
				loader: 'url-loader?limit=100000',
			},
			{
				test: /\.pdf$/,
				use: {
					loader: 'file-loader?name=[path][name].[ext]',
					options: {
						publicPath: '/',
						name: '[name].[ext]',
						context: '',
					},
				},

			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve('src'),
		],
		extensions: ['.js', '.jsx', '.json'],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({
			__API_URL__: JSON.stringify(API_URL),
			__SERVER_URL__: JSON.stringify(SERVER_URL),
			__SOLC_LIST_URL__: JSON.stringify(SOLC_LIST_URL),
			__SOLC_BIN_URL__: JSON.stringify(SOLC_BIN_URL),
			__LANDING_BRIDGE__: JSON.stringify(LANDING_BRIDGE),
			__GRAPHQL_URL_HTTP_LINK__: JSON.stringify(GRAPHQL_URL.HTTP),
			__GRAPHQL_URL_WS_LINK__: JSON.stringify(GRAPHQL_URL.WS),
			__APP_VERSION__: JSON.stringify(packageJson.version),
		}),
		HTMLWebpackPluginConfig,
		extractSass,
	],
};

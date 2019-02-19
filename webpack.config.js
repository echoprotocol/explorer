/* eslint-disable import/no-dynamic-require */
require('babel-polyfill');

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configFileName = `${process.env.NODE_ENV}.config.js`;
const configFile = require(`./config/${configFileName}`);

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
	},
	entry: {
		babel: 'babel-polyfill',
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
			__API_URL__: JSON.stringify(configFile.API_URL),
		}),
		HTMLWebpackPluginConfig,
		extractSass,
	],
};

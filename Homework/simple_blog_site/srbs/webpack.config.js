const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = 'style-loader';

module.exports = {
	devtool: "inline-source-map",
	mode: isProduction ? "production" : "development",
	experiments: {
		topLevelAwait: true
	},
	entry: ['@babel/polyfill', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		open: true,
		host: 'localhost',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['@babel/plugin-syntax-top-level-await'],
					}
				}
			},
			{
				test: /\.css$/i,
				use: [stylesHandler,'css-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
		],
	}
}
const path = require('path')
const config = require('config')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PORT = config.get('port')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const getPostCSSLoader = plugin => {
	return {
		loader: 'postcss-loader',
		options: {
			postcssOptions: {
				plugins: [[plugin]],
			},
		},
	}
}

const getStyleLoaders = loader => {
	const defaultLoader = [MiniCssExtractPlugin.loader, 'css-loader', getPostCSSLoader('autoprefixer'), getPostCSSLoader('css-mqpacker')]

	if (isProd) {
		defaultLoader.push(getPostCSSLoader('cssnano'))
	}
	if (loader) {
		defaultLoader.push(loader)
	}

	return defaultLoader
}

const getMode = mode => {
	return mode ? 'development' : 'production'
}

const getDevtool = mode => {
	return mode ? 'source-map' : 'inline-source-map'
}

module.exports = {
	mode: getMode(isDev),
	devtool: getDevtool(isDev),
	context: path.resolve(__dirname, 'client', 'src'),
	entry: {
		main: './index.ts',
	},
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	devServer: {
		port: PORT,
		hot: isDev,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.css$/i,
				use: getStyleLoaders(),
			},
			{
				test: /\.s[ac]ss$/i,
				use: getStyleLoaders('sass-loader'),
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new CleanWebpackPlugin(),
	],
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'client', 'dist'),
	},
}

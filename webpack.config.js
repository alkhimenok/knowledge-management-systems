const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const getMode = () => (isProd ? 'production' : 'development')
const getDevtool = () => (isProd ? false : 'source-map')

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

module.exports = {
	mode: getMode(),
	devtool: getDevtool(),
	context: path.resolve(__dirname, 'client', 'src'),
	entry: './index.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
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
	plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'client', 'dist'),
	},
}

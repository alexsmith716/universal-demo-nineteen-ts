const path = require('path');
const webpack = require('webpack');
const externals = require('./node-externals');
// const WriteFilePlugin = require('write-file-webpack-plugin');

// const loaderUtils = require('loader-utils').stringifyRequest;

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { DuplicatesPlugin } = require('inspectpack/plugin');

const rootPath = path.resolve(__dirname, '..');

const generatedIdent = (name, localName) => `${name}__${localName}`;

// ===============================

// server bundle targeting 'node'
// entry point to server bundle ('server.js') renders to string
const webpackServerConfig = {
	context: path.resolve(__dirname, '..'),
	name: 'server',
	target: 'node',
	externals,
	mode: 'development',
	// devtool: 'eval',  // generated code
	// devtool: false,
	devtool: 'source-map',

	entry: './src/server.js',

	output: {
		path: path.resolve('./build/server'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},

	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					babelrc: false,
					configFile: path.resolve(rootPath, 'babel.config.server.js'),
					// cacheDirectory: true,
					// cacheCompression: false,
				},
			},
			{
				test: /\.(scss)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: {
								getLocalIdent: (loaderContext, localIdentName, localName) => {
									const lr = loaderContext.resourcePath;
									if (path.basename(lr).indexOf('global.scss') !== -1) {
										return localName;
									}
									return generatedIdent(
										path.basename(lr).replace(/\.[^/.]+$/, ''),
										localName
									);
								},
								mode: 'local',
							},
							onlyLocals: true,
							importLoaders: 2,
						},
					},
					{
						loader: 'resolve-url-loader',
						options: {
							// debug: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'postcss.config.js',
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								sourceMap: true,
								sourceMapContents: false,
								outputStyle: 'expanded',
							},
						},
					},
					{
						loader: 'sass-resources-loader',
						options: {
							sourceMap: true,
							resources: [
								path.resolve(rootPath, 'src/theme/scss/app/functions.scss'),
								path.resolve(rootPath, 'src/theme/scss/app/variables.scss'),
								path.resolve(rootPath, 'src/theme/scss/app/mixins.scss'),
							],
						},
					},
				],
			},
			{
				test: /\.(css)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: {
								getLocalIdent: (loaderContext, localIdentName, localName) => {
									const lr = loaderContext.resourcePath;
									if (path.basename(lr).indexOf('global.scss') !== -1) {
										return localName;
									}
									return generatedIdent(
										path.basename(lr).replace(/\.[^/.]+$/, ''),
										localName
									);
								},
								mode: 'local',
							},
							onlyLocals: true,
							importLoaders: 2,
						},
					},
					{
						loader: 'resolve-url-loader',
						options: {
							// sourceMap: true,
							// debug: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'postcss.config.js',
							},
						},
					},
				],
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				loader: 'url-loader',
				options: {
					limit: 10240,
					esModule: false,
				},
			},
			{
				test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: {
					limit: 10240,
					mimetype: 'application/font-woff',
					esModule: false,
				},
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: {
					limit: 10240,
					mimetype: 'application/octet-stream',
					esModule: false,
				},
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					esModule: false,
				},
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: {
					limit: 10240,
					mimetype: 'image/svg+xml',
					esModule: false,
				},
			},
		],
	},

	performance: {
		hints: false,
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
	},

	plugins: [
		// new WriteFilePlugin(),
		// new webpack.ProgressPlugin(handler),
		// https://webpack.js.org/plugins/module-concatenation-plugin/
		// new webpack.optimize.ModuleConcatenationPlugin(),
		// https://webpack.js.org/plugins/internal-plugins/#occurrenceorderplugin
		// new webpack.optimize.OccurrenceOrderPlugin(),
		// https://webpack.js.org/plugins/limit-chunk-count-plugin/
		// After compiling some chunks are too small - creating larger HTTP overhead
		// post-process chunks by merging them

		// LimitChunkCountPlugin with 'maxChunks: 1' insures only one file is generated
		//    for server bundle so it can be run synchronously
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('development') },
			__CLIENT__: false,
			__SERVER__: true,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: true,
		}),
    // new webpack.HotModuleReplacementPlugin(),
		// new BundleAnalyzerPlugin({
		//   analyzerMode: 'static',
		//   reportFilename: '../../analyzers/bundleAnalyzer/dev.serverAA.html',
		//   openAnalyzer: false,
		//   generateStatsFile: false,
		// }),

		// new DuplicatesPlugin({
		//   emitErrors: false,
		//   emitHandler: undefined,
		//   verbose: true,
		// }),
	],
};

module.exports = webpackServerConfig;

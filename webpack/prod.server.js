const path = require('path');
const webpack = require('webpack');

process.env.IS_CLIENT = false;

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { DuplicatesPlugin } = require('inspectpack/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');
const externals = require('./node-externals');

const rootPath = path.resolve(__dirname, '..');

const generatedIdent = (name, localName, lr) => {
	const b = Buffer.from(lr).toString('base64');
	// eslint-disable-next-line space-infix-ops
	return `${name}__${localName}--${b.substring(b.length - 12, b.length - 3)}`;
};

module.exports = {
	context: path.resolve(__dirname, '..'),

	name: 'server',
	target: 'node',
	externals,
	mode: 'production',
	// devtool: (none) > fastest > quality: bundled code

	entry: {
		server: './src/server.js',
	},

	output: {
		path: path.resolve('./build/server'),
		// filename: 'server.js',
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},

	module: {
		rules: [
			{
				type: 'javascript/auto',
				test: /\.mjs$/,
				use: [],
				include: /node_modules/,
			},

			// ====================================================================================

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

			// ====================================================================================

			{
				test: /\.(scss)$/,
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
										localName,
										lr
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
								outputStyle: 'compressed',
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

			// ====================================================================================

			{
				test: /\.(css)$/,
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
									if (path.basename(lr).indexOf('graphiql.css') !== -1) {
										return localName;
									}
									return generatedIdent(
										path.basename(lr).replace(/\.[^/.]+$/, ''),
										localName,
										lr
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

			// ====================================================================================
			
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
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css', '.scss', '.mjs'],
		alias: {
			react: path.resolve('./node_modules/react'),
			graphql: path.resolve('./node_modules/graphql'),
			// https://github.com/facebook/react/issues/13991 (duplicate react in dependency tree)
			// '~hooks': path.resolve(__dirname, '../src/hooks'),
		},
	},

	plugins: [
		new WebpackBar({ name: 'Server' }),
		// new webpack.ProgressPlugin(handler),
		// https://webpack.js.org/plugins/module-concatenation-plugin/

		new ForkTsCheckerWebpackPlugin(),

		new webpack.optimize.ModuleConcatenationPlugin(),

		// https://webpack.js.org/plugins/internal-plugins/#occurrenceorderplugin
		new webpack.optimize.OccurrenceOrderPlugin(),

		// https://webpack.js.org/plugins/limit-chunk-count-plugin/
		// After compiling some chunks are too small - creating larger HTTP overhead
		// post-process chunks by merging them
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),

		new webpack.DefinePlugin({
			'process.env.IS_CLIENT': false,
			__CLIENT__: false,
			__SERVER__: true,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false,
			__DLLS__: false,
		}),

		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true,
		}),

		new webpack.HashedModuleIdsPlugin(),

		// new BundleAnalyzerPlugin({
		//   analyzerMode: 'static',
		//   reportFilename: '../../analyzers/bundleAnalyzer/prod.serverXXX2.html',
		//   openAnalyzer: false,
		//   generateStatsFile: false
		// }),

		// new DuplicatesPlugin({
		// 	emitErrors: true,
		// 	emitHandler: undefined,
		// 	ignoredPackages: ['graphiql'],
		// 	verbose: true
		// }),
	],
};

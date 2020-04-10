const path = require('path');
const webpack = require('webpack');
// Extract CSS from chunks into multiple stylesheets + HMR
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
// const WriteFilePlugin = require('write-file-webpack-plugin');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { DuplicatesPlugin } = require('inspectpack/plugin');

// const rootPath = path.resolve(__dirname, '..');
// const assetsPath = path.resolve(__dirname, '../build/dist');

const rootPath = path.resolve(__dirname, '../');
const assetPath = path.resolve(rootPath, './build/dist');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT;

// ===============================

// loaderContext: ton of data about loaded object
// loaderContext.resourcePath: '/......//client/containers/About/scss/About.scss'

// generate classname based on a different schema
// https://nodejs.org/api/buffer.html
// Node 'Buffer' class enables manipulation of binary data
// 'Buffer.from(string[, encoding])': returns a new Buffer that contains a copy of the provided string
// 'Buffer.from('hello world', 'ascii')'
// strings are immutable (will return new string, not modify)
// ident unique based on scss directory
const generatedIdent = (name, localName) => `${name}__${localName}`;
// substring args based on resourcePath length

// ===============================

// client bundle targeting 'web'
// entry point to client bundle ('client.js') renders to DOM
const webpackClientConfig = {
	context: path.resolve(__dirname, '..'),
	name: 'client',
	target: 'web',
	mode: 'development',
	// devtool: 'eval', // Each module is executed with eval() and //@ sourceURL
	// devtool: false, // disables default devtool configuration
	// devtool: 'eval-source-map', // best quality SourceMaps for development
	// devtool: 'source-map', // A full SourceMap is emitted as a separate file
	devtool: 'inline-source-map', // A SourceMap is added as a DataUrl to the bundle

	entry: {
		main: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?reload=true',
			'bootstrap',
			'./src/client.js',
		],
	},

	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		path: assetPath,
		publicPath: `http://${host}:${port}/`,
	},

	module: {
		rules: [
			{
				type: 'javascript/auto',
				test: /\.mjs$/,
				use: [],
				include: /node_modules/,
			},
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					babelrc: false,
					configFile: path.resolve(rootPath, 'babel.config.client.js'),
					// cacheDirectory: true,
					// cacheCompression: false,
				},
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: ExtractCssChunks.loader,
						options: {
							hmr: true,
						},
					},
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
				use: [
					{
						loader: ExtractCssChunks.loader,
						options: {
							hmr: true,
						},
					},
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
										localName
									);
								},
								mode: 'local',
							},
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
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css', '.scss', '.mjs'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
	},

	plugins: [
		// new WriteFilePlugin(),
		// by default [name].css is used when process.env.NODE_ENV === 'development'
		//    and [name].[contenthash].css during production,
		//    so you can likely forget about having to pass anything.
		new ExtractCssChunks({
			// filename: '[name].[contenthash].css',
			filename: '[name].css',
			chunkFilename: '[id].css',
			orderWarning: true, // Disable to remove warnings about conflicting order between imports
		}),

		new webpack.NamedModulesPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),

		// https://webpack.js.org/plugins/define-plugin
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: true,
		}),

		// new BundleAnalyzerPlugin({
		//   analyzerMode: 'static',
		//   reportFilename: '../../analyzers/bundleAnalyzer/dev.clientAA.html',
		//   openAnalyzer: false,
		//   generateStatsFile: false,
		// }),

		// new DuplicatesPlugin({
		//   emitErrors: false,
		//   emitHandler: undefined,
		//   verbose: true,
		// }),

		// This plugin enables more fine grained control of source map generation.
		// https://webpack.js.org/plugins/source-map-dev-tool-plugin/#exclude-vendor-maps
		// https://webpack.js.org/plugins/source-map-dev-tool-plugin/#host-source-maps-externally
		// It is also enabled automatically by certain settings of the devtool configuration option.
		// filename: (string): Defines the output filename of
		//    the SourceMap (will be inlined if no value is provided).
		// exclude: (string|regex|array): Exclude modules that match the given value from source map generation.
		// *** exclude source maps for any modules in vendor.js bundle ***
		// new webpack.SourceMapDevToolPlugin({
		//   filename: '[name].js.map',
		//   // exclude: ['vendor.js']
		// }),

		// https://webpack.js.org/plugins/provide-plugin/
		// Use modules without having to use import/require
		// ProvidePlugin: Whenever the identifier is encountered as free variable in a module,
		//    the module is loaded automatically and the identifier is filled with the exports of
		//    the loaded module (of property in order to support named exports).

		// To automatically load jquery point variables it exposes to the corresponding node module
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery',
			Popper: ['popper.js', 'default'],
			Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
			Button: 'exports-loader?Button!bootstrap/js/dist/button',
			Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
			Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
			Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
			Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
			Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
			Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
			Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
			Util: 'exports-loader?Util!bootstrap/js/dist/util',
		}),
	],
};

module.exports = webpackClientConfig;

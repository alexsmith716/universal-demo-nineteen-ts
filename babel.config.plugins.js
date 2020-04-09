module.exports = {
	plugins: [
		['@babel/plugin-proposal-decorators', { legacy: true }],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-object-rest-spread',
		'react-hot-loader/babel',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-export-default-from',
		['@babel/plugin-transform-runtime',{corejs: {version: 3, proposals: true}}]
	]
};

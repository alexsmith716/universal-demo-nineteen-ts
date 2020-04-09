module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				useBuiltIns: undefined,
				corejs: false,
				targets: { node: 'current' },
				// debug: true
			}
		],
		'@babel/preset-react',
		'@babel/preset-typescript'
	],
	extends: './babel.config.plugins.js'
};

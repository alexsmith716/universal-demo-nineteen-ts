module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: 'auto',
				useBuiltIns: undefined,
				corejs: false,
				targets: { node: 'current' },
				// debug: true
			}
		],
		'@babel/preset-typescript',
		'@babel/preset-react'
	],
	extends: './babel.config.plugins.js'
};

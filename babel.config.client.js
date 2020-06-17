module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				useBuiltIns: 'usage',
				corejs: { version: 3, proposals: true },
				targets: {
					browsers: [
						'last 2 versions'
					]
				},
				debug: false
			}
		],
		'@babel/preset-typescript',
		'@babel/preset-react'
	],
	extends: './babel.config.plugins.js'
};

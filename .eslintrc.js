module.exports = {
	extends: [
		'airbnb',
		'plugin:prettier/recommended',
		'prettier/react',
	],

	env: {
		browser: true,
		node: true,
		jest: true,
	},

	plugins: [
		'prettier', 
		'react-hooks',
	],

	parser: 'babel-eslint',

	parserOptions: {
		allowImportExportEverywhere: true,
	},

	globals: {
		__DEVELOPMENT__: true,
		__CLIENT__: true,
		__SERVER__: true,
		__DISABLE_SSR__: true,
		__DEVTOOLS__: true,
	},

	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},

	rules: {
		'arrow-parens': 0,
		'class-methods-use-this': 1,
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
			},
		],
		'constructor-super': 1,
		'import/extensions': [1, { js: 'never' }],
		'import/max-dependencies': ['error', { max: 40 }],
		'import/no-extraneous-dependencies': [0],
		'jsx-a11y/anchor-is-valid': [
			'off',
			{
				components: ['Link'],
			},
		],
		'max-nested-callbacks': [2, { max: 5 }],
		'no-lonely-if': 2,
		'no-nested-ternary': 2,
		'no-param-reassign': 0,
		'no-this-before-super': 2,
		'no-underscore-dangle': 'off',
		'no-warning-comments': [1, { terms: ['todo', 'fixme'], location: 'start' }],
		'prefer-spread': 2,
		'react/destructuring-assignment': 'off',
		'react/display-name': 0,
		'react/no-access-state-in-setstate': 'off',
		'react/prop-types': 0,
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react/jsx-fragments': 'error',
		'react/jsx-no-useless-fragment': 'error',
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/require-extension': 'off',
		'react/sort-comp': 0,
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'prettier/prettier': [
			'error',
			{
				printWidth: 110,
				semi: true,
				singleQuote: true,
				trailingComma: 'es5',
			},
		],
	},
};

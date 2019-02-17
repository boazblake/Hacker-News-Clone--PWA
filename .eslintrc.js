module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	globals: {
		m: true,
	},
	extends: [ 'eslint:recommended', 'plugin:mithril/recommended' ],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 9,
	},
	rules: {
		'comma-dangle': [ 'warn', 'always-multiline' ],
		indent: [ 'warn', 2 ],
		'linebreak-style': [ 'warn', 'unix' ],
		quotes: [ 'warn', 'single' ],
		semi: [ 'warn', 'never' ],
		'no-unused-vars': [ 'warn' ],
		'no-console': 0,
		'rest-spread-spacing': [ 'warn', 'never' ],
	},
}

// @ts-check
import antfu from '@antfu/eslint-config';

export default antfu(
	{
		formatters: true,
		pnpm: true,
		typescript: {
			tsconfigPath: 'tsconfig.json',
		},
		vue: {
			a11y: false,
			overrides: {
				'vue/max-attributes-per-line': [
					'warn',
					{
						singleline: 1,
						multiline: 1,
					},
				],
			},
		},
		stylistic: {
			semi: true,
			indent: 'tab',
			quotes: 'single',
			overrides: {
				'style/quotes': [
					'warn',
					'single',
					{
						avoidEscape: true,
						allowTemplateLiterals: true,
					},
				],
				'style/comma-dangle': [
					'warn',
					'always-multiline',
				],
				'style/semi': [
					'warn',
					'always',
					{
						omitLastInOneLineBlock: true,
					},
				],
				'style/no-tabs': [
					'warn',
					{
						allowIndentationTabs: true,
					},
				],
				'style/space-before-function-paren': [
					'warn',
					'never',
				],
				'style/linebreak-style': [
					'warn',
					'unix',
				],
				'style/arrow-parens': [
					'warn',
					'always',
				],
				'vue/html-indent': [
					'warn',
					'tab',
				],
				'vue/array-bracket-newline': [
					'warn',
					'consistent',
				],
				'vue/block-tag-newline': [
					'warn',
					{
						singleline: 'always',
						multiline: 'always',
					},
				],
				'vue/comma-dangle': [
					'warn',
					'always-multiline',
				],
			},
		},

	},
	{
		files: [
			'*.ts',
			'*.tsx',
			'*.vue',
		],
		rules: {
			'no-console': 'warn',
			'no-debugger': 'warn',
			'strict': [
				'error',
				'global',
			],
			'eqeqeq': 'warn',
			'no-unneeded-ternary': [
				'warn',
			],
			'no-unused-vars': [
				'warn',
			],
			'ts/ban-ts-comment': 'warn',
			'import/extensions': [
				'warn',
				'ignorePackages',
				{
					vue: 'never',
				},
			],
			'import/no-named-default': 'off',
		},
	},
	{
		files: [
			'scripts/**/*.ts',
		],
		rules: {
			'no-console': 'off',
			'ts/no-unsafe-assignment': 'off',
			'ts/no-unsafe-call': 'off',
			'ts/no-unsafe-member-access': 'off',
			'ts/no-unsafe-return': 'off',
			'ts/no-unsafe-argument': 'off',
			'ts/no-unsafe-enum-comparison': 'off',
			'ts/no-unsafe-type-assertion': 'off',
		},
	},
);

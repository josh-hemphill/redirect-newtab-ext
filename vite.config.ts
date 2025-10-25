import type { Options as VueRouterOptions } from 'unplugin-vue-router';
import path from 'node:path';
import { env } from 'node:process';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import { unheadVueComposablesImports } from '@unhead/vue';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import ViteFonts from 'unplugin-fonts/vite';
import Components from 'unplugin-vue-components/vite';
import VueMacros from 'unplugin-vue-macros/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import * as PackageJson from './package.json' with { type: 'json' };
import 'vitest/config';

const ROUTE_DIRS: VueRouterOptions['routesFolder'] = [
	'src/pages',
];
const PAGE_EXT = ['vue'] as const;

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
		},
	},
	define: {
		'PACKAGE': {
			name: PackageJson.name,
			version: PackageJson.version,
			description: PackageJson.description,
			author: PackageJson.author,
			license: PackageJson.license,
			homepage: PackageJson.homepage,
			repository: PackageJson.repository,
			// bugs: PackageJson.bugs,
			// funding: PackageJson.funding,
			keywords: PackageJson.keywords,
			// engines: PackageJson.engines,
			dependencies: PackageJson.dependencies,
		},
		'process.env': {},
	},

	plugins: [
		VueMacros({
			plugins: {
				vue: Vue({
					include: PAGE_EXT.map((ext) => new RegExp(`\\.${ext}$`)),
					template: { transformAssetUrls },
					isProduction: env.NODE_ENV === 'production',
				}),
			},
		}),

		// https://github.com/posva/unplugin-vue-router
		VueRouter({
			routesFolder: [...ROUTE_DIRS],
			extensions: PAGE_EXT.map((ext) => `.${ext}`),
			extendRoute: (route) => {
				route.addAlias(`${route.fullPath}.html`);
				if (route.name === '/popup') {
					route.addAlias('/');
				}
			},
			dts: 'src/auto.routes.d.ts',
		}),

		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
			imports: [
				'vue',
				'vue-i18n',
				'@vueuse/core',
				unheadVueComposablesImports,
				VueRouterAutoImports,
				'pinia',
				{
					// add any other imports you were relying on
					'vue-router/auto': ['useLink'],
					'@mdi/js': Object.keys(await import('@mdi/js')).filter((v) => v.startsWith('mdi')),
					'vuetify': [
						['components', 'vuetifyComponents'],
						['directives', 'vuetifyDirectives'],
						'createVuetify',
						'useDefaults',
						'useDisplay',
						'useTheme',
						'useLayout',
						'useLocale',
						'useRtl',
					],
				},
			],
			dts: 'src/auto.imports.d.ts',
			dirs: [
				'src/composables',
				'src/stores',
			],
			vueTemplate: true,
			// Generate corresponding .eslintrc-auto-import.json file.
			// eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
			eslintrc: {
				enabled: true, // Default `false`
				filepath: './.eslintrc.auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
		}),

		// https://github.com/antfu/unplugin-vue-components
		Components({
			// allow auto load markdown components under `./src/components/`
			extensions: [...PAGE_EXT],
			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/],
			dts: 'src/auto.components.d.ts',
		}),

		// https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
		VueI18n({
			runtimeOnly: true,
			compositionOnly: true,
			fullInstall: true,
			include: [path.resolve(__dirname, 'locales/**')],
		}),

		// https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
		vuetify({
			autoImport: {
				labs: true,
			},
			styles: {
				configFile: 'src/styles/settings.scss',
			},
		}),

		ViteFonts({
			fontsource: {
				families: [
					{
						name: 'Roboto',
						weights: [100, 400, 700, 900],
						subset: 'latin',
						styles: ['italic', 'normal'],
					},
					{
						name: 'Roboto Mono',
						subset: 'latin',
						variable: {
							wght: true,
							ital: true,
						},
					},
				],
			},
		}),

		// https://github.com/webfansplz/vite-plugin-vue-devtools
		VueDevTools({
			appendTo: 'body',
		}),
	],

	optimizeDeps: {
		include: [
			'vue-router',
			'@vueuse/core',
			'@unhead/vue',
			'vuetify',
			'@mdi/js',
			'unplugin-vue-router/runtime',
			'unplugin-vue-router/data-loaders',
			'unplugin-vue-router/data-loaders/basic',
		],
		exclude: [
			'vue-demi',
		],
	},

	build: {
		target: 'esnext',
		sourcemap: env.NODE_ENV === 'development',
	},
	// https://github.com/vitest-dev/vitest
	test: {
		include: ['test/**/*.test.ts'],
		//environment: 'jsdom',
	},

	// https://github.com/antfu/vite-ssg
	ssgOptions: {
		script: 'async',
		formatting: 'minify',
		beastiesOptions: false,

		async onFinished() {
			await import('./scripts/manifest-writer.ts');
		},
	},

	ssr: {
		// TODO: workaround until they support native ESM
		noExternal: ['vuetify', 'workbox-window', /vue-i18n/],
	},
});

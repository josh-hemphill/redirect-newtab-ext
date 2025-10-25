import type { UserModule } from '~/types';
import sourceMessages from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';
import * as vuetifyLocales from 'vuetify/locale';

import { chromeI18nLanguage } from '~/chromeI18n';
import { getCreateVuetifyWi18n } from './vuetify';

const vuetifyMap = {
	'ar': 'ar',
	'de': 'de',
	'en': 'en',
	'es': 'es',
	'fr': 'fr',
	'hu': 'hu',
	'id': 'id',
	'it': 'it',
	'ja': 'ja',
	'ko': 'ko',
	'pl': 'pl',
	'pt-BR': 'pt',
	'ru': 'ru',
	'sv': 'sv',
	'tr': 'tr',
	'uk': 'uk',
	'vi': 'vi',
	'zh-CN': 'zhHans',
} as const satisfies Record<string, keyof typeof vuetifyLocales>;
const vuetifyMapEntries = Object.entries(vuetifyMap) as [keyof typeof vuetifyMap, keyof typeof vuetifyLocales][];
const messages = Object.fromEntries(vuetifyMapEntries.map(([l, v]) => [l, {
	...(sourceMessages ?? {})[l],
	$vuetify: vuetifyLocales[v],
}] as const));

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
export const i18n = createI18n({
	legacy: false,
	locale: chromeI18nLanguage,
	fallbackLocale: 'en',
	messages,
});

export const availableLocales = Object.keys(messages ?? {});

export const install: UserModule = ({ app }) => {
	app.use(i18n);
	const vuetify = getCreateVuetifyWi18n(i18n);
	app.use(vuetify);
};

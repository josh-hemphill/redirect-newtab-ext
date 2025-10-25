import sourceMessages from '@intlify/unplugin-vue-i18n/messages';
import { chrome } from '~/types';

const availableLanguages = Object.keys(sourceMessages ?? {});

function getChromeI18nLanguage() {
	if (import.meta.env.SSR) {
		return 'en';
	}
	const language = chrome?.i18n?.getUILanguage?.();
	if (!language) {
		return 'en';
	}
	if (availableLanguages.includes(language)) {
		return language;
	}
	if (availableLanguages.includes(language.split('-')[0])) {
		return language.split('-')[0];
	}
	if (availableLanguages.includes(language.split('-')[0].split('_')[0])) {
		return language.split('-')[0].split('_')[0];
	}
	return 'en';
}

export const chromeI18nLanguage = getChromeI18nLanguage();

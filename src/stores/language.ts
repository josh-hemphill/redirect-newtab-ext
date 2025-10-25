import { acceptHMRUpdate, defineStore, skipHydrate } from 'pinia';
import { chromeI18nLanguage } from '~/chromeI18n';
import { useChromeSync } from '~/composables/chrome';
import { i18n } from '~/modules/i18n';

export { availableLocales } from '~/modules/i18n';

export const useLanguageStore = defineStore('language', () => {
	const defaultLanguage = { locale: chromeI18nLanguage };
	let ready = false;
	const language = reactive(defaultLanguage);

	watch(language, setLanguage);
	function setLanguage(newValue: typeof defaultLanguage) {
		i18n.global.locale.value = newValue.locale;
		if (typeof document !== 'undefined')
			document.querySelector('html')?.setAttribute('lang', newValue.locale);
	}

	async function initialize() {
		if (!import.meta.env.SSR) {
			await useChromeSync('language', language);
			ready = true;
		}
	}

	async function resetLanguage() {
		language.locale = defaultLanguage.locale;
	}

	return {
		language: skipHydrate(language),
		resetLanguage,
		ready,
		initialize,
	};
});

if (import.meta.hot)
	// eslint-disable-next-line ts/no-unsafe-argument
	import.meta.hot.accept(acceptHMRUpdate(useLanguageStore as any, import.meta.hot));

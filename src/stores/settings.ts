import { acceptHMRUpdate, defineStore } from 'pinia';
import { useChromeSync } from '~/composables/chrome';

export const useSettingsStore = defineStore('settings', () => {
	const MAX_HISTORY_SIZE = 10; // Maximum number of history slots

	let ready = false;
	const settings = reactive({
		redirectHistory: [] as string[],
		redirectHistoryIndex: 0,
		redirectEnabled: true,
		toolHelpDismissed: false,
	});

	async function initialize() {
		if (!import.meta.env.SSR) {
			await useChromeSync('settings', settings);
			ready = true;
		}
	}

	const currentUrl = computed({
		get: () => settings.redirectHistory[settings.redirectHistoryIndex] || '',
		set: (value: string) => {
			if (!Array.isArray(settings.redirectHistory))
				settings.redirectHistory = [];
			settings.redirectHistory[settings.redirectHistoryIndex] = value;
		},
	});

	const historyInfo = computed(() => {
		const minSize = Math.min(settings.redirectHistory.filter(Boolean).length, MAX_HISTORY_SIZE);
		return `${settings.redirectHistoryIndex + 1} / ${minSize}`;
	});

	function newHistory(url: string) {
		settings.redirectHistory.push(url);
		settings.redirectHistoryIndex = settings.redirectHistory.length - 1;
	}

	function previousHistory() {
		if (settings.redirectHistory.length === 0)
			return;

		if (settings.redirectHistoryIndex <= 0) {
			settings.redirectHistoryIndex = Math.min(settings.redirectHistory.length, MAX_HISTORY_SIZE);
		}
		else {
			settings.redirectHistoryIndex--;
		}
	}

	function nextHistory() {
		if (settings.redirectHistory.length === 0)
			return;

		if (settings.redirectHistoryIndex >= Math.min(settings.redirectHistory.length, MAX_HISTORY_SIZE)) {
			settings.redirectHistoryIndex = 0;
		}
		else {
			settings.redirectHistoryIndex++;
		}
	}

	function clearHistory() {
		settings.redirectHistory = [];
		settings.redirectHistoryIndex = 0;
		settings.redirectEnabled = true;
	}

	function deleteHistory(index: number) {
		settings.redirectHistory.splice(index, 1);
		if (settings.redirectHistoryIndex >= index) {
			settings.redirectHistoryIndex--;
		}
	}

	return {
		settings,
		newHistory,
		previousHistory,
		nextHistory,
		clearHistory,
		deleteHistory,
		currentUrl,
		historyInfo,
		MAX_HISTORY_SIZE,
		ready,
		initialize,
	};
});

if (import.meta.hot)
	// eslint-disable-next-line ts/no-unsafe-argument
	import.meta.hot.accept(acceptHMRUpdate(useSettingsStore as any, import.meta.hot));

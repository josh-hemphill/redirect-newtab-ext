/* eslint-disable no-undef */

if (window.location.href.includes('newtab')) {
	chrome.storage.sync.get('settings', ({ settings }) => {
		const parsedSettings = JSON.parse(settings?.value ?? '{}');
		let url = parsedSettings?.redirectHistory?.[parsedSettings?.redirectHistoryIndex];
		if (parsedSettings?.redirectEnabled && url) {
			if (!url.includes('://'))
				url = `https://${url}`;
			// @ts-expect-error - chrome.tabs.update is not typed correctly (null is valid)
			chrome.tabs.update(null, { url }).catch(() => {
				console.error('Failed to update tab');
			});
		}
	});
}

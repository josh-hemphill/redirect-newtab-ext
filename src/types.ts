import type { ViteSSGContext } from 'vite-ssg';

export type UserModule = (ctx: ViteSSGContext) => void;

export const chrome: typeof globalThis.chrome = (import.meta.env.SSR || globalThis.chrome === undefined
	? {
		storage: {
			sync: {
				get: async () => {
					return Promise.resolve({});
				},
				set: async () => {
					return Promise.resolve();
				},
				onChanged: {
					addListener: () => { },
				},
			},
		},
		i18n: {
			getUILanguage: () => 'en',
		},
	}
	: (globalThis.chrome)
) as typeof globalThis.chrome;

if (import.meta.env.SSR) {
	globalThis.chrome = chrome;
}

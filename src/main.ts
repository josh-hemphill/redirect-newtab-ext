import type { UserModule } from './types';

import { ViteSSG } from 'vite-ssg';
import { routes } from 'vue-router/auto-routes';
import App from './App.vue';

import './styles/main.css';

const getName = (str: string) => str.split('/').pop()?.split('.')?.[0] ?? '';

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
	App,
	{
		routes,
		base: import.meta.env.BASE_URL,
	},
	async (ctx) => {
		// install all modules under `modules/`
		const detected: string[] = [];
		const mods = Object.entries(import.meta.glob<{ install?: UserModule }>('./modules/*.ts', { eager: true }))
			.map(async ([name, mod]) => {
				detected.push(getName(name));
				return mod?.install?.(ctx);
			});
		await Promise
			.all(mods);
		// ctx.app.use(Previewer)
	},
);

import type { UserModule } from '~/types';
import { createPinia } from 'pinia';
import { startupStores } from '~/stores/startupStores.ts'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ app, router }) => {
	const pinia = createPinia();
	app.use(pinia);
	router.beforeEach(async (to, from, next) => {
		for (const setupStore of startupStores) {
			const store = setupStore(pinia)
			if (!store.ready)
				// perform the (user-implemented) store action to fill the store's state
				await store.initialize()
		}
		next()
	})
};

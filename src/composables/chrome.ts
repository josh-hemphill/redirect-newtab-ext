import type { Ref } from 'vue';
import { chrome } from '~/types';

const sync = chrome.storage.sync;
export async function useChromeSync<T extends object>(key: string, parentValue: T): Promise<T>;
export async function useChromeSync<T>(key: string, parentValue: Ref<T>): Promise<Ref<T>>;
export async function useChromeSync<T extends object>(key: string, parentValue: T | Ref<T>): Promise<T | Ref<T>> {
	interface RawValue { value: string; timestamp: number }
	interface Obj { [key: string]: RawValue }
	let lastTimestamp = 0;
	function createRawValue(value: T): RawValue {
		const timestamp = Date.now();
		if (timestamp > lastTimestamp) {
			lastTimestamp = timestamp;
		}
		return { value: JSON.stringify(toValue(value)), timestamp };
	}
	function setValue(value: T) {
		if (isRef<T>(parentValue)) {
			parentValue.value = value;
		}
		else {
			Object.assign(parentValue, value);
		}
	}
	const obj = await sync.get<Obj>(key) ?? {};

	if (!import.meta.env.SSR) {
		if (obj[key] !== undefined && obj[key].value !== undefined) {
			setValue(JSON.parse(obj[key].value) as T);
		}

		let internalValue = createRawValue(toValue(parentValue));

		// Watch external changes and sync to storage
		watchDebounced(parentValue, async (newValue) => {
			const rawValue = createRawValue(toValue(newValue));
			if (rawValue.value !== internalValue.value) {
				internalValue = rawValue;
				await sync.set({ [key]: rawValue });
			}
		}, { deep: true, debounce: 500 });

		// Listen for storage changes and update both refs
		sync.onChanged.addListener((changes) => {
			const change = changes[key];
			if (change !== undefined && change.newValue !== undefined) {
				internalValue = change.newValue as RawValue;
				setValue(JSON.parse(internalValue.value) as T);
			}
		});
	}
	return parentValue;
}

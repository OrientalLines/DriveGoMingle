import { writable as internal } from 'svelte/store';
import { browser } from '$app/environment';

export function persisted<T>(key: string, initialValue: T) {
	// Check if we're in the browser environment
	if (!browser) {
		return internal(initialValue);
	}

	// Get stored value
	const storedValueStr = localStorage.getItem(key);
	const storedValue = storedValueStr ? JSON.parse(storedValueStr) : initialValue;

	// Create the writable store
	const store = internal(storedValue);
	const { subscribe, set } = store;

	return {
		subscribe,
		set: (value: T) => {
			localStorage.setItem(key, JSON.stringify(value));
			return set(value);
		},
		update: (fn: (value: T) => T) => {
			const value = fn(storedValue);
			localStorage.setItem(key, JSON.stringify(value));
			return set(value);
		}
	};
}

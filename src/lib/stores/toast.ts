import { writable } from 'svelte/store';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
	message: string;
	type: ToastType;
	id?: number;
}

function createToastStore() {
	const { subscribe, update } = writable<ToastMessage[]>([]);

	return {
		subscribe,
		show: (toast: ToastMessage) => {
			const id = Date.now();
			update((toasts) => [...toasts, { ...toast, id }]);
			setTimeout(() => {
				update((toasts) => toasts.filter((t) => t.id !== id));
			}, 3000);
		}
	};
}

export const toast = createToastStore();

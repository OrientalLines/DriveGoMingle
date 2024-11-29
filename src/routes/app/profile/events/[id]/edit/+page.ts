import type { PageLoad } from './$types';
import { events } from '$lib/stores/events';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const allEvents = get(events);
	const event = allEvents.find((e) => e.id === parseInt(params.id));

	if (!event) {
		throw error(404, 'Event not found');
	}

	return { event };
};

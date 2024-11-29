import { get } from 'svelte/store';
import { events } from '$lib/stores/events';

export async function load({ params }) {
    const allEvents = get(events);
    return { 
        event: allEvents.find((event) => event.id === Number(params.id)) 
    };
}
<script>
	import { goto } from '$app/navigation';
	import { addEvent } from '$lib/stores/events';
	import EventForm from './EventForm.svelte';
	import InviteSection from './InviteSection.svelte';
	import SummarySection from './SummarySection.svelte';

	let eventData = {
		title: '',
		date: '',
		time: '',
		address: '',
		description: '',
		isPublic: true,
		participantsLimit: 100
	};

	let users = [
		{ id: 1, name: 'Ryan Gosling', status: 'The coolest driver', selected: false },
		{ id: 2, name: 'Bob Gooal', status: 'Dynamic Security Technician', selected: false },
		{ id: 3, name: 'Alt Girl', status: 'The real one from gosuslugi', selected: false },
	];

	let showInviteSection = false;
	let showSummarySection = false;

	function handleSubmit() {
		const eventId = addEvent(eventData);
		goto(`/app/profile/events/${eventId}`);
	}
</script>

{#if showSummarySection}
	<SummarySection
		{eventData}
		{users}
		onBack={() => {
			showSummarySection = false;
			showInviteSection = true;
		}}
		onSubmit={handleSubmit}
	/>
{:else if showInviteSection}
	<InviteSection
		{users}
		onBack={() => showInviteSection = false}
		onNext={() => showSummarySection = true}
	/>
{:else}
	<EventForm
		eventData={eventData}
		onNext={() => showInviteSection = true}
	/>
{/if}

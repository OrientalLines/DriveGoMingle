<script>
	import EventForm from './EventForm.svelte';
	import InviteSection from './InviteSection.svelte';
	import SummarySection from './SummarySection.svelte';

	let eventData = {
		title: '',
		date: '',
		address: '',
		isPublic: false
	};

	let users = [
		{ id: 1, name: 'Ryan Gosling', role: 'The coolest driver', selected: false },
		{ id: 2, name: 'Bob Gooal', role: 'Dynamic Security Technician', selected: false },
		{ id: 3, name: 'Alt Girl', role: 'The real one from gosuslugi', selected: false },
	];

	let showInviteSection = false;
	let showSummarySection = false;

	function handleSubmit() {
		console.log('Event data:', eventData);
		// TODO: Handle form submission
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
		{eventData}
		onNext={() => showInviteSection = true}
	/>
{/if}

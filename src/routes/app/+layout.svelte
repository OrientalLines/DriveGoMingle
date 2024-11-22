<script lang="ts">
	import { goto } from '$app/navigation';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let currentView: 'feed' | 'profile' | 'chats' = 'feed';

	// Update currentView whenever the path changes
	$: {
		const path = $page.url.pathname;
		currentView = path.split('/')[2] as 'feed' | 'profile' | 'chats';
	}

	onMount(() => {
		currentView = window.location.pathname.split('/')[2] as 'feed' | 'profile' | 'chats';
	});
</script>

<div class="min-h-screen pb-20 text-white">
	<!-- Main Content -->
	<main class="p-4">
		<slot />
	</main>

	<NavBar
		currentView={currentView}
		onViewChange={(view) => {
			goto(`/app/${view}`);
		}}
	/>
</div>

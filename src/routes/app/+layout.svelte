<script lang="ts">
	import { goto } from '$app/navigation';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { hideNav } from '$lib/stores/navigation';

	let currentView: 'feed' | 'profile' | 'chats' = 'feed';

	$: {
		const path = $page.url.pathname;
		currentView = path.split('/')[2] as 'feed' | 'profile' | 'chats';
		if (path.includes('/chats/direct/')) {
			hideNav.set(true);
		} else {
			hideNav.set(false);
		}
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

	<!-- Changed from !hideNav to !$hideNav to make it reactive -->
	{#if !$hideNav}
		<NavBar
			{currentView}
			onViewChange={(view) => {
				goto(`/app/${view}`);
			}}
		/>
	{/if}
</div>

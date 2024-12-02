<script lang="ts">
	import { goto } from '$app/navigation';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { hideNav } from '$lib/stores/navigation';
	import { browser } from '$app/environment';

	let currentView: 'feed' | 'profile' | 'chats' = 'feed';

	const viewTitles = {
		feed: 'Лента',
		profile: 'Профиль',
		chats: 'Чаты'
	} as const;

	$: {
		const path = $page.url.pathname;

		// Do not try to show nav on chats direct page
		currentView = path.split('/')[2] as 'feed' | 'profile' | 'chats';
		if (path.includes('/chats/direct/')) {
			hideNav.set(true);
		} else {
			hideNav.set(false);
		}
		// Set page title
		if (browser) {
			document.title = viewTitles[currentView] || 'App';
		}
	}

	onMount(() => {
		currentView = window.location.pathname.split('/')[2] as 'feed' | 'profile' | 'chats';
	});
</script>

<div class="min-h-screen pb-20 text-white">
	<main class="p-4">
		<slot />
	</main>

	{#if !$hideNav}
		<NavBar
			{currentView}
			onViewChange={(view) => {
				goto(`/app/${view}`);
			}}
		/>
	{/if}
</div>

<style>
	/* Ensure main content and navbar have a lower z-index than the popup */
	:global(main),
	:global(nav) {
		z-index: 10;
	}
</style>

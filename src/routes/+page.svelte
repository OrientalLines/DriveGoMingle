<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Splash from './splash.svelte';
	import { fade } from 'svelte/transition';
	import { persisted } from '$lib/stores/persisted';

	// Use the same persisted store
	const isAuthenticated = persisted('isAuthenticated', false);
	let showSplash = true;

	onMount(() => {
		// Subscribe to authentication state
		isAuthenticated.subscribe((value) => {
			if (value) {
				handleNavigation('/app');
			}
		});

		// If not authenticated, handle onboarding flow
		const hasVisited = localStorage.getItem('hasVisitedBefore');

		if (hasVisited) {
			handleNavigation('/onboarding');
		} else {
			setTimeout(() => {
				handleNavigation('/onboarding');
				localStorage.setItem('hasVisitedBefore', 'true');
			}, 2000);
		}
	});

	function handleNavigation(path: string) {
		showSplash = false;
		setTimeout(() => {
			goto(path);
		}, 300); // Match fade duration
	}
</script>

{#if showSplash}
	<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
		<Splash />
	</div>
{/if}

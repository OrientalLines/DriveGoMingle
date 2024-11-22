<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Splash from './splash.svelte';
	import { fade } from 'svelte/transition';

	let showSplash = true;
	let isAuthenticated = true; // Replace with your actual auth logic

	onMount(() => {
		// Check authentication first
		if (isAuthenticated) {
			handleNavigation('/app');
			return;
		}

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

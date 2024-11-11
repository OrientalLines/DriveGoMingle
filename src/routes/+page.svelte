<script lang="ts">
	import { onMount } from 'svelte';
	import Splash from './splash.svelte';
	import Carousel from './onboarding/+page.svelte';
	import Main from './main/+page.svelte';
	import { fade } from 'svelte/transition';

	let currentPage: 'splash' | 'carousel' | 'main' = 'splash';
	let isAuthenticated = true; // Replace with your actual auth logic

	onMount(() => {
		// Check authentication first
		if (isAuthenticated) {
			currentPage = 'main';
			return;
		}

		// If not authenticated, handle onboarding flow
		const hasVisited = localStorage.getItem('hasVisitedBefore');

		if (hasVisited) {
			currentPage = 'carousel';
		} else {
			setTimeout(() => {
				currentPage = 'carousel';
				localStorage.setItem('hasVisitedBefore', 'true');
			}, 2000);
		}
	});
</script>

{#if currentPage === 'splash'}
	<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
		<Splash />
	</div>
{:else if !isAuthenticated}
	<div>
		<Carousel />
	</div>
{:else}
	<Main />
{/if}

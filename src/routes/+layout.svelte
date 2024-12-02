<script lang="ts">
	import '../app.css';
	import { fade } from 'svelte/transition';
	import Toast from '$lib/components/Toast.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-dark-gradient">
	{#key children}
		<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
			{@render children()}
		</div>
	{/key}
</div>

<Toast />

<style>
	/* Optional: Ensure the gradient covers the full viewport */
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>

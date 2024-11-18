<script lang="ts">
	import '../app.css';
	import { fade } from 'svelte/transition';
	let { children } = $props();
</script>

<div class="bg-dark-gradient min-h-screen">
    {#key children}
        <div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
            {@render children()}
        </div>
    {/key}
</div>

<style>
    /* Optional: Ensure the gradient covers the full viewport */
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>

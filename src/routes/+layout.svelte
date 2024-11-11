<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="bg-dark-gradient min-h-screen">
    {@render children()}
</div>

<style>
    /* Optional: Ensure the gradient covers the full viewport */
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>

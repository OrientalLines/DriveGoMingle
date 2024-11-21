<script lang="ts">
	import { fly } from 'svelte/transition';

	export let message: string;
	export let visible = false;
</script>

{#if visible}
	<div class="absolute left-0 right-0 top-0" transition:fly={{ y: -10, duration: 300 }}>
		<div
			class="flex items-center justify-center gap-2 rounded-b-2xl bg-purple-500 p-4 text-white shadow-lg"
		>
			<span>{message}</span>
		</div>
	</div>
{/if}

<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import { fly } from 'svelte/transition';
</script>

<div class="fixed left-0 right-0 top-0 z-50 flex flex-col gap-2">
	{#each $toast as notification (notification.id)}
		<div
			transition:fly={{ y: -100, duration: 300 }}
			class="w-full rounded-b-xl bg-background-secondary p-4 shadow-lg"
			class:bg-green-500={notification.type === 'success'}
			class:bg-red-500={notification.type === 'error'}
			class:bg-blue-500={notification.type === 'info'}
			class:bg-yellow-500={notification.type === 'warning'}
		>
			<p class="text-md text-center text-white">{notification.message}</p>
		</div>
	{/each}
</div>

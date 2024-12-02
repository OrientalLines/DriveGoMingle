<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let {
		open = false,
		title,
		description,
		onclose,
		children
	} = $props<{
		open?: boolean;
		title: string;
		description?: string;
		onclose?: () => void;
		children?: unknown;
	}>();

	function closeDialog() {
		open = false;
		onclose?.();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeDialog();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeDialog();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />
{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		transition:fade={{ duration: 200 }}
	>
		<div class="fixed inset-0 bg-background/50 backdrop-blur-sm" aria-hidden="true"></div>

		<div
			class="relative w-full max-w-md rounded-lg bg-background-secondary p-6 shadow-xl"
			transition:fly={{ y: 20, duration: 200 }}
		>
			<!-- Header -->
			<div class="mb-6 text-center">
				<h2 class="text-xl font-semibold leading-6">{title}</h2>
				{#if description}
					<p class="text-muted-foreground mt-2 text-sm text-gray-400">{description}</p>
				{/if}
			</div>

			<!-- Footer -->
			<div class="mt-8 flex justify-end gap-3">
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}

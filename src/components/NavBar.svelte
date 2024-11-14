<script lang="ts">
	import { MessageSquare, Plus, UserRound } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Newspaper } from 'lucide-svelte';

	export let currentView: 'feed' | 'profile' | 'chats';
	export let onViewChange: (view: 'feed' | 'profile' | 'chats') => void;

	const navItems = [
		{ label: 'ПРОФИЛЬ', icon: UserRound, view: 'profile' },
		{ label: 'ЛЕНТА', icon: Newspaper, view: 'feed' },
		{ label: 'ЧАТЫ', icon: MessageSquare, view: 'chats' }
	];

	function handleViewChange(view: 'feed' | 'profile' | 'chats') {
		onViewChange(view);
	}
</script>

<nav class="safe-area-bottom fixed bottom-0 left-0 right-0 bg-background/10 backdrop-blur-lg">
	<div class="mx-auto flex max-w-screen-sm items-center justify-between px-4 py-3 sm:px-6">
		{#each navItems as item}
			<button
				on:click={() => handleViewChange(item.view as 'feed' | 'profile' | 'chats')}
				class="group relative flex w-[18%] min-w-14 flex-col items-center justify-center text-white transition-colors"
			>
				<div class="relative z-10 flex flex-col items-center justify-center">
					<svelte:component
						this={item.icon}
						class={`h-[24px] w-[24px] stroke-[2px] transition-all duration-300 sm:h-[26px] sm:w-[26px] ${
							currentView === item.view ? 'scale-110 text-secondary' : 'text-gray-400'
						}`}
					/>
					<span
						class="mt-1.5 block text-center text-[10px] font-bold transition-all duration-300 sm:text-[11px]"
						class:text-secondary={currentView === item.view}
						class:text-gray-400={currentView !== item.view}
					>
						{item.label}
					</span>
				</div>

				{#if currentView === item.view}
					<div
						in:scale={{ duration: 200, delay: 0, opacity: 0.5, easing: cubicOut, start: 0.95 }}
						out:fade={{ duration: 100 }}
						class="absolute inset-0 rounded-2xl bg-secondary/10"
						style="clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);"
					></div>
				{/if}
			</button>
		{/each}

		<button
			class="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg transition-all hover:bg-primary/80 sm:h-16 sm:w-16"
		>
			<div class="flex flex-col items-center justify-center">
				<Plus class="h-7 w-7 stroke-[1.5px] text-white sm:h-8 sm:w-8" />
			</div>
		</button>
	</div>
</nav>

<style>
	/* Add safe area support for iOS devices */
	.safe-area-bottom {
		padding-bottom: env(safe-area-inset-bottom, 0px);
	}
</style>

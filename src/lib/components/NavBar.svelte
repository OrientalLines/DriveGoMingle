<script lang="ts">
	import { MessageSquare, Plus, UserRound } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';
	import { Newspaper } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let currentView: 'feed' | 'profile' | 'chats';
	export let onViewChange: (view: 'feed' | 'profile' | 'chats') => void;

	const navItems = [
		{ label: 'ЧАТЫ', icon: MessageSquare, view: 'chats' },
		{ label: 'ЛЕНТА', icon: Newspaper, view: 'feed' },
		{ label: 'ПРОФИЛЬ', icon: UserRound, view: 'profile' }
	];

	let showCreateMenu = false;

	const createOptions = [
		{
			label: 'Создать мероприятие',
			action: () => goto('/app/new/event'),
			icon: '⌚' // You might want to replace this with a proper icon component
		},
		{
			label: 'Создать группу',
			action: () => goto('/app/new/chat'),
			icon: '👥' // You might want to replace this with a proper icon component
		}
	];

	function handleViewChange(view: 'feed' | 'profile' | 'chats') {
		onViewChange(view);
	}

	// Add click outside handler
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (showCreateMenu && target && !target.closest('button')) {
				showCreateMenu = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<nav class="safe-area-bottom fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg">
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
						in:scale={{ duration: 300, start: 0.8 }}
						out:fade={{ duration: 200 }}
						class="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-b from-secondary/30 to-secondary/5"
					></div>
					<div
						in:scale={{ duration: 400, delay: 100, start: 0.7 }}
						out:fade={{ duration: 150 }}
						class="absolute -inset-0.5 -z-20 rounded-xl bg-gradient-to-t from-secondary/20 to-secondary/5 blur-sm"
					></div>
				{/if}
			</button>
		{/each}

		<button
			on:click={() => (showCreateMenu = !showCreateMenu)}
			class="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg transition-all hover:bg-primary/80 sm:h-16 sm:w-16"
		>
			<div class="flex flex-col items-center justify-center">
				<Plus class="h-7 w-7 stroke-[1.5px] text-white sm:h-8 sm:w-8" />
			</div>
		</button>
	</div>
</nav>

{#if showCreateMenu}
	<div
		class="fixed inset-0 z-[100] flex items-end bg-background-secondary/30 backdrop-blur-md"
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 150 }}
	>
		<div
			class="w-full max-h-[80vh] overflow-y-auto rounded-t-3xl bg-background-secondary shadow-lg"
			in:scale={{ duration: 200, start: 0.95, opacity: 0 }}
			out:fade={{ duration: 150 }}
		>
			{#each createOptions as option, index}
				<button
					on:click|stopPropagation={() => {
						option.action();
						showCreateMenu = false;
					}}
					class="flex w-full items-center gap-3 px-6 py-4 text-left text-white transition-colors active:bg-white/20 {index === 0 ? 'rounded-t-3xl' : ''}"
				>
					<span class="text-2xl">{option.icon}</span>
					<span class="text-base font-medium tracking-wide">{option.label}</span>
				</button>
				{#if index !== createOptions.length - 1}
					<div class="mx-4 h-px bg-white/10"></div>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style>
	/* Add safe area support for iOS devices */
	.safe-area-bottom {
		padding-bottom: env(safe-area-inset-bottom, 0px);
	}
</style>

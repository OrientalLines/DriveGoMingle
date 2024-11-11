<script lang="ts">
	import { Home, MessageSquare, Plus, User2 } from 'lucide-svelte';
	import { page } from '$app/stores';

	const navItems = [
		{ label: 'ПРОФИЛЬ', icon: User2, href: '/profile' },
		{ label: 'ЛЕНТА', icon: Home, href: '/events' },
		{ label: 'ЧАТЫ', icon: MessageSquare, href: '/chats' }
	];
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-[#1A1B1F] border-t border-gray-800">
	<div class="flex justify-between items-center px-6 py-2">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center transition-colors text-white"
				class:text-secondary={$page.url.pathname === item.href}
				class:text-gray-400={$page.url.pathname !== item.href}
			>
				<svelte:component
					this={item.icon}
					class="w-[22px] h-[22px] stroke-[2px] text-white"
				/>
				<span class="text-[10px] mt-1 font-bold text-white">{item.label}</span>
			</a>
		{/each}

		<div class="relative -mt-8">
			<button
				class="flex items-center justify-center bg-primary rounded-full w-14 h-14 hover:bg-primary/80 transition-all shadow-lg"
			>
				<Plus
					class="w-7 h-7 text-white stroke-[1.5px]"
				/>
			</button>
		</div>
	</div>
</nav>

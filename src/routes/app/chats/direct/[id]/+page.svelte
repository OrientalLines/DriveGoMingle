<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Info, Paperclip, Phone } from 'lucide-svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { goto } from '$app/navigation';
	import { hideNav } from '$lib/stores/navigation';
	import { onMount, onDestroy } from 'svelte';

	let messages = [
		{
			sender: 'Garrett Reid',
			avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
			time: '12:11 PM',
			content: 'Hi man, how are you doing?',
			isOwn: false
		},
		{
			sender: 'User',
			content: 'Doing well, thanks! 👋',
			isOwn: true
		},
		{
			sender: 'Garrett Reid',
			avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
			time: '12:11 PM',
			content: 'Залетай к нам, бро!',
			isOwn: false
		},
		{
			sender: 'Garrett Reid',
			avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
			isOwn: false,
			event: {
				title: 'Очень клёвая туса',
				description: 'Even more cool description of this event',
				image: '/placeholder.jpg',
				actionText: 'Перейти'
			}
		}
	];

	onMount(() => {
		hideNav.set(true);
	});

	onDestroy(() => {
		hideNav.set(false);
	});
</script>

<div
	class="space-y-8 text-white h-[calc(100vh-72px)]"
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 300 }}
>
	<!-- Header -->
	<header class="flex w-full items-center">
		<BackButton />
		<div class="flex flex-1 items-center justify-center gap-2">
			<div class="h-2 w-2 rounded-full bg-light-green"></div>
			<span class="text-lg font-medium">Garrett Reid</span>
		</div>
		<div class="flex">
			<button class="rounded-full p-2">
				<Phone class="h-6 w-6 stroke-[1.5px] text-white" />
			</button>
			<button class="rounded-full p-2">
				<Info class="h-6 w-6 stroke-[1.5px] text-white" />
			</button>
		</div>
	</header>

	<!-- Messages -->
	<div class="flex-1 space-y-4 overflow-y-auto">
		{#each messages as message}
			<div class="flex {message.isOwn ? 'justify-end' : 'gap-2'}">
				{#if !message.isOwn}
					<img src={message.avatar} alt="" class="h-10 w-10 rounded-full" />
				{/if}
				<div class="max-w-[70%]">
					{#if !message.isOwn}
						<div class="mb-1 flex items-center gap-2">
							<span class="font-medium">{message.sender}</span>
							<span class="text-sm text-deactivated">{message.time}</span>
						</div>
					{/if}

					{#if message.event}
						<div class="overflow-hidden rounded-2xl bg-background-secondary/50">
							<div class="flex gap-4 p-4">
								<div class="flex-1">
									<h3 class="text-lg font-medium">{message.event.title}</h3>
									<p class="mt-1 text-sm text-deactivated">{message.event.description}</p>
									<button
										class="mt-3 w-full rounded-full border-2 border-secondary px-4 py-2 text-sm font-semibold"
										on:click={() => goto('/app/feed/event/6')}
									>
										{message.event.actionText}
									</button>
								</div>
								<div class="aspect-[9/16] w-24 overflow-hidden rounded-md">
									<img src={message.event.image} alt="" class="h-full w-full object-cover" />
								</div>
							</div>
						</div>
					{:else}
						<div
							class="rounded-2xl px-4 py-3 {message.isOwn
								? 'bg-primary'
								: 'bg-background-secondary/50'}"
						>
							<p>{message.content}</p>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Input Area -->
	<div
		class="fixed bottom-0 left-0 right-0 mb-[72px] flex w-full items-center rounded-t-2xl bg-background-secondary p-4"
	>
		<button class="rounded-full bg-primary p-2 sm:p-3">
			<Paperclip class="h-6 w-6 stroke-[1.5px] text-white sm:h-7 sm:w-7" />
		</button>
		<input
			type="text"
			placeholder="Написать сообщение"
			class="ml-2 h-12 w-full flex-1 rounded-full bg-background px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary sm:h-12 sm:text-lg"
		/>
	</div>
</div>

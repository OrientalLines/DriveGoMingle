<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import { EventStatus, EventType } from '$lib/types';
	import { goto } from '$app/navigation';
	import { events } from '$lib/stores/events';

	const user = {
		name: 'Blake Goooal',
		email: 'blake@email.com',
		avatar:
			'https://storage.vscl.ru/logos/a1/32/e6/a132e6ef0776dc37ed1f8a25d0140a95b0fa4f10.png?s=400'
	};

	// Subscribe to events store and filter for organizing/participating
	$: organizing = $events.filter((event) => event.authorUsername === 'kxrxh');
	$: participating = $events.filter(
		(event) => event.isParticipant && event.authorUsername !== 'kxrxh'
	);

	// Add loading state
	let loading = true;

	// Simulate loading (remove this in production and use real data fetching)
	setTimeout(() => {
		loading = false;
	}, 500);

	const handleViewAllOrganizing = () => {
		goto('profile/events/organizing', { replaceState: false });
	};

	const handleViewAllParticipating = () => {
		goto('profile/events/participating', { replaceState: false });
	};

	const onEdit = () => {
		goto('profile/edit', { replaceState: false });
	};
</script>

<div class="min-h-screen">
	{#if loading}
		<div class="animate-pulse">
			<div class="mb-10 flex flex-col items-center">
				<div class="mb-3 h-36 w-36 rounded-full bg-background-secondary/50"></div>
				<div class="mb-2 h-6 w-48 rounded bg-background-secondary/50"></div>
				<div class="mb-5 h-4 w-40 rounded bg-background-secondary/50"></div>
				<div class="mb-3 h-12 w-2/3 rounded-full bg-background-secondary/50"></div>
				<div class="h-12 w-2/3 rounded-full bg-background-secondary/50"></div>
			</div>

			<div class="mb-8">
				<div class="mb-2 h-6 w-32 rounded bg-background-secondary/50"></div>
				<div class="mb-5 h-4 w-24 rounded bg-background-secondary/50"></div>

				<div class="my-5 grid gap-4">
					{#each Array(2) as _}
						<div class="h-40 rounded-xl bg-background-secondary/50"></div>
					{/each}
				</div>
				<div class="h-12 rounded-lg bg-background-secondary/50"></div>
			</div>

			<div>
				<div class="mb-2 h-6 w-32 rounded bg-background-secondary/50"></div>
				<div class="mb-5 h-4 w-24 rounded bg-background-secondary/50"></div>

				<div class="my-5 grid gap-4">
					{#each Array(2) as _}
						<div class="h-40 rounded-xl bg-background-secondary/50"></div>
					{/each}
				</div>
				<div class="h-12 rounded-lg bg-background-secondary/50"></div>
			</div>
		</div>
	{:else}
		<header class="relative mb-10 text-center">
			<img src={user.avatar} alt="Profile avatar" class="mx-auto mb-3 h-36 w-36 rounded-full" />
			<h1 class="text-3xl font-semibold">{user.name}</h1>
			<p class="mb-5 font-medium text-light-green">{user.email}</p>

			<div class="flex flex-col items-center gap-3">
				<button
					class="w-2/3 rounded-full border-2 border-primary px-4 py-3 font-medium text-white"
					on:click={onEdit}
				>
					Редактировать профиль
				</button>
				<button class="w-2/3 rounded-full border-2 border-red-300 px-4 py-3 font-medium text-white">
					Выйти из аккаунта
				</button>
			</div>
		</header>

		<div class="mb-8">
			<h2 class="text-md mb-2 text-center font-medium uppercase text-deactivated">
				Ваши мероприятия
			</h2>
			<div
				class="mb-6 h-px w-full bg-gradient-to-r from-transparent via-deactivated/50 to-transparent"
			></div>
		</div>

		<section class="mb-8">
			<h2 class="mb-1 text-2xl font-semibold">Организую</h2>
			<p class="text-sm font-medium text-gray-500">{organizing.length} мероприятий</p>

			<div class="my-5 grid grid-cols-2 gap-4">
				{#each organizing.slice(0, 2) as event}
					<button class="text-left" on:click={() => goto(`profile/events/${event.id}`)}>
						<EventCard event={{
							...event,
							type: event.type as EventType
						}} />
					</button>
				{/each}
			</div>
			<button
				on:click={handleViewAllOrganizing}
				class="w-full rounded-xl border-2 border-primary px-4 py-3 font-medium text-white"
			>
				Посмотреть все
			</button>
		</section>

		<section>
			<h2 class="mb-1 text-2xl font-semibold">Участвую</h2>
			<p class="text-sm font-medium text-gray-500">{participating.length} мероприятий</p>

			<div class="my-5 grid grid-cols-2 gap-4">
				{#each participating.slice(0, 2) as event}
					<button class="text-left" on:click={() => goto(`profile/events/${event.id}`)}>
						<EventCard event={{
							...event,
							type: event.type as EventType
						}} />
					</button>
				{/each}
			</div>
			<button
				class="w-full rounded-xl border-2 border-secondary px-4 py-3 font-medium text-white"
				on:click={handleViewAllParticipating}
			>
				Посмотреть все
			</button>
		</section>
	{/if}
</div>

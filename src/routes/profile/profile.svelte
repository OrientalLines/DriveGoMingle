<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import { EventStatus, EventType } from '$lib/types';

	const user = {
		name: 'Blake Goooal',
		email: 'blake@email.com',
		avatar:
			'https://storage.vscl.ru/logos/a1/32/e6/a132e6ef0776dc37ed1f8a25d0140a95b0fa4f10.png?s=400',
		organizing: [
			{
				title: 'Встреча владельцев BMW',
				status: EventStatus.COMPLETED,
				participants: 50,
				participantsLimit: 50,
				type: EventType.PUBLIC,
			},
			{
				title: 'Ралли ретро-автомобилей',
				status: EventStatus.IN_PROGRESS,
				participants: 15,
				participantsLimit: 30,
				type: EventType.PRIVATE,
			},
			{
				title: 'Автомобильный фестиваль',
				status: EventStatus.PLANNED,
				participants: 200,
				participantsLimit: 500,
				type: EventType.PUBLIC,
			},
			{
				title: 'Мастер-класс по автозвуку',
				status: EventStatus.IN_PROGRESS,
				participants: 18,
				participantsLimit: 20,
				type: EventType.PRIVATE,
			}
		],
		participating: [
			{
				title: 'Выставка тюнингованных авто',
				status: EventStatus.PLANNED,
				participants: 80,
				participantsLimit: 100,
				type: EventType.PUBLIC,
			},
			{
				title: 'Гонки на внедорожниках',
				status: EventStatus.COMPLETED,
				participants: 25,
				participantsLimit: 25,
				type: EventType.PUBLIC,
			},
			{
				title: 'Парад классических автомобилей',
				status: EventStatus.PLANNED,
				participants: 45,
				participantsLimit: 60,
				type: EventType.PUBLIC,
			},
			{
				title: 'Автомобильный квест по городу',
				status: EventStatus.IN_PROGRESS,
				participants: 30,
				participantsLimit: 40,
				type: EventType.PRIVATE,
			},
			{
				title: 'Семинар по безопасному вождению',
				status: EventStatus.PLANNED,
				participants: 15,
				participantsLimit: 30,
				type: EventType.PUBLIC,
			}
		]
	};

	// Add loading state
	let loading = true;

	// Simulate loading (remove this in production and use real data fetching)
	setTimeout(() => {
		loading = false;
	}, 500);

	export let onEdit: () => void;
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
			<p class="mb-5 text-light-green font-medium">{user.email}</p>

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

		<section class="mb-8">
			<h2 class="mb-1 text-2xl font-semibold">Организую</h2>
			<p class="text-sm font-medium text-gray-500">{user.organizing.length} митапов</p>

			<div class="my-5 grid grid-cols-2 gap-4">
				{#each user.organizing.slice(0, 2) as event}
					<EventCard {event} />
				{/each}
			</div>
			<button class="w-full rounded-lg border-2 border-primary px-4 py-3 font-medium text-white">
				Посмотреть все
			</button>
		</section>

		<section>
			<h2 class="mb-1 text-2xl font-semibold">Участвую</h2>
			<p class="text-sm font-medium text-gray-500">{user.participating.length} митапов</p>

			<div class="my-5 grid grid-cols-2 gap-4">
				{#each user.participating.slice(0, 2) as event}
					<EventCard {event} />
				{/each}
			</div>
			<button class="w-full rounded-lg border-2 border-secondary px-4 py-3 font-medium text-white">
				Посмотреть все
			</button>
		</section>
	{/if}
</div>

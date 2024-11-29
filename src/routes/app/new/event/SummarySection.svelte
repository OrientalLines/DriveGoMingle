<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import { Calendar, MapPin, Users } from 'lucide-svelte';
	import { goto, pushState } from '$app/navigation';
	import { addEvent } from '$lib/stores/events';
	import { EventType } from '$lib/types';

	export let eventData: any;
	export let users: any;
	export let onBack;
	export let onSubmit;

	function getInitials(name: string) {
		return name
			.split(' ')
			.map((word: string) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	async function handleSubmit() {
		const newEventId = addEvent({
			title: eventData.title,
			description: eventData.description,
			location: eventData.address,
			date: eventData.date,
			time: eventData.time,
			type: eventData.isPublic ? EventType.PUBLIC : EventType.PRIVATE,
			participantsLimit: 100,
			photos: []
		});

		// I FUCKING HATE THIS STUPID FUCKING SVELTE
		goto(`/app/profile/events/${newEventId}`);
	}
</script>

<div class="space-y-8">
	<header class="relative flex items-center">
		<BackButton onClick={onBack} />
		<h1 class="w-full text-center text-2xl font-bold">Проверьте детали</h1>
	</header>

	<main class="space-y-6 rounded-xl p-4">
		<!-- Event Info -->
		<div class="flex items-start gap-4">
			<div
				class="text-md flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 font-bold text-purple-400"
			>
				{getInitials('Your Name')}
			</div>
			<div class="flex flex-col">
				<h1 class="mb-1.5 text-2xl font-bold text-white">
					{eventData.title}
				</h1>
				<div class="text-muted-foreground flex items-center gap-2 text-sm">
					<span>организатор:</span>
					<span class="font-medium text-purple-400">@username</span>
				</div>
			</div>
		</div>

		<!-- Description -->
		{#if eventData.description}
			<div class="rounded-xl bg-background-secondary/50 p-4">
				<h3 class="mb-2 text-lg font-medium">Описание</h3>
				<p class="text-muted-foreground text-deactivated">
					{eventData.description}
				</p>
			</div>
		{/if}

		<!-- Event Details -->
		<div class="flex flex-col gap-4 rounded-xl bg-background-secondary/50 p-4 shadow-lg">
			<h3 class="mb-2 text-xl font-semibold text-white/90">Детали мероприятия</h3>
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-light-green/30 transition-all duration-300 hover:bg-light-green/40"
					>
						<MapPin class="h-5 w-5 text-light-green" />
					</div>
					<div class="flex flex-col">
						<span class="text-xs font-medium text-white/60">Место проведения</span>
						<span class="text-sm text-white">{eventData.address}</span>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/30 transition-all duration-300 hover:bg-secondary/40"
					>
						<Calendar class="h-5 w-5 text-secondary" />
					</div>
					<div class="flex flex-col">
						<span class="text-xs font-medium text-white/60">Дата и время</span>
						<span class="text-sm text-white">
							{new Date(eventData.date).toLocaleDateString('ru-RU', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})} в {eventData.time}
						</span>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30 transition-all duration-300 hover:bg-primary/40"
					>
						<Users class="h-5 w-5 text-primary" />
					</div>
					<div class="flex flex-col">
						<span class="text-xs font-medium text-white/60">Участники</span>
						<span class="text-sm text-white">До {eventData.participantsLimit} человек</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Event Type -->
		<div class="rounded-xl bg-background-secondary/50 p-4">
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<span class="text-lg font-medium text-white/90">Тип мероприятия</span>
					<p class="text-sm text-deactivated">
						{eventData.isPublic ? 'Открытое мероприятие' : 'Закрытое мероприятие'}
					</p>
				</div>
			</div>
		</div>

		<!-- Participants -->
		{#if users.filter((u: { selected: any }) => u.selected).length > 0}
			<div class="space-y-4 rounded-xl bg-background-secondary/50 p-4">
				<h2 class="text-lg font-medium text-white/90">
					Приглашенные ({users.filter((u: { selected: any }) => u.selected).length})
				</h2>

				<div class="space-y-3">
					{#each users.filter((u: any) => u.selected).slice(0, 3) as user}
						<div class="flex items-center gap-3">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-lg font-medium text-white"
							>
								{user.name.charAt(0).toUpperCase()}
							</div>
							<div>
								<p class="font-medium text-white">{user.name}</p>
								<p class="text-sm text-deactivated">{user.role}</p>
							</div>
						</div>
					{/each}

					{#if users.filter((u: { selected: any }) => u.selected).length > 3}
						<p class="text-sm text-deactivated">
							И еще {users.filter((u: { selected: any }) => u.selected).length - 3} пользователей
						</p>
					{/if}
				</div>
			</div>
		{/if}
	</main>

	<button
		class="flex w-full items-center justify-center rounded-lg border-2 border-light-green py-3.5 text-white transition-all hover:opacity-90"
		on:click={onSubmit}
	>
		<span class="font-medium">Создать мероприятие</span>
	</button>
</div>

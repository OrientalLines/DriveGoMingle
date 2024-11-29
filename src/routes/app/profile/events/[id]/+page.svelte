<script lang="ts">
	import {
		Calendar,
		ImagePlus,
		MapPin,
		MessageCircle,
		MoreVertical,
		Pencil,
		Users
	} from 'lucide-svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { Browser } from '@capacitor/browser';
	import { goto } from '$app/navigation';
	import Dialog from '$lib/components/Dialog.svelte';
	import { leaveEvent } from '$lib/stores/events';

	const user = 'kxrxh';

	export let data;
	const { event } = data;

	let activeTab: 'info' | 'participants' = 'info';
	let searchQuery = '';

	let showDeleteDialog = false;

	const dummyParticipants = [
		{ id: 1, name: 'Александр Петров', avatar: '' },
		{ id: 2, name: 'Мария Иванова', avatar: '' },
		{ id: 3, name: 'Дмитрий Сидоров', avatar: '' }
	];

	function getInitials(name: string) {
		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	async function openLocation(location: string) {
		const encodedLocation = encodeURIComponent(location);
		try {
			await Browser.open({
				url: `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
			});
		} catch (error) {
			console.error('Error opening map:', error);
		}
	}

	function handleDeleteEvent() {
		console.log('Deleting event:', event?.id);
		showDeleteDialog = false;
	}

	function handleLeaveEvent() {
		if (event?.id) {
			leaveEvent(event.id);
		}
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<header class="relative flex items-center justify-between">
		<BackButton />

		<div class="flex items-center gap-2">
			{#if event?.authorUsername === user}
				<button
					class="hover:bg-muted/10 rounded-full p-2"
					on:click={() => goto(`/app/profile/events/${event.id}/edit`)}
				>
					<Pencil size={20} />
				</button>
			{/if}

			<button class="hover:bg-muted/10 rounded-full p-2">
				<MoreVertical size={20} />
			</button>
		</div>
	</header>

	<!-- Add Navigation tabs -->
	<div class="flex w-full justify-center">
		<div class="inline-flex w-full rounded-full bg-background-secondary/50 text-sm">
			<button
				class="flex-1 px-3 py-1.5 font-semibold {activeTab === 'info'
					? 'bg-primary text-white'
					: 'text-gray-400'} first:rounded-l-full"
				on:click={() => (activeTab = 'info')}>Инфо</button
			>
			<button
				class="flex-1 px-3 py-1.5 font-semibold {activeTab === 'participants'
					? 'bg-primary text-white'
					: 'text-gray-400'} last:rounded-r-full"
				on:click={() => (activeTab = 'participants')}>Участники</button
			>
		</div>
	</div>

	<!-- Main content -->
	{#if activeTab === 'info'}
		<main class="space-y-6">
			<!-- Event Info -->
			<div class="flex items-start gap-4">
				{#if event?.authorAvatar}
					<img
						src={event.authorAvatar}
						alt={event.authorUsername}
						class="h-10 w-10 rounded-full object-cover"
					/>
				{:else}
					<div
						class="text-md flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 font-bold text-purple-400"
						style="min-width: 2.5rem; min-height: 2.5rem;"
					>
						{getInitials(event?.authorUsername || '')}
					</div>
				{/if}
				<div class="flex flex-col">
					<h1
						class="mb-1.5 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent text-white"
					>
						{event?.title || 'Some cool Event'}
					</h1>
					<div class="text-muted-foreground flex items-center gap-2 text-sm">
						<span>организатор:</span>
						<span class="font-medium text-purple-400">@{event?.authorUsername || 'username'}</span>
					</div>
				</div>
			</div>

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
							<span class="text-sm text-white">{event?.location || 'Место не указано'}</span>
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
								{event?.date
									? new Date(event.date).toLocaleDateString('ru-RU', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})
									: 'Дата не указана'} в {event?.time || 'Время не указано'}
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
							<span class="text-sm text-white"
								>До {event?.participantsLimit || 'Не ограничено'} человек</span
							>
						</div>
					</div>
				</div>
			</div>

			<!-- Location Rating -->
			<div
				class="rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 p-4"
			>
				<h3 class="mb-2 text-sm font-medium">Рейтинг локации</h3>
				<div class="flex items-center gap-2">
					<span class="text-lg font-semibold">{event?.locationRating || 0}%</span>
					<span class="text-muted-foreground text-sm">пользователей оценили это место</span>
					<span class="text-xl">🎉</span>
				</div>
				<div class="relative mt-2 h-1.5 overflow-hidden rounded-full bg-gray-700">
					<div
						class="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
						style="width: {event?.locationRating || 0}%"
					></div>
				</div>
			</div>

			<!-- Description -->
			<div class="">
				<h3 class="mb-2 text-lg font-medium">Описание</h3>
				<p class="text-muted-foreground text-deactivated">
					{event?.description || 'Nice cool meeting to talk and drink some coffee.'}
				</p>
			</div>

			<!-- Photos Carousel -->
			<div class="space-y-4 rounded-xl bg-background-secondary/50 p-4">
				<div class="overflow-x-auto">
					<div class="flex gap-2">
						{#if event?.photos?.length}
							{#each event.photos.slice(0, 3) as photo, i}
								<div class="aspect-[16/10] w-full flex-shrink-0">
									<img
										src={photo}
										alt="Event photo {i + 1}"
										class="h-full w-full rounded-xl object-cover"
									/>
								</div>
							{/each}
						{:else}
							<div class="aspect-[16/10] w-full flex-shrink-0">
								<div
									class="flex h-full w-full items-center justify-center rounded-xl bg-background-secondary"
								>
									<span class="text-deactivated">No photos</span>
								</div>
							</div>
						{/if}
					</div>
				</div>
				<label
					for="photo-upload"
					class="flex w-full cursor-pointer items-center justify-center rounded-xl bg-secondary/10 p-5"
				>
					<div class="text-md flex items-center gap-2 text-secondary">
						<ImagePlus size={20} />
						<span>Приложить свои фотографии</span>
					</div>
					<input type="file" id="photo-upload" accept="image/*" multiple class="hidden" />
				</label>
			</div>

			<!-- Chat -->
			<div class="space-y-4 rounded-xl bg-background-secondary/50 p-4">
				<div class="flex items-center justify-between">
					<h3 class="text-lg font-medium">Чат участников</h3>
					<span class="text-muted-foreground text-sm">8/15 онлайн</span>
				</div>

				<div class="flex items-center gap-4">
					<div class="flex -space-x-2">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white ring-2 ring-background"
						>
							<span class="text-sm font-medium">AK</span>
						</div>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white ring-2 ring-background"
						>
							<span class="text-sm font-medium">MR</span>
						</div>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white ring-2 ring-background"
						>
							<span class="text-sm font-medium">PL</span>
						</div>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary ring-2 ring-background"
						>
							<span class="text-xs font-bold">+8</span>
						</div>
					</div>
				</div>

				<button
					class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 py-3 text-primary transition-colors hover:bg-primary/20"
				>
					<MessageCircle size={20} />
					<span class="font-medium">Открыть чат</span>
				</button>
			</div>

			{#if event?.authorUsername === user}
				<button
					class="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-400/20 bg-red-400/10 py-4 text-red-400 transition-all hover:bg-red-400/20"
					on:click={() => (showDeleteDialog = true)}
				>
					<span class="font-medium">Отменить мероприятие</span>
				</button>
				<Dialog
					open={showDeleteDialog}
					title="Отменить мероприятие"
					description="Вы уверены, что хотите отменить это мероприятие? Это действие нельзя отменить."
					onclose={() => (showDeleteDialog = false)}
				>
					<button
						class="w-full rounded-lg bg-deactivated/20 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-deactivated/20 sm:w-auto"
						on:click={() => (showDeleteDialog = false)}
					>
						Нет, не отменять
					</button>
					<button
						class="w-full rounded-lg bg-red-500/90 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-500/80 sm:w-auto"
						on:click={handleDeleteEvent}
					>
						Да, отменить
					</button>
				</Dialog>
			{:else if event?.isParticipant}
				<button
					class="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-400/20 bg-red-400/10 py-4 text-red-400 transition-all hover:bg-red-400/20"
					on:click={handleLeaveEvent}
				>
					<span class="font-medium">Покинуть мероприятие</span>
				</button>
			{:else}
				<button
					class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-white transition-colors"
				>
					<span class="font-medium">Участвовать</span>
				</button>
			{/if}
		</main>
	{:else}
		<!-- Participants tab content -->
		<div class="rounded-xl">
			<div class="mb-4">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Поиск по имени"
					class="text-md w-full rounded-lg bg-background-secondary/50 px-4 py-2 text-white placeholder:text-deactivated focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div class="mt-4 space-y-4">
				{#each dummyParticipants.filter((p) => p.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) as participant}
					<div class="flex items-center justify-between rounded-lg bg-background-secondary/50 p-4">
						<div class="flex items-center gap-4">
							<div class="relative">
								{#if participant.avatar}
									<img
										src={participant.avatar}
										alt={participant.name}
										class="h-10 w-10 rounded-full object-cover"
									/>
								{:else}
									<div
										class="text-md flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 font-bold text-purple-400"
									>
										{getInitials(participant.name)}
									</div>
								{/if}
								<div
									class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background-secondary/50 bg-light-green"
								></div>
							</div>
							<span class="text-lg font-semibold">{participant.name}</span>
						</div>
						<div class="text-deactivated">
							<MessageCircle class="h-5 w-5" />
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

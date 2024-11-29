<script lang="ts">
	import { page } from '$app/stores';
	import { Calendar, Map, MessageCircle } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import Toast from '$lib/components/Toast.svelte';
	import BackButton from '$lib/components/BackButton.svelte';

	// Replace mock data with actual data from page store
	const event = $page.data.event;

	// Parse participants from progress string
	$: participants = {
		current: parseInt(event?.progress?.split('/')[0] || '0'),
		max: parseInt(event?.progress?.split('/')[1] || '0')
	};

	let activeTab: 'info' | 'participants' = 'info';
	let isLoading = true;

	// Simulate loading for demo purposes
	setTimeout(() => {
		isLoading = false;
	}, 1500);

	// Add dummy participants data
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

	let searchQuery = '';
	let showToast = false;

	function handleJoinEvent() {
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 3000);
	}
</script>

<Toast message="Вы успешно присоединились к мероприятию!" visible={showToast} />
<div
	class="min-h-screen space-y-8 text-white"
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 200 }}
>
	<!-- Header -->
	<header class="flex items-center gap-4">
		<BackButton />
		<div class="flex flex-col">
			{#if isLoading}
				<div class="h-6 w-32 animate-pulse rounded bg-gray-700"></div>
				<div class="mt-1 h-4 w-24 animate-pulse rounded bg-gray-700"></div>
			{:else}
				<h2 class="text-xl font-bold">{event.title}</h2>
				<p class="text-sm text-deactivated">Подробности</p>
			{/if}
		</div>
	</header>

	<!-- Navigation tabs -->
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
	<div class="space-y-4">
		{#if activeTab === 'info'}
			<div class="grid grid-cols-3 gap-4 rounded-lg bg-background-secondary/50 p-4">
				{#if isLoading}
					<div class="col-span-2 space-y-4">
						<div class="h-6 w-48 animate-pulse rounded bg-gray-700"></div>
						<div class="h-4 w-full animate-pulse rounded bg-gray-700"></div>
						<div class="h-12 w-32 animate-pulse rounded-full bg-gray-700"></div>
					</div>
					<div class="aspect-[9/16] animate-pulse rounded-2xl bg-gray-700"></div>
				{:else}
					<div class="col-span-2">
						<h1 class="text-xl font-bold">{event.title}</h1>
						<p class="mt-1 text-sm text-deactivated">{event.description}</p>
						<button
							class="mt-4 rounded-full bg-primary px-8 py-3 font-bold text-white"
							on:click={handleJoinEvent}
						>
							Участвовать
						</button>
					</div>
					<div class="aspect-[9/16] overflow-hidden rounded-2xl border-2">
						<img
							src="{$page.data.assetPath}/placeholder.jpg"
							alt="Event poster"
							class="h-full w-full object-cover"
						/>
					</div>
				{/if}
			</div>

			<!-- Event details -->
			{#if isLoading}
				{#each Array(2) as _}
					<div class="flex items-center gap-4 rounded-lg bg-background-secondary/50 p-4">
						<div class="rounded-xl bg-purple-500/20 p-3">
							<div class="h-6 w-6 animate-pulse rounded bg-gray-700"></div>
						</div>
						<div class="space-y-2">
							<div class="h-6 w-24 animate-pulse rounded bg-gray-700"></div>
							<div class="h-4 w-32 animate-pulse rounded bg-gray-700"></div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="flex items-center gap-4 rounded-lg bg-background-secondary/50 p-4">
					<div class="rounded-xl bg-purple-500/20 p-3">
						<Calendar class="h-6 w-6 text-purple-400" />
					</div>
					<div>
						<h3 class="text-lg font-semibold">Дата</h3>
						<p class="text-light-green">{event.date}</p>
					</div>
				</div>

				<div class="flex items-center gap-4 rounded-lg bg-background-secondary/50 p-4">
					<div class="rounded-xl bg-purple-500/20 p-3">
						<Map class="h-6 w-6 text-purple-400" />
					</div>
					<div>
						<h3 class="text-lg font-semibold">Локация</h3>
						<p class="text-light-green">{event.location}</p>
					</div>
				</div>
			{/if}
		{:else}
			<!-- Participants tab content -->
			<div class="rounded-xl">
				<!-- Search filter -->
				<div class="mb-4">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Поиск по имени"
						class="text-md w-full rounded-lg bg-background-secondary/50 px-4 py-2 text-white placeholder:text-deactivated focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				{#if isLoading}
					<div class="mb-2 h-6 w-32 animate-pulse rounded bg-gray-700"></div>
					<div class="h-1.5 animate-pulse rounded-full bg-gray-700"></div>
					<div class="mt-1 flex justify-end">
						<div class="h-event?4 w-16 animate-pulse rounded bg-gray-700"></div>
					</div>
				{:else}
					<h3 class="mb-2 text-lg font-semibold">Участники</h3>
					<div class="relative h-1.5 overflow-hidden rounded-full bg-gray-700">
						<div
							class="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500"
							style="width: {(event.participants / event.participantsLimit) * 100}%"
						></div>
					</div>
					<p class="mt-1 text-right text-sm text-gray-400">
						{event.participants}/{event.participantsLimit}
					</p>

					<!-- Filtered participants list -->
					<div class="mt-4 space-y-4">
						{#each dummyParticipants.filter((p) => p.name
								.toLowerCase()
								.includes(searchQuery.toLowerCase())) as participant}
							<div
								class="flex items-center justify-between rounded-lg bg-background-secondary/50 p-4"
							>
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
				{/if}
			</div>
		{/if}
	</div>
</div>

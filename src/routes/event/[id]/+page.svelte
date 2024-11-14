<script lang="ts">
	import { page } from '$app/stores';
	import { Calendar, Map } from 'lucide-svelte';
	import BackButton from '../../../components/BackButton.svelte';

	// Mock data - replace with actual data fetching
	const event = {
		title: 'Авторская авто-встреча',
		description: 'Even more cool description of this event',
		date: 'Nov 14, 4:30PM',
		location: 'Skufa, Pivnoy kanal, 15',
		participants: {
			current: 4,
			max: 20
		},
		image: '/event-poster.jpg' // Add your image path
	};
	let activeTab: 'info' | 'participants' = 'info';
	let isLoading = true;

	// Simulate loading for demo purposes
	setTimeout(() => {
		isLoading = false;
	}, 1500);
</script>

<div class="min-h-screen space-y-8 p-4 text-white">
	<!-- Header -->
	<header class="flex items-center gap-4">
		<BackButton />
		<div class="flex flex-col">
			{#if isLoading}
				<div class="h-6 w-32 animate-pulse rounded bg-gray-700"></div>
				<div class="mt-1 h-4 w-24 animate-pulse rounded bg-gray-700"></div>
			{:else}
				<h2 class="text-md font-bold">{event.title}</h2>
				<p class="text-diactivated text-sm">Подробности</p>
			{/if}
		</div>
	</header>

	<!-- Navigation tabs -->
	<div class="flex w-full justify-center">
		<div class="inline-flex w-full rounded-full bg-backgroundSecondary/50 text-sm">
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
		<div class="grid grid-cols-3 gap-4 rounded-lg bg-backgroundSecondary/50 p-4">
			{#if isLoading}
				<div class="col-span-2 space-y-4">
					<div class="h-6 w-48 animate-pulse rounded bg-gray-700"></div>
					<div class="h-4 w-full animate-pulse rounded bg-gray-700"></div>
					<div class="h-12 w-32 animate-pulse rounded-full bg-gray-700"></div>
				</div>
				<div class="aspect-[9/16] animate-pulse rounded-2xl bg-gray-700"></div>
			{:else}
				<div class="col-span-2">
					<h1 class="text-md font-bold">{event.title}</h1>
					<p class="text-diactivated mt-1 text-sm">{event.description}</p>
					<button class="mt-4 rounded-full bg-primary px-8 py-3 font-medium text-white">
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
				<div class="flex items-center gap-4 rounded-lg bg-backgroundSecondary/50 p-4">
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
			<div class="flex items-center gap-4 rounded-lg bg-backgroundSecondary/50 p-4">
				<div class="rounded-xl bg-purple-500/20 p-3">
					<Calendar class="h-6 w-6 text-purple-400" />
				</div>
				<div>
					<h3 class="text-lg font-semibold">Дата</h3>
					<p class="text-[#A5F59C]">{event.date}</p>
				</div>
			</div>

			<div class="flex items-center gap-4 rounded-lg bg-backgroundSecondary/50 p-4">
				<div class="rounded-xl bg-purple-500/20 p-3">
					<Map class="h-6 w-6 text-purple-400" />
				</div>
				<div>
					<h3 class="text-lg font-semibold">Локация</h3>
					<p class="text-[#A5F59C]">{event.location}</p>
				</div>
			</div>
		{/if}

		<!-- Participants -->
		<div class="rounded-xl bg-gray-800/50 p-4">
			{#if isLoading}
				<div class="mb-2 h-6 w-32 animate-pulse rounded bg-gray-700"></div>
				<div class="h-1.5 animate-pulse rounded-full bg-gray-700"></div>
				<div class="mt-1 flex justify-end">
					<div class="h-4 w-16 animate-pulse rounded bg-gray-700"></div>
				</div>
			{:else}
				<h3 class="mb-2 text-lg font-semibold">Участники</h3>
				<div class="relative h-1.5 overflow-hidden rounded-full bg-gray-700">
					<div
						class="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500"
						style="width: {(event.participants.current / event.participants.max) * 100}%"
					></div>
				</div>
				<p class="mt-1 text-right text-sm text-gray-400">
					{event.participants.current}/{event.participants.max}
				</p>
			{/if}
		</div>
	</div>
</div>

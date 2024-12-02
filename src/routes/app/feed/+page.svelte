<script lang="ts">
	import { EventStatus } from '$lib/types';
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import { load } from './feed';
	import { goto } from '$app/navigation';

	function getProgressGradient(percentage: number) {
		// Return gradient colors based on percentage filled
		if (percentage < 30) {
			return 'linear-gradient(90deg, #FF6B00 0%, #FFD600 100%)'; // Low progress: Orange to Yellow
		} else if (percentage < 70) {
			return 'linear-gradient(90deg, #FF0000 0%, #7C3AED 100%)'; // Medium progress: Red to Purple
		} else {
			return 'linear-gradient(90deg, #246BFD 0%, #C25FFF 100%)'; // High progress: Primary brand colors
		}
	}

	let activeTab: 'upcoming' | 'completed' | 'all' = 'upcoming';

	const statusColorMap = {
		[EventStatus.COMPLETED]: '#8E96FF',
		[EventStatus.PLANNED]: '#FF968E',
		[EventStatus.IN_PROGRESS]: '#89cf80'
	} as const;

	// Determine currentStatus based on activeTab
	$: currentStatus = getCurrentStatus(activeTab);

	// Load items whenever currentStatus changes
	$: items = load({ status: currentStatus });

	// Loading state
	let isLoading = true;

	// Simulate loading for demo purposes
	setTimeout(() => {
		isLoading = false;
	}, 1500);

	function getCurrentStatus(tab: 'upcoming' | 'completed' | 'all') {
		switch (tab) {
			case 'completed':
				return EventStatus.COMPLETED;
			case 'upcoming':
				return EventStatus.PLANNED;
			default:
				return undefined;
		}
	}

	function handleEventClick(id: string) {
		goto(`/app/feed/event/${id}`);
	}
</script>

<div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
	<h1 class="text-center text-2xl font-bold text-white">Лента</h1>
	<div class="flex items-center justify-center">
		<div class="mb-2 inline-flex w-full max-w-md rounded-full bg-background-secondary/50">
			<button
				class="flex-1 px-4 py-2.5 text-sm font-bold {activeTab === 'upcoming'
					? 'bg-primary text-white'
					: 'text-gray-400'} first:rounded-l-full"
				on:click={() => (activeTab = 'upcoming')}>Предстоящие</button
			>
			<button
				class="flex-1 px-4 py-2.5 text-sm font-bold {activeTab === 'all'
					? 'bg-primary text-white'
					: 'text-gray-400'}"
				on:click={() => (activeTab = 'all')}>Все</button
			>
			<button
				class="flex-1 px-4 py-2.5 text-sm font-bold {activeTab === 'completed'
					? 'bg-primary text-white'
					: 'text-gray-400'} last:rounded-r-full"
				on:click={() => (activeTab = 'completed')}>Завершены</button
			>
		</div>
	</div>

	<div class="space-y-3">
		{#if isLoading}
			{#each Array(3) as _}
				<div class="block animate-pulse rounded-lg bg-background-secondary/50 p-4">
					<div class="mb-3 flex items-center justify-between">
						<div class="flex items-center gap-4">
							<div class="h-12 w-12 rounded-xl bg-gray-700"></div>
							<div>
								<div class="h-5 w-32 rounded bg-gray-700"></div>
								<div class="mt-2 h-4 w-20 rounded bg-gray-700"></div>
							</div>
						</div>
						<div class="flex flex-col items-end gap-2.5">
							<div class="h-7 w-20 rounded-full bg-gray-700"></div>
							<div class="h-7 w-24 rounded-full bg-gray-700"></div>
						</div>
					</div>
					<div class="h-1.5 overflow-hidden rounded-full bg-gray-700"></div>
				</div>
			{/each}
		{:else}
			{#each items.filter((item) => !item.private) as item}
				<div
					role="button"
					tabindex="0"
					class="block cursor-pointer rounded-lg bg-background-secondary/50 p-4 transition-all hover:bg-background-secondary/70"
					on:click={() => handleEventClick(item.id.toString())}
					on:keydown={(e) => e.key === 'Enter' && handleEventClick(item.id.toString())}
				>
					<div class="mb-3 flex items-center justify-between">
						<div class="flex items-center gap-4">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A06AF9] transition-transform group-hover:scale-105"
							>
								<SquareArrowOutUpRight class="h-6 w-6 text-white" />
							</div>
							<div>
								<h2 class="text-lg font-semibold text-white transition-colors hover:text-blue-400">
									{item.title}
								</h2>
								<p class="text-sm text-deactivated">Публичный</p>
							</div>
						</div>
						<div class="flex flex-col items-end gap-2.5">
							<span
								class="inline-flex items-center rounded-full bg-[#A06AF9] px-4 py-1.5 text-sm font-bold text-white"
							>
								{item.participants}/{item.participantsLimit}
							</span>
							<span
								class="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-white/90 shadow-sm"
								style="background-color: {statusColorMap[
									item.status
								]}; text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
							>
								{item.status === EventStatus.COMPLETED
									? 'Завершен'
									: item.status === EventStatus.PLANNED
										? 'В плане'
										: 'В процессе'}
							</span>
						</div>
					</div>
					<div class="h-1.5 overflow-hidden rounded-full bg-white/10">
						<div
							class="h-full rounded-full transition-all"
							style="
								width: {(parseInt(item.participants.toString()) / parseInt(item.participantsLimit.toString())) *
								100}%;
								background: {getProgressGradient(
								(parseInt(item.participants.toString()) /
									parseInt(item.participantsLimit.toString())) *
									100
							)};
							"
						></div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

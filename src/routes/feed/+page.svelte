<script lang="ts">
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	type Status = keyof typeof statusColorMap;

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

	// Add this new state variable
	let activeTab: 'upcoming' | 'completed' | 'all' = 'upcoming';

	const statusColorMap = {
		ЗАВЕРШЕН: '#8E96FF',
		'В ПЛАНЕ': '#FF968E',
		'В ПРОЦЕССЕ': '#89cf80'
	} as const;

	// Type the mock data status
	const items: { id: number; title: string; status: Status; progress: string }[] = [
		{ id: 1, title: 'Cool meetup', status: 'В ПРОЦЕССЕ', progress: '13 /15' },
		{ id: 2, title: 'Ferrari Meet', status: 'В ПРОЦЕССЕ', progress: '9/20' },
		{ id: 3, title: 'Tsunami Picnic', status: 'В ПЛАНЕ', progress: '5/1000' },
		{ id: 4, title: 'Swamp Rust', status: 'В ПЛАНЕ', progress: '18/50' },
		{ id: 5, title: 'Evening Meet', status: 'В ПРОЦЕССЕ', progress: '10/20' }
	];

	// Add loading state
	let isLoading = true;

	// Simulate loading for demo purposes
	setTimeout(() => {
		isLoading = false;
	}, 1500);
</script>

<div 
	class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"
	in:fly={{ x: 100, duration: 400, delay: 300 }}
	out:fly={{ x: -100, duration: 400 }}
>
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
				<div class="block rounded-lg bg-background-secondary/50 p-4 animate-pulse">
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
			{#each items as item}
				<a href="/event/{item.id}" class="block">
					<div
						class="block rounded-lg bg-background-secondary/50 p-4 transition-all hover:bg-background-secondary/70"
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
									<p class="text-sm text-diactivated">Публичный</p>
								</div>
							</div>
							<div class="flex flex-col items-end gap-2.5">
								<span
									class="inline-flex items-center rounded-full bg-[#A06AF9] px-4 py-1.5 text-sm font-bold text-white"
								>
									{item.progress}
								</span>
								<span
									class="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-white/90 shadow-sm"
									style="background-color: {statusColorMap[
										item.status
									]}; text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
								>
									{item.status}
								</span>
							</div>
						</div>
						<div class="h-1.5 overflow-hidden rounded-full bg-white/10">
							<div
								class="h-full rounded-full transition-all"
								style="
									width: {(parseInt(item.progress.split('/')[0]) / parseInt(item.progress.split('/')[1])) * 100}%;
									background: {getProgressGradient(
									(parseInt(item.progress.split('/')[0]) / parseInt(item.progress.split('/')[1])) *
										100
									)};
								"
							></div>
						</div>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>

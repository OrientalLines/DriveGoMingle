<script>
	import { ArrowLeft } from 'lucide-svelte';

	export let users;
	export let onBack;
	export let onNext;

	let searchQuery = '';
</script>

<div class="space-y-8">
	<header class="relative flex items-center justify-center">
		<button class="absolute left-0" on:click={onBack}>
			<ArrowLeft class="h-6 w-6" />
		</button>
		<h1 class="text-2xl font-bold">Отправить приглашения</h1>
	</header>

	<div class="space-y-4">
		<div class="relative">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="@email.com"
				class="w-full rounded-lg border-2 border-deactivated bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
			/>
			{#if searchQuery}
				<button
					class="absolute right-3 top-1/2 -translate-y-1/2"
					on:click={() => (searchQuery = '')}
				>
					<svg class="h-5 w-5 text-deactivated" viewBox="0 0 20 20" fill="currentColor">
						<path
							d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
						/>
					</svg>
				</button>
			{/if}
		</div>

		<div class="space-y-2">
			{#each users as user}
				<div class="flex items-center justify-between rounded-xl bg-background-secondary/30 p-4">
					<div class="flex items-center gap-3">
						<div class="h-10 w-10 rounded-full bg-gray-500"></div>
						<div>
							<p class="font-medium text-white">{user.name}</p>
							<p class="text-sm text-deactivated">{user.role}</p>
						</div>
					</div>
					<label class="relative inline-flex cursor-pointer items-center">
						<input type="checkbox" bind:checked={user.selected} class="peer sr-only" />
						<div
							class="peer h-6 w-11 rounded-full bg-deactivated after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"
						></div>
					</label>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex gap-4">
		<button
			class="flex w-full items-center justify-center rounded-lg border-2 border-deactivated py-3.5 text-white transition-all hover:opacity-90"
			on:click={onBack}
		>
			<span class="font-medium">Назад</span>
		</button>
		<button
			class="flex w-full items-center justify-center rounded-lg border-2 border-light-green py-3.5 text-white transition-all hover:opacity-90"
			on:click={onNext}
		>
			<span class="font-medium">Дальше</span>
		</button>
	</div>
</div>

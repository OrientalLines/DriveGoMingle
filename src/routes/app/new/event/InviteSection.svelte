<script lang="ts">
	export let users;
	export let onBack;
	export let onNext;
	let searchQuery = '';
	$: filteredUsers = users.filter(
		(user: { name: string; status: string }) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.status.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<div class="flex flex-col space-y-4">
	<header class="flex items-center">
		<h1 class="flex-1 text-center text-2xl font-bold">Приглашения</h1>
	</header>

	<div class="space-y-4">
		<div class="relative">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Поиск по именам"
				class="w-full rounded-lg border-2 border-deactivated bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
			/>
			{#if searchQuery}
				<button
					class="absolute right-3 top-1/2 -translate-y-1/2 touch-manipulation p-2"
					on:click={() => (searchQuery = '')}
					aria-label="Clear search"
				>
					✕
				</button>
			{/if}
		</div>

		<div
			class="h-[calc(100vh-19rem)] overflow-y-auto rounded-lg border-2 border-deactivated/30 p-2 pr-2"
		>
			<div class="space-y-2">
				{#each filteredUsers as user}
					<div class="flex items-center justify-between rounded-xl bg-background-secondary/30 p-4">
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-medium text-white"
							>
								{user.name.charAt(0).toUpperCase()}
							</div>
							<div>
								<p class="font-medium text-white">{user.name}</p>
								<p class="text-sm text-deactivated">{user.status}</p>
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
	</div>
	<div class="flex space-x-4">
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

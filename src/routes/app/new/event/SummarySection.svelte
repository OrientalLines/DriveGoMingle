<script>
	import { ArrowLeft } from 'lucide-svelte';

	export let eventData;
	export let users;
	export let onBack;
	export let onSubmit;
</script>

<div class="space-y-8">
	<header class="relative flex items-center justify-center">
		<button class="absolute left-0" on:click={onBack}>
			<ArrowLeft class="h-6 w-6" />
		</button>
		<h1 class="text-2xl font-bold">Проверьте детали</h1>
	</header>

	<div class="space-y-6">
		<div class="space-y-6 rounded-xl bg-background-secondary/30 p-6">
			<div class="space-y-3">
				<h2 class="text-lg font-medium text-white/90">Детали мероприятия</h2>

				<div class="space-y-4">
					<div>
						<p class="text-sm text-deactivated">Название</p>
						<p class="text-white">{eventData.title}</p>
					</div>

					<div>
						<p class="text-sm text-deactivated">Дата</p>
						<p class="text-white">{eventData.date}</p>
					</div>

					<div>
						<p class="text-sm text-deactivated">Адрес</p>
						<p class="text-white">{eventData.address}</p>
					</div>

					<div>
						<p class="text-sm text-deactivated">Тип мероприятия</p>
						<p class="text-white">{eventData.isPublic ? 'Открытое' : 'Закрытое'}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="space-y-4 rounded-xl bg-background-secondary/30 p-6">
			<h2 class="text-lg font-medium text-white/90">
				Приглашенные ({users.filter((/** @type {{ selected: any; }} */ u) => u.selected).length})
			</h2>

			<div class="space-y-3">
				{#each users.filter((/** @type {{ selected: any; }} */ u) => u.selected).slice(0, 3) as user}
					<div class="flex items-center gap-3">
						<div class="h-8 w-8 rounded-full bg-gray-500"></div>
						<div>
							<p class="font-medium text-white">{user.name}</p>
							<p class="text-sm text-deactivated">{user.role}</p>
						</div>
					</div>
				{/each}

				{#if users.filter((/** @type {{ selected: any; }} */ u) => u.selected).length > 3}
					<p class="text-sm text-deactivated">
						И еще {users.filter((/** @type {{ selected: any; }} */ u) => u.selected).length - 3} пользователей
					</p>
				{/if}
			</div>
		</div>
	</div>

	<button
		class="flex w-full items-center justify-center rounded-lg border-2 border-light-green py-3.5 text-white transition-all hover:opacity-90"
		on:click={onSubmit}
	>
		<span class="font-medium">Создать мероприятие</span>
	</button>
</div>

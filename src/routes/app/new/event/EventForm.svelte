<script>
	import DatePicker from '$lib/components/DatePicker.svelte';

	export let eventData;
	export let onNext;
</script>

<div class="space-y-8">
	<header class="relative flex items-center justify-center">
		<h1 class="text-2xl font-bold">Новое мероприятие</h1>
	</header>

	<form on:submit|preventDefault class="space-y-6">
		<div class="space-y-6 rounded-xl bg-background-secondary/30 p-6">
			<div class="space-y-2">
				<label for="title" class="text-lg font-medium text-white/90">Название мероприятия</label>
				<input
					type="text"
					id="title"
					bind:value={eventData.title}
					placeholder="Введите название"
					required
					class="text-md w-full rounded-lg border-2 border-deactivated bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
				/>
			</div>

			<div class="space-y-2">
				<label for="date" class="text-lg font-medium text-white/90">Дата</label>
				<DatePicker bind:value={eventData.date} />
			</div>

			<div class="space-y-2">
				<label for="address" class="text-lg font-medium text-white/90">Адрес</label>
				<textarea
					id="address"
					bind:value={eventData.address}
					placeholder="Укажите адрес проведения"
					required
					class="text-md w-full rounded-lg border-2 border-deactivated bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
					rows="2"
				></textarea>
			</div>
		</div>

		<div class="rounded-xl bg-background-secondary/30 p-6">
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<span class="text-lg font-medium text-white/90">Закрытое мероприятие</span>
					<p class="text-sm text-deactivated">
						Только приглашенные пользователи смогут видеть информацию
					</p>
				</div>
				<label class="relative inline-flex cursor-pointer items-center">
					<input type="checkbox" bind:checked={eventData.isPublic} class="peer sr-only" />
					<div
						class="peer h-6 w-11 rounded-full bg-deactivated after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"
					></div>
				</label>
			</div>
		</div>

		<button
			type="button"
			on:click={onNext}
			class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-light-green py-3.5 text-white transition-all hover:opacity-90"
		>
			<span class="font-medium">Далее</span>
		</button>
	</form>
</div>

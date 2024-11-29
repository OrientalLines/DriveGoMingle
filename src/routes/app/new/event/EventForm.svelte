<script>
	import DatePicker from '$lib/components/DatePicker.svelte';

	export let eventData = {
		title: '',
		date: '',
		time: '',
		address: '',
		description: '',
		isPublic: true,
		participantsLimit: 100
	};
	export let onNext = () => {};

	// Add validation state
	let errors = {
		title: '',
		date: '',
		time: '',
		address: '',
		description: ''
	};

	// Validation function
	function validateForm() {
		let isValid = true;
		errors = {
			title: '',
			date: '',
			time: '',
			address: '',
			description: ''
		};

		if (!eventData.title?.trim()) {
			errors.title = 'Название мероприятия обязательно';
			isValid = false;
		}

		if (!eventData.date) {
			errors.date = 'Дата обязательна';
			isValid = false;
		}

		if (!eventData.time) {
			errors.time = 'Время обязательно';
			isValid = false;
		}

		if (!eventData.address?.trim()) {
			errors.address = 'Адрес обязателен';
			isValid = false;
		}

		return isValid;
	}

	// Modified onNext handler
	function handleNext() {
		if (validateForm()) {
			onNext();
		}
	}
</script>

<div class="space-y-8">
	<header class="relative flex items-center justify-center">
		<h1 class="text-2xl font-bold">Новое мероприятие</h1>
	</header>

	<form on:submit|preventDefault class="space-y-6">
		<div class="space-y-6 rounded-xl bg-background-secondary/30 p-4">
			<div class="space-y-2">
				<label for="title" class="text-lg font-medium text-white/90">Название мероприятия</label>
				<input
					type="text"
					id="title"
					bind:value={eventData.title}
					placeholder="Введите название"
					required
					class="text-md w-full rounded-lg border-2 {errors.title
						? 'border-red-500'
						: 'border-deactivated'} bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
				/>
				{#if errors.title}
					<p class="text-sm text-red-500">{errors.title}</p>
				{/if}
			</div>

			<div class="space-y-2">
				<label for="date" class="text-lg font-medium text-white/90">Дата</label>
				<DatePicker bind:value={eventData.date} />
				{#if errors.date}
					<p class="text-sm text-red-500">{errors.date}</p>
				{/if}
			</div>
			<div class="space-y-2">
				<label for="time" class="text-lg font-medium text-white/90">Время</label>
				<input
					type="time"
					id="time"
					bind:value={eventData.time}
					required
					class="text-md w-full appearance-none rounded-lg border-2 {errors.time
						? 'border-red-500'
						: 'border-deactivated'} bg-background-secondary/50 px-4 py-3.5 text-white placeholder:text-deactivated focus:outline-none active:outline-none [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-datetime-edit]:text-white"
					style="-webkit-tap-highlight-color: transparent;"
					lang="ru"
				/>
				{#if errors.time}
					<p class="text-sm text-red-500">{errors.time}</p>
				{/if}
			</div>

			<div class="space-y-2">
				<label for="address" class="text-lg font-medium text-white/90">Адрес</label>
				<textarea
					id="address"
					bind:value={eventData.address}
					placeholder="Укажите адрес проведения"
					required
					class="text-md w-full rounded-lg border-2 {errors.address
						? 'border-red-500'
						: 'border-deactivated'} bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
					rows="2"
				></textarea>
				{#if errors.address}
					<p class="text-sm text-red-500">{errors.address}</p>
				{/if}
			</div>

			<div class="space-y-2">
				<label for="description" class="text-lg font-medium text-white/90">Описание</label>
				<textarea
					id="description"
					bind:value={eventData.description}
					placeholder="Добавьте краткое описание мероприятия"
					class="text-md w-full rounded-lg border-2 {errors.description
						? 'border-red-500'
						: 'border-deactivated'} bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
					rows="3"
				></textarea>
				{#if errors.description}
					<p class="text-sm text-red-500">{errors.description}</p>
				{/if}
			</div>
		</div>

		<div class="rounded-xl bg-background-secondary/30 p-4">
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

			<div class="mt-4 space-y-2">
				<label for="participantsLimit" class="text-lg font-medium text-white/90">
					Лимит участников
				</label>
				<div class="relative">
					<input
						type="number"
						id="participantsLimit"
						bind:value={eventData.participantsLimit}
						min="5"
						max="1000"
						class="text-md w-full appearance-none rounded-lg border-2 border-primary bg-background-secondary/50 px-4 py-2.5 text-white [-moz-appearance:textfield]
						placeholder:text-deactivated
						[&::-webkit-inner-spin-button]:m-0
						[&::-webkit-inner-spin-button]:appearance-none
						[&::-webkit-outer-spin-button]:m-0
						[&::-webkit-outer-spin-button]:appearance-none"
						style="-webkit-tap-highlight-color: transparent;"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
						человек
					</span>
				</div>
				<p class="text-sm text-white/50">Максимальное количество участников мероприятия</p>
			</div>
		</div>

		<button
			type="button"
			on:click={handleNext}
			class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-light-green py-3.5 text-white transition-all hover:opacity-90"
		>
			<span class="font-medium">Далее</span>
		</button>
	</form>
</div>

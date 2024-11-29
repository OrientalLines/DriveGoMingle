<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '$lib/components/BackButton.svelte';
	import { MapPin, Users } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { events } from '$lib/stores/events';

	export let data;
	const { event } = data;

	let title = event?.title || '';
	let description = event?.description || '';
	let location = event?.location || '';
	let date = event?.date || '';
	let time = event?.time || '';
	let participantsLimit = event?.participantsLimit?.toString() || '';

	// Add validation state
	let errors = {
		title: '',
		date: '',
		time: '',
		location: '',
		description: ''
	};

	function validateForm() {
		let isValid = true;
		errors = {
			title: '',
			date: '',
			time: '',
			location: '',
			description: ''
		};

		if (!title?.trim()) {
			errors.title = 'Название мероприятия обязательно';
			isValid = false;
		}
		if (!date) {
			errors.date = 'Дата обязательна';
			isValid = false;
		}
		if (!time) {
			errors.time = 'Время обязательно';
			isValid = false;
		}
		if (!location?.trim()) {
			errors.location = 'Место проведения обязательно';
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit(e: SubmitEvent) {
		if (!validateForm()) {
			return;
		}

		// Update the event in the store
		events.update((currentEvents) => {
			return currentEvents.map((evt) => {
				if (evt.id === event.id) {
					return {
						...evt,
						title,
						description,
						location,
						date,
						time,
						participantsLimit: parseInt(participantsLimit)
					};
				}
				return evt;
			});
		});

		// Navigate back to event page
		await goto(`/app/profile/events/${event.id}`);
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<header class="relative flex items-center justify-between">
		<BackButton />
		<h1 class="text-xl font-bold">Редактировать событие</h1>
		<div class="w-10"><!-- Spacer --></div>
	</header>

	<form class="space-y-6" on:submit|preventDefault={handleSubmit} use:enhance>
		<div class="space-y-6 rounded-xl bg-background-secondary/30 p-4">
			<!-- Title -->
			<div class="space-y-2">
				<label for="title" class="text-lg font-medium text-white/90">Название мероприятия</label>
				<input
					type="text"
					id="title"
					name="title"
					bind:value={title}
					class="text-md w-full rounded-lg border-2 {errors.title
						? 'border-red-500'
						: 'border-deactivated'} bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
					required
				/>
				{#if errors.title}
					<p class="text-sm text-red-500">{errors.title}</p>
				{/if}
			</div>

			<!-- Date -->
			<div class="space-y-2">
				<label for="date" class="text-lg font-medium text-white/90">Дата</label>
				<DatePicker bind:value={date} />
				{#if errors.date}
					<p class="text-sm text-red-500">{errors.date}</p>
				{/if}
			</div>

			<!-- Time -->
			<div class="space-y-2">
				<label for="time" class="text-lg font-medium text-white/90">Время</label>
				<input
					type="time"
					id="time"
					name="time"
					bind:value={time}
					required
					class="text-md w-full appearance-none rounded-lg border-2 {errors.time
						? 'border-red-500'
						: 'border-deactivated'} bg-background-secondary/50 px-4 py-3.5 text-white placeholder:text-deactivated focus:outline-none active:outline-none [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-datetime-edit]:text-white"
					style="-webkit-tap-highlight-color: transparent;"
				/>
				{#if errors.time}
					<p class="text-sm text-red-500">{errors.time}</p>
				{/if}
			</div>

			<!-- Location -->
			<div class="space-y-2">
				<label for="location" class="text-lg font-medium text-white/90">Место проведения</label>
				<div class="relative">
					<MapPin class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
					<input
						type="text"
						id="location"
						name="location"
						bind:value={location}
						class="text-md w-full rounded-lg border-2 {errors.location
							? 'border-red-500'
							: 'border-deactivated'} bg-background-secondary/50 px-12 py-2.5 text-white placeholder:text-deactivated"
						required
					/>
				</div>
				{#if errors.location}
					<p class="text-sm text-red-500">{errors.location}</p>
				{/if}
			</div>

			<!-- Description -->
			<div class="space-y-2">
				<label for="description" class="text-lg font-medium text-white/90">Описание</label>
				<textarea
					id="description"
					name="description"
					bind:value={description}
					rows="3"
					class="text-md w-full rounded-lg border-2 {errors.description
						? 'border-red-500'
						: 'border-deactivated'} bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
				></textarea>
				{#if errors.description}
					<p class="text-sm text-red-500">{errors.description}</p>
				{/if}
			</div>
		</div>

		<!-- Participants Limit -->
		<div class="rounded-xl bg-background-secondary/30 p-4">
			<div class="space-y-2">
				<label for="participantsLimit" class="text-lg font-medium text-white/90">
					Лимит участников
				</label>
				<div class="relative">
					<Users class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
					<input
						type="number"
						id="participantsLimit"
						name="participantsLimit"
						bind:value={participantsLimit}
						min="5"
						max="1000"
						class="text-md w-full appearance-none rounded-lg border-2 border-primary bg-background-secondary/50 px-12 py-2.5 text-white [-moz-appearance:textfield] placeholder:text-deactivated [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
						style="-webkit-tap-highlight-color: transparent;"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
						человек
					</span>
				</div>
				<p class="text-sm text-white/50">Максимальное количество участников мероприятия</p>
			</div>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-light-green py-3.5 text-white transition-all hover:opacity-90"
		>
			<span class="font-medium">Сохранить изменения</span>
		</button>
	</form>
</div>

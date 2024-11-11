<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	let currentSlide = 0;
	let interval: ReturnType<typeof setInterval>;

	const slides = [
		{
			title: 'Авто\nЛюбители\nСоединяйтесь',
			image: null
		},
		{
			title: 'Дорога\nСближает\nЛюдей',
			image: null
		},
		{
			title: 'Создавай\nМаршруты\nВстречай Друзей',
			image: null
		}
	];

	function nextSlide() {
		currentSlide = (currentSlide + 1) % slides.length;
	}

	onMount(() => {
		interval = setInterval(nextSlide, 3000); // Switch slides every 3 seconds
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<div class="flex min-h-screen flex-col justify-between px-8 py-12">
	<div class="mb-auto flex-1">
		<!-- Text content moved here -->
		<div class="space-y-1 pt-12">
			{#each slides[currentSlide].title.split('\n') as line}
				<h1 class="text-5xl font-bold leading-tight tracking-tight text-white">{line}</h1>
			{/each}

			{#if slides[currentSlide].image}
				<div class="mt-6">
					<img src="{$page.data.assetPath}/{slides[currentSlide].image}.png" alt="Illustration" />
				</div>
			{/if}
		</div>
	</div>

	<div class="w-full space-y-8">
		<!-- Dots indicator -->
		<div class="flex space-x-3">
			{#each slides as _, i}
				<div
					class="h-2.5 w-2.5 rounded-full transition-colors duration-200 {i === currentSlide
						? 'bg-primary'
						: 'bg-backgroundSecondary'}"
				></div>
			{/each}
		</div>

		<!-- Buttons -->
		<div class="space-y-4">
			<button
				class="bg-primary flex w-full items-center justify-center space-x-3 rounded-xl py-4 font-medium text-white"
			>
				<span class="material-icons">email</span>
				<span>Продолжить по email</span>
			</button>
			<button
				class="border-backgroundSecondary flex w-full items-center justify-center space-x-3 rounded-xl border py-4 font-medium text-white"
			>
				<img src="{$page.data.assetPath}/google.png" alt="Google" class="h-5 w-5" />
				<span>Продолжить с Google</span>
			</button>

			<p class="px-4 text-center text-xs text-gray-500">
				Продолжая, вы соглашаетесь с условиями предоставления услуг и политикой конфиденциальности
				DriveGoMingle
			</p>
		</div>
	</div>
</div>
    
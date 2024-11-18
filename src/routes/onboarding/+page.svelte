<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	let currentSlide = 0;
	let interval: ReturnType<typeof setInterval>;

	const slides = [
		{
			title: 'Авто\nЛюбители\nОбщайтесь',
			icon: 'directions_car'
		},
		{
			title: 'Дорога\nСближает\nЛюдей',
			icon: 'groups'
		},
		{
			title: 'Создавай\nВстречи\nВстречай\nДрузей',
			icon: 'people'
		}
	];

	function nextSlide() {
		currentSlide = (currentSlide + 1) % slides.length;
	}

	onMount(() => {
		interval = setInterval(nextSlide, 5000); // Switch slides every 5 seconds
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});

	function handleEmailAuth() {
		goto('/auth/login');
	}
</script>

<div class="flex min-h-screen flex-col justify-between px-8 py-12">
	<div class="mb-auto flex flex-1 items-center justify-center text-center">
		<div class="relative space-y-1">
			<!-- Icon with enhanced animation -->
			<div class="mb-8 transform transition-all duration-500">
				<span
					class="material-icons text-7xl text-white opacity-90 transition-transform hover:scale-110"
				>
					{slides[currentSlide].icon}
				</span>
			</div>

			<!-- Text with staggered animations -->
			<div class="relative">
				{#each slides[currentSlide].title.split('\n') as line, i}
					<h1 class="text-5xl font-bold leading-tight tracking-tight text-white">
						{line}
					</h1>
				{/each}
			</div>
		</div>
	</div>

	<div class="w-full space-y-8">
		<!-- Dots indicator -->
		<div class="flex justify-center space-x-3">
			{#each slides as _, i}
				<div
					class="h-2.5 w-2.5 rounded-full transition-colors duration-200 {i === currentSlide
						? 'bg-primary'
						: 'bg-background-secondary'}"
				></div>
			{/each}
		</div>

		<!-- Buttons -->
		<div class="space-y-4">
			<button
				on:click={handleEmailAuth}
				class="bg-primary flex w-full items-center justify-center space-x-3 rounded-xl py-4 font-medium text-white"
			>
				<span class="material-icons">email</span>
				<span>Продолжить по email</span>
			</button>
			<button
				class="border-background-secondary flex w-full items-center justify-center space-x-3 rounded-xl border py-4 font-medium text-white"
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

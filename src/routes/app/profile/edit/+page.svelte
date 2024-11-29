<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '$lib/components/BackButton.svelte';
	import { Eye, EyeOff, Camera } from 'lucide-svelte';

	let showPassword = false;
	let userData = {
		name: 'Blake Goooal',
		email: 'blake@email.com',
		password: 'HikLHjD@&1?>',
		description: 'Love Goooal & Hondas',
		avatar:
			'https://storage.vscl.ru/logos/a1/32/e6/a132e6ef0776dc37ed1f8a25d0140a95b0fa4f10.png?s=400'
	};

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	const onBack = () => {
		goto('/app/profile', { replaceState: true });
	};
</script>

<div class="space-y-8 p-4">
	<header class="relative mb-8 flex items-center justify-center">
		<BackButton onClick={onBack} />
		<h1 class="w-full text-center text-xl font-semibold">Редактирование профиля</h1>
	</header>

	<div class="mb-8 flex justify-center">
		<div class="relative">
			<img
				src={userData.avatar}
				alt="Profile"
				class="h-24 w-24 rounded-full bg-background-secondary"
			/>
			<button class="absolute bottom-0 right-0 rounded-full bg-primary p-2">
				<Camera size={20} />
			</button>
		</div>
	</div>

	<form class="space-y-6">
		<div>
			<label for="name" class="mb-1 block text-xs text-gray-500">ВАШЕ ИМЯ</label>
			<input
				id="name"
				type="text"
				bind:value={userData.name}
				class="w-full rounded-lg bg-background-secondary p-3"
				aria-labelledby="name"
			/>
		</div>

		<div>
			<label for="email" class="mb-1 block text-xs text-gray-500">ВАШ EMAIL</label>
			<input
				type="email"
				bind:value={userData.email}
				class="w-full rounded-lg bg-background-secondary p-3"
				aria-labelledby="email"
			/>
		</div>

		<div>
			<label for="password" class="mb-1 block text-xs text-gray-500">ВАШ ПАРОЛЬ</label>
			<div class="relative">
				<input
					type={showPassword ? 'text' : 'password'}
					bind:value={userData.password}
					class="w-full rounded-lg bg-background-secondary p-3 pr-12"
					aria-labelledby="password"
				/>
				<button
					type="button"
					class="absolute right-3 top-1/2 -translate-y-1/2"
					on:click={togglePasswordVisibility}
				>
					{#if showPassword}
						<EyeOff size={20} />
					{:else}
						<Eye size={20} />
					{/if}
				</button>
			</div>
		</div>

		<div>
			<label for="description" class="mb-1 block text-xs text-gray-500">Статус</label>
			<input
				id="description"
				type="text"
				bind:value={userData.description}
				class="w-full rounded-lg bg-background-secondary p-3"
				aria-labelledby="description"
			/>
		</div>
	</form>

	<button
		class="w-full rounded-lg border-2 border-light-green px-4 py-2 text-lg font-medium text-white"
		on:click={onBack}
	>
		Сохранить
	</button>
</div>

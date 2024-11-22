<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft } from 'lucide-svelte';
	import AuthToggle from '$lib/components/auth/AuthToggle.svelte';
	import FormInput from '$lib/components/auth/FormInput.svelte';

	let isLogin = true;
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let name = '';

	function handleSubmit() {
		if (!isLogin && password !== passwordConfirm) {
			// Handle password mismatch error
			return;
		}
		// Handle form submission
	}

	function handleToggle() {
		isLogin = !isLogin;
		name = '';
		passwordConfirm = '';
	}
</script>

<div class="min-h-screen px-8 py-12">
	<a
		href="/"
		class="absolute left-8 top-6 flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
	>
		<ArrowLeft size={20} />
		<span>Назад</span>
	</a>

	<div class="mb-6 mt-6">
		<h1 class="text-4xl font-bold text-white">
			{isLogin ? 'Войти' : 'Регистрация'}
		</h1>
	</div>

	<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
		{#if !isLogin}
			<FormInput id="name" label="Имя" bind:value={name} placeholder="Ваше имя" />
		{/if}

		<FormInput
			id="email"
			type="email"
			label="Email"
			bind:value={email}
			placeholder="your@email.com"
		/>

		<FormInput
			id="password"
			type="password"
			label="Пароль"
			bind:value={password}
			placeholder="••••••••"
		/>

		{#if !isLogin}
			<FormInput
				id="passwordConfirm"
				type="password"
				label="Повторите пароль"
				bind:value={passwordConfirm}
				placeholder="••••••••"
			/>
		{/if}

		<button
			type="submit"
			class="w-full rounded-xl bg-primary py-4 font-medium text-white transition-colors hover:bg-primary/90"
		>
			{isLogin ? 'Войти' : 'Зарегистрироваться'}
		</button>

		<AuthToggle {isLogin} onToggle={handleToggle} />
	</form>
</div>

<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import AuthToggle from '$lib/components/auth/AuthToggle.svelte';
	import FormInput from '$lib/components/auth/FormInput.svelte';
	import { persisted } from '$lib/stores/persisted';
	import { goto } from '$app/navigation';
	import { toast } from '$lib/stores/toast';

	// Create a persistent store using localStorage
	export const isAuthenticated = persisted('isAuthenticated', false);

	let isLogin = true;
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let name = '';

	let isSubmitting = false;

	async function handleSubmit() {
		if (isSubmitting) return;
		isSubmitting = true;

		if (!isLogin && password !== passwordConfirm) {
			isSubmitting = false;
			return;
		}

		if (email.includes('@') && password.length > 0) {
			isAuthenticated.set(true);
			await goto('/app/feed');
		} else {
			toast.show({
				message: 'Неверный email или пароль',
				type: 'error'
			});
		}

		isSubmitting = false;
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
			disabled={isSubmitting}
		>
			{isLogin ? 'Войти' : 'Зарегистрироваться'}
		</button>

		<AuthToggle {isLogin} onToggle={handleToggle} />
	</form>
</div>

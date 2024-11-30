<script lang="ts">
	import { page } from '$app/stores';
	import { toast } from '$lib/stores/toast';
	import BackButton from '$lib/components/BackButton.svelte';

	const userId = $page.url.searchParams.get('user');
	let reportText = '';

	$: isSubmitDisabled = reportText.trim().length < 10;

	async function handleSubmit() {
		if (!reportText.trim()) {
			toast.show({
				message: 'Пожалуйста, опишите причину жалобы',
				type: 'error'
			});
			return;
		}

		try {
			// Here you would typically make an API call to submit the report
			// await submitReport({ userId, eventId: $page.params.id, text: reportText });

			toast.show({
				message: 'Жалоба отправлена',
				type: 'warning'
			});
			history.back();
		} catch (error) {
			toast.show({
				message: 'Ошибка при отправке жалобы',
				type: 'error'
			});
		}
	}
</script>

<div class="flex min-h-screen flex-col p-4">
	<!-- Header -->
	<header class="mb-6 flex items-center justify-between">
		<BackButton />
		<h1 class="text-xl font-bold">Жалоба</h1>
		<div class="w-10"></div>
		<!-- Spacer for alignment -->
	</header>

	<!-- User Info -->
	<div class="mb-6">
		<h2 class="text-lg font-semibold text-white">
			{userId === '1' ? 'Александр Петров' : userId === '2' ? 'Мария Иванова' : 'Дмитрий Сидоров'}
		</h2>
		<p class="text-sm text-light-green">
			{userId === '1'
				? 'alex.petrov@mail.ru'
				: userId === '2'
					? 'maria.i@gmail.com'
					: 'dmitry.s@yandex.ru'}
		</p>
	</div>

	<!-- Report Form -->
	<form class="flex flex-1 flex-col" on:submit|preventDefault={handleSubmit}>
		<textarea
			bind:value={reportText}
			placeholder="Расскажите, что случилось..."
			minlength={10}
			class="mb-4 flex-1 resize-none rounded-lg border-none bg-background-secondary/50 p-4 text-white placeholder:text-deactivated focus:outline-none"
		></textarea>

		<!-- Notice -->
		<div class="mb-6 rounded-lg p-4">
			<p class="mb-2 text-xs font-medium uppercase text-deactivated">ПОМНИТЕ:</p>
			<ul class="space-y-2 text-sm text-deactivated">
				<li>
					Вся предоставленная вами информация должна быть достоверной и документированной фактами.
				</li>
				<li>Ложные заявления могут привести к ограничению доступа к системе жалоб.</li>
				<li>
					Жалоба должна содержать конкретные факты нарушения правил платформы. Общие претензии без
					указания конкретных действий рассмотрены не будут.
				</li>
			</ul>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="w-full rounded-lg bg-red-500 py-3 font-medium text-white transition-colors hover:bg-red-400 disabled:bg-red-500/30 disabled:text-white/50 disabled:hover:bg-red-500/30"
			disabled={isSubmitDisabled}
		>
			Отправить
		</button>
	</form>
</div>

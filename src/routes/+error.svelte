<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	function goHome() {
		goto('/');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<div class="w-full max-w-lg text-center">
		<div class="mb-10 flex flex-col items-center">
			<!-- Error Status -->
			<h1 class="mb-2 text-3xl font-semibold text-white">{$page.status}</h1>
			<p class="mb-5 font-medium text-light-green">
				{$page.error?.message || 'An unexpected error occurred'}
			</p>

			<!-- Action Buttons -->
			<div class="mt-auto flex w-full flex-col items-center gap-3">
				<button
					on:click={goHome}
					class="w-2/3 rounded-full border-2 border-primary px-4 py-3 font-medium text-white transition-colors hover:bg-primary/20"
				>
					Кнопка-Чинилка
				</button>
			</div>
		</div>
	</div>
</div>

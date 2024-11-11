<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-4 text-white">
	<div class="space-y-2 text-center" in:fly={{ y: -50, duration: 100 }}>
		<h1 class="animate-slide-down text-5xl font-bold">Drive</h1>
		<p
			class="bg-primary-gradient animate-slide-down bg-clip-text text-5xl font-bold text-transparent"
		>
			Go
		</p>
		<p class="animate-slide-down text-5xl font-bold">Mingle</p>
	</div>
</div>

<style>
	@keyframes slide-down {
		0%,
		50% {
			opacity: 0;
			transform: translateY(-20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slide-down {
		animation: slide-down 2s ease-out forwards;
	}
</style>

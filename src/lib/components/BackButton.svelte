<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

	export let onClick: (() => void) | undefined = undefined;

	function handleClick() {
		if (onClick) {
			onClick();
		} else {
			history.back();
		}
	}
</script>

<div>
	<button
		class="rounded-lg border-2 border-deactivated/60 p-1"
		on:click={handleClick}
		aria-label="Назад"
	>
		<ArrowLeft class="h-5 w-5" />
	</button>
</div>

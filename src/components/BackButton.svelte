<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
</script>

<div>
	<button
		class="border-diactivated/60 rounded-lg border-2 p-1"
		on:click={() => history.back()}
		aria-label="Назад"
	>
		<ArrowLeft class="h-5 w-5" />
	</button>
</div>

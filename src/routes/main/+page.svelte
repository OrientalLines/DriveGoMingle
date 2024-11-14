<script lang="ts">
	import NavBar from '../../components/NavBar.svelte';
	import Feed from '../feed/+page.svelte';

	let currentView: 'feed' | 'profile' | 'chats' = 'feed';
</script>

<div class="min-h-screen pb-20 text-white">
	<!-- Main Content -->
	<main class="p-4">
		{#if currentView === 'feed'}
			<Feed />
		{:else if currentView === 'profile'}
			<!-- TODO: Create and import Profile component -->
			<div class="space-y-4">
				<div class="rounded-lg bg-[#25262B] p-4">
					<h2>Profile Information</h2>
					<p class="text-gray-400">Profile content goes here...</p>
				</div>
			</div>
		{:else}
			<!-- TODO: Create and import Chats component -->
			<div class="space-y-4">
				{#each Array(3) as _, i}
					<div class="rounded-lg bg-[#25262B] p-4">
						<h2>Chat {i + 1}</h2>
						<p class="text-gray-400">Last message preview...</p>
					</div>
				{/each}
			</div>
		{/if}
	</main>

	<NavBar {currentView} onViewChange={(view) => (currentView = view)} />
</div>

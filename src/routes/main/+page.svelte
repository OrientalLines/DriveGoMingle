<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Feed from '../feed/feed.svelte';
	import Profile from '../profile/profile.svelte';
	import ProfileEdit from '../profile/edit/edit.svelte';
	import Chats from '../chats/chats.svelte';

	let currentView: 'feed' | 'profile' | 'chats' = 'feed';
	let isEditingProfile = false;
</script>

<div class="min-h-screen pb-20 text-white">
	<!-- Main Content -->
	<main class="p-4">
		{#if currentView === 'feed'}
			<Feed />
		{:else if currentView === 'profile'}
			{#if isEditingProfile}
				<ProfileEdit onBack={() => (isEditingProfile = false)} />
			{:else}
				<Profile onEdit={() => (isEditingProfile = true)} />
			{/if}
		{:else}
			<Chats />
		{/if}
	</main>

	<NavBar
		{currentView}
		onViewChange={(view) => {
			currentView = view;
			if (view === 'profile') {
				isEditingProfile = false;
			}
		}}
	/>
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Toast from '$lib/components/Toast.svelte';

	let chatData = {
		title: '',
		isPublic: true,
		avatar: null as File | null
	};

	let users: { name: string; status: string; selected: boolean }[] = [
		{ name: 'CyberNinja', status: 'online', selected: false },
		{ name: 'PixelQueen', status: 'offline', selected: false },
		{ name: 'ByteMaster', status: 'online', selected: false },
		{ name: 'CodeWarrior', status: 'online', selected: false },
		{ name: 'TechWitch', status: 'offline', selected: false },
		{ name: 'DataPhantom', status: 'online', selected: false },
		{ name: 'BinaryBoss', status: 'online', selected: false }
	]; // You'll need to populate this with your users data
	let searchQuery = '';

	$: filteredUsers = users.filter(
		(user: { name: string; status: string }) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.status.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Validation
	let errors = {
		title: ''
	};

	let showToast = false;

	function validateForm() {
		let isValid = true;
		errors.title = '';

		if (!chatData.title?.trim()) {
			errors.title = 'Название чата обязательно';
			isValid = false;
		}

		return isValid;
	}

	function handleSubmit() {
		if (validateForm()) {
			// Handle chat creation
			console.log('Chat data:', chatData);
			console.log(
				'Selected users:',
				users.filter((u) => u.selected)
			);

			// Show success toast
			showToast = true;

			// Navigate after a brief delay
			setTimeout(() => {
				goto('/app/chats');
			}, 1000);
		}
	}

	function handleImageSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			chatData.avatar = input.files[0];
		}
	}

	function removeImage() {
		chatData.avatar = null;
		// Reset the file input if needed
		const input = document.getElementById('avatar-input') as HTMLInputElement;
		if (input) input.value = '';
	}
</script>

<Toast message="Чат успешно создан!" bind:visible={showToast} />

<div class="space-y-8">
	<header class="relative flex items-center justify-center">
		<h1 class="text-2xl font-bold">Новый чат</h1>
	</header>

	<div class="space-y-6">
		<!-- Avatar Selection Section -->
		<div class="flex justify-center">
			<div class="relative">
				<label
					for="avatar-input"
					class="group flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-deactivated bg-background-secondary/30 transition-all hover:border-primary"
				>
					{#if chatData.avatar}
						<img
							src={URL.createObjectURL(chatData.avatar)}
							alt="Chat avatar"
							class="h-full w-full object-cover"
						/>
					{:else}
						<div class="flex flex-col items-center space-y-2 p-4 text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-deactivated"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
							<span class="text-xs text-deactivated">Добавить фото</span>
						</div>
					{/if}
				</label>
				<input
					type="file"
					id="avatar-input"
					accept="image/*"
					on:change={handleImageSelect}
					class="hidden"
				/>
				{#if chatData.avatar}
					<button
						type="button"
						class="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600"
						on:click={removeImage}
						aria-label="Remove image"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				{/if}
			</div>
		</div>

		<!-- Chat Name Section -->
		<div class="space-y-6 rounded-xl bg-background-secondary/30 p-4">
			<div class="space-y-2">
				<label for="title" class="text-lg font-medium text-white/90">Название чата</label>
				<input
					type="text"
					id="title"
					bind:value={chatData.title}
					placeholder="Введите название чата"
					required
					class="text-md w-full rounded-lg border-2 {errors.title
						? 'border-red-500'
						: 'border-deactivated'} bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
				/>
				{#if errors.title}
					<p class="text-sm text-red-500">{errors.title}</p>
				{/if}
			</div>

			<!-- Privacy Toggle -->
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<span class="text-lg font-medium text-white/90">Закрытый чат</span>
					<p class="text-sm text-deactivated">
						Только приглашенные пользователи смогут видеть информацию
					</p>
				</div>
				<label class="relative inline-flex cursor-pointer items-center">
					<input type="checkbox" bind:checked={chatData.isPublic} class="peer sr-only" />
					<div
						class="peer h-6 w-11 rounded-full bg-deactivated after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"
					></div>
				</label>
			</div>
		</div>

		<!-- Invite Section -->
		<div class="space-y-4">
			<div class="relative">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Поиск участников"
					class="w-full rounded-lg border-2 border-deactivated bg-background-secondary/50 px-4 py-2.5 text-white placeholder:text-deactivated"
				/>
				{#if searchQuery}
					<button
						class="absolute right-3 top-1/2 -translate-y-1/2 touch-manipulation p-2"
						on:click={() => (searchQuery = '')}
						aria-label="Clear search"
					>
						✕
					</button>
				{/if}
			</div>

			<div
				class="h-[calc(100vh-25rem)] overflow-y-auto rounded-lg border-2 border-deactivated/30 p-2"
			>
				<div class="space-y-2">
					{#each filteredUsers as user}
						<div
							class="flex items-center justify-between rounded-xl bg-background-secondary/30 p-4"
						>
							<div class="flex items-center gap-3">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-medium text-white"
								>
									{user.name.charAt(0).toUpperCase()}
								</div>
								<div>
									<p class="font-medium text-white">{user.name}</p>
									<p class="text-sm text-deactivated">{user.status}</p>
								</div>
							</div>
							<label class="relative inline-flex cursor-pointer items-center">
								<input type="checkbox" bind:checked={user.selected} class="peer sr-only" />
								<div
									class="peer h-6 w-11 rounded-full bg-deactivated after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"
								></div>
							</label>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Submit Button -->
		<button
			type="button"
			on:click={handleSubmit}
			class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-light-green py-3.5 text-white transition-all hover:opacity-90"
		>
			<span class="font-medium">Создать чат</span>
		</button>
	</div>
</div>

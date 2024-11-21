<script lang="ts">
	import { goto } from '$app/navigation';
	import { Plus } from 'lucide-svelte';

	const groups = [
		{
			name: 'Кооператив гонщиков',
			members: [
				{ avatar: 'https://xsgames.co/randomusers/avatar.php?g=male' },
				{ avatar: 'https://xsgames.co/randomusers/avatar.php?g=female' },
				{ avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel' },
				{ avatar: 'https://xsgames.co/randomusers/avatar.php?g=male' },
				{ count: 2 }
			]
		}
	];

	const directMessages = [
		{ id: 1, name: 'Иван Петров', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male' },
		{ id: 2, name: 'SpeedyGonzales', avatar: 'https://xsgames.co/randomusers/avatar.php?g=female' },
		{ id: 3, name: 'Анна Сидорова', avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel' },
		{ id: 4, name: 'DriftKing', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male' },
		{
			id: 5,
			name: 'Екатерина Иванова',
			avatar: 'https://xsgames.co/randomusers/avatar.php?g=female'
		}
	];
</script>

<div class="mx-auto min-h-screen text-white">
	<header class="flex items-center justify-between p-4">
		<div class="w-8"></div>
		<h1 class="text-center text-2xl font-semibold">Чаты</h1>
		<button
			class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-deactivated"
		>
			<Plus class="h-7 w-7 stroke-[1.5px] text-white sm:h-8 sm:w-8" />
		</button>
	</header>

	<div class="mx-2 rounded-xl bg-background-secondary p-2">
		<div class="ml-2 flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="text-white"
				><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"
				></line></svg
			>
			<input
				type="text"
				placeholder="Поиск"
				class="w-full border-none bg-transparent font-medium text-white placeholder-gray-500 focus:outline-none focus:ring-0"
			/>
		</div>
	</div>

	<section>
		<div class="flex justify-between px-4 py-2 pt-6 text-deactivated">
			<h2 class="text-sm font-medium">ГРУППЫ</h2>
		</div>
		<div class="mx-4 h-[1.5px] bg-background-secondary"></div>

		{#each groups as group}
			<div class="p-4">
				<span class="text-lg font-semibold">{group.name}</span>
				<div class="mt-2 flex">
					{#each group.members as member}
						{#if member.avatar}
							<img src={member.avatar} alt="Member avatar" class="-mr-2.5 h-10 w-10 rounded-full" />
						{:else if member.count}
							<span
								class="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary text-sm"
							>
								+{member.count}
							</span>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</section>

	<section>
		<div class="flex justify-between px-4 py-2 pt-4 text-deactivated">
			<h2 class="text-sm font-medium">ЛИЧНЫЕ СООБЩЕНИЯ</h2>
		</div>
		<div class="mx-4 h-[1.5px] bg-background-secondary"></div>

		{#each directMessages as message}
			<button
				class="flex w-full cursor-pointer items-center gap-4 p-4 text-left"
				on:click={() => goto(`/chats/direct/${message.id}`)}
			>
				<img src={message.avatar} alt={message.name} class="h-12 w-12 rounded-full" />
				<span class="flex-grow text-lg font-semibold">{message.name}</span>
			</button>
		{/each}
	</section>
</div>

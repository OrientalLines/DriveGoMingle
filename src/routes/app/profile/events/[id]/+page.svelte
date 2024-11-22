<script lang="ts">
	import { Calendar, ImagePlus, MapPin, MessageCircle, MoreVertical, Pencil } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import BackButton from '$lib/components/BackButton.svelte';

	const user = 'kxrxh';

	export let data;
	const { event } = data;

	function handleBack() {
		goto('/app/profile');
	}

	function getInitials(name: string) {
		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<header class="relative flex items-center justify-between">
		<BackButton />

		<div class="flex items-center gap-2">
			<button class="hover:bg-muted/10 rounded-full p-2">
				<Pencil size={20} />
			</button>

			<button class="hover:bg-muted/10 rounded-full p-2">
				<MoreVertical size={20} />
			</button>
		</div>
	</header>

	<!-- Event Info -->
	<main class="space-y-6">
		<div class="flex items-start gap-4">
			{#if event?.authorAvatar}
				<img
					src={event.authorAvatar}
					alt={event.authorUsername}
					class="h-10 w-10 rounded-full object-cover"
				/>
			{:else}
				<div
					class="text-md flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 font-bold text-purple-400"
				>
					{getInitials(event?.authorUsername || '')}
				</div>
			{/if}
			<div class="flex flex-col">
				<h1
					class="mb-1.5 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent text-white"
				>
					{event?.title || 'Some cool Event'}
				</h1>
				<div class="text-muted-foreground flex items-center gap-2 text-sm">
					<span>организатор:</span>
					<span class="font-medium text-purple-400">@{event?.authorUsername || 'username'}</span>
				</div>
			</div>
		</div>

		<!-- Location & Date -->
		<div class="flex flex-col gap-3 rounded-xl bg-background-secondary/50 p-4">
			<div class="text-muted-foreground flex items-center gap-2 text-light-green">
				<MapPin size={24} />
				<span>{event?.location || 'St. Petersburg'}</span>
			</div>
			<div class="text-muted-foreground flex items-center gap-2 text-secondary">
				<Calendar size={24} />
				<span
					>{event?.date
						? new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
						: '10 ноя'}</span
				>
			</div>
		</div>

		<!-- Location Rating -->
		<div
			class="rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 p-4"
		>
			<h3 class="mb-2 text-sm font-medium">Рейтинг локации</h3>
			<div class="flex items-center gap-2">
				<span class="text-lg font-semibold">{event?.locationRating || 0}%</span>
				<span class="text-muted-foreground text-sm">пользователей оценили это место</span>
				<span class="text-xl">🎉</span>
			</div>
			<div class="relative mt-2 h-1.5 overflow-hidden rounded-full bg-gray-700">
				<div
					class="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
					style="width: {event?.locationRating || 0}%"
				></div>
			</div>
		</div>

		<!-- Description -->
		<div class="">
			<h3 class="mb-2 text-lg font-medium">Описание</h3>
			<p class="text-muted-foreground text-deactivated">
				{event?.description || 'Nice cool meeting to talk and drink some coffee.'}
			</p>
		</div>

		<!-- Photos Carousel -->
		<div class="space-y-4 rounded-xl bg-background-secondary/50 p-4">
			<div class="overflow-x-auto">
				<div class="flex gap-2">
					{#if event?.photos?.length}
						{#each event.photos.slice(0, 3) as photo, i}
							<div class="aspect-[16/10] w-full flex-shrink-0">
								<img
									src={photo}
									alt="Event photo {i + 1}"
									class="h-full w-full rounded-xl object-cover"
								/>
							</div>
						{/each}
					{:else}
						<div class="aspect-[16/10] w-full flex-shrink-0">
							<div
								class="flex h-full w-full items-center justify-center rounded-xl bg-background-secondary"
							>
								<span class="text-deactivated">No photos</span>
							</div>
						</div>
					{/if}
				</div>
			</div>
			<button class="flex w-full items-center justify-center rounded-xl bg-primary/5 p-5">
				<div class="text-md flex items-center gap-2 text-primary">
					<ImagePlus size={20} />
					<span>Приложить свои фотографии</span>
				</div>
			</button>
		</div>

		<!-- Chat -->
		<div class="space-y-4 rounded-xl bg-background-secondary/50 p-4">
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-medium">Чат участников</h3>
				<span class="text-muted-foreground text-sm">8/15 онлайн</span>
			</div>

			<div class="flex items-center gap-4">
				<div class="flex -space-x-2">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white ring-2 ring-background"
					>
						<span class="text-sm font-medium">AK</span>
					</div>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white ring-2 ring-background"
					>
						<span class="text-sm font-medium">MR</span>
					</div>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white ring-2 ring-background"
					>
						<span class="text-sm font-medium">PL</span>
					</div>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary ring-2 ring-background"
					>
						<span class="text-xs font-bold">+8</span>
					</div>
				</div>
			</div>

			<button
				class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 py-3 text-primary transition-colors hover:bg-primary/20"
			>
				<MessageCircle size={20} />
				<span class="font-medium">Открыть чат</span>
			</button>
		</div>

		{#if event?.authorUsername === user}
			<button
				class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-400 py-3 text-white"
			>
				<span class="font-medium">Отменить мероприятие</span>
			</button>
		{:else if event?.isParticipant}
			<button
				class="bg-muted text-muted-foreground flex w-full items-center justify-center gap-2 rounded-lg bg-deactivated/10 py-3"
				disabled
			>
				<span class="font-medium text-deactivated">Вы уже участвуете</span>
			</button>
		{:else}
			<button
				class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-white transition-colors"
			>
				<span class="font-medium">Участвовать</span>
			</button>
		{/if}
	</main>
</div>

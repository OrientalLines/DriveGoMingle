<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '$lib/components/BackButton.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import { EventStatus, EventType } from '$lib/types';
	import { ArrowLeft, ArrowRight, Ellipsis } from 'lucide-svelte';

	let view: 'list' | 'calendar' = 'list';

	const events = [
		{
			title: 'Выставка тюнингованных авто',
			status: EventStatus.PLANNED,
			participants: 80,
			participantsLimit: 100,
			type: EventType.PUBLIC,
			date: new Date('2024-02-15')
		},
		{
			title: 'Гонки на внедорожниках',
			status: EventStatus.COMPLETED,
			participants: 25,
			participantsLimit: 25,
			type: EventType.PUBLIC,
			date: new Date('2024-03-22')
		},
		{
			title: 'Парад классических автомобилей',
			status: EventStatus.PLANNED,
			participants: 45,
			participantsLimit: 60,
			type: EventType.PUBLIC,
			date: new Date('2024-05-10')
		},
		{
			title: 'Автомобильный квест по городу',
			status: EventStatus.IN_PROGRESS,
			participants: 30,
			participantsLimit: 40,
			type: EventType.PRIVATE,
			date: new Date('2024-07-05')
		},
		{
			title: 'Семинар по безопасному вождению',
			status: EventStatus.PLANNED,
			participants: 15,
			participantsLimit: 30,
			type: EventType.PUBLIC,
			date: new Date('2024-09-18')
		}
	];

	const months = [
		'Янв',
		'Фев',
		'Март',
		'Апр',
		'Май',
		'Июнь',
		'Июль',
		'Авг',
		'Сен',
		'Окт',
		'Ноя',
		'Дек'
	];
	let currentDate = new Date();
	$: currentMonth = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

	$: days = getDaysInMonth(currentDate, events);

	function getDaysInMonth(date: Date, events: any[]) {
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0);

		const emptyDays = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
		const prefixDays = Array.from({ length: emptyDays }, (_, i) => ({
			day: prevLastDay.getDate() - emptyDays + i + 1,
			current: false,
			event: null
		}));

		const monthDays = Array.from({ length: lastDay.getDate() }, (_, i) => {
			const currentDay = new Date(date.getFullYear(), date.getMonth(), i + 1);
			const event = events.find(
				(e) =>
					e.date.getDate() === i + 1 &&
					e.date.getMonth() === date.getMonth() &&
					e.date.getFullYear() === date.getFullYear()
			);
			return {
				day: i + 1,
				current: true,
				event
			};
		});

		const totalDaysShown = 42;
		const remainingDays = totalDaysShown - prefixDays.length - monthDays.length;
		const suffixDays = Array.from({ length: remainingDays }, (_, i) => ({
			day: i + 1,
			current: false,
			event: null
		}));

		return [...prefixDays, ...monthDays, ...suffixDays];
	}

	let isNavigating = false;

	function previousMonth() {
		if (isNavigating) return;
		isNavigating = true;
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
		setTimeout(() => (isNavigating = false), 300); // Prevent rapid clicks
	}

	function nextMonth() {
		if (isNavigating) return;
		isNavigating = true;
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
		setTimeout(() => (isNavigating = false), 300); // Prevent rapid clicks
	}

	const handleBack = () => {
		goto('/app/profile', { replaceState: true });
	};

	function getEventStatusColor(status: EventStatus): string {
		switch (status) {
			case EventStatus.PLANNED:
				return 'bg-[#8E96FF]';
			case EventStatus.IN_PROGRESS:
				return 'bg-[#FBA3FF]';
			case EventStatus.COMPLETED:
				return 'bg-[#A5F59C]';
			default:
				return 'bg-[#FFDD72]';
		}
	}
</script>

<div class="text-white">
	<!-- Add back button -->
	<header class="relative mb-8 flex items-center justify-center">
		<BackButton onClick={handleBack} />
		<h1 class="w-full text-center text-xl font-semibold">Мои мероприятия</h1>
		<button class="rounded-full p-2">
			<Ellipsis class="h-5 w-5" />
		</button>
	</header>

	<!-- Header -->
	<div class="mb-8">
		<!-- View Toggle -->
		<div class="mb-6 flex space-x-2">
			<button
				class="flex-1 px-4 py-2.5 text-sm font-bold {view === 'list'
					? 'bg-primary text-white'
					: 'text-gray-400'} first:rounded-l-full"
				on:click={() => (view = 'list')}
			>
				Обзор
			</button>
			<button
				class="flex-1 px-4 py-2.5 text-sm font-bold {view === 'calendar'
					? 'bg-primary text-white'
					: 'text-gray-400'} last:rounded-r-full"
				on:click={() => (view = 'calendar')}
			>
				Календарь
			</button>
		</div>

		<h1 class="mb-6 text-2xl font-semibold">Участвую</h1>
	</div>

	{#if view === 'list'}
		<!-- Events Grid -->
		<div class="grid grid-cols-2 gap-4">
			{#each events.sort((a, b) => (a.status === EventStatus.COMPLETED ? 1 : -1)) as event}
				<EventCard {event} />
			{/each}
		</div>
	{:else}
		<!-- Calendar View -->
		<div class="mx-auto max-w-2xl rounded-xl bg-background-secondary/50 p-4">
			<div class="mb-6 flex items-center justify-between">
				<button
					class="rounded-lg border-2 border-deactivated/60 p-1 hover:bg-gray-800"
					aria-label="Предыдущий месяц"
					on:click={previousMonth}
				>
					<ArrowLeft class="h-5 w-5" />
				</button>
				<span class="text-xl font-semibold text-light-green">{currentMonth}</span>
				<button
					class="rounded-lg border-2 border-deactivated/60 p-1 hover:bg-gray-800"
					aria-label="Следующий месяц"
					on:click={nextMonth}
				>
					<ArrowRight class="h-5 w-5" />
				</button>
			</div>

			<!-- Calendar Grid -->
			<div class="mx-auto grid w-full max-w-4xl grid-cols-7 gap-2 text-center font-semibold">
				<div
					class="flex h-8 w-8 items-center justify-center text-sm text-deactivated md:h-12 md:w-12 md:text-base"
				>
					В
				</div>
				<div
					class="flex h-8 w-8 items-center justify-center text-sm text-deactivated md:h-12 md:w-12 md:text-base"
				>
					П
				</div>
				<div
					class="flex h-8 w-8 items-center justify-center text-sm text-deactivated md:h-12 md:w-12 md:text-base"
				>
					В
				</div>
				<div
					class="flex h-8 w-8 items-center justify-center text-sm text-deactivated md:h-12 md:w-12 md:text-base"
				>
					С
				</div>
				<div
					class="flex h-8 w-8 items-center justify-center text-sm text-deactivated md:h-12 md:w-12 md:text-base"
				>
					Ч
				</div>
				<div
					class="flex h-8 w-8 items-center justify-center text-sm text-deactivated md:h-12 md:w-12 md:text-base"
				>
					П
				</div>
				<div
					class="flex h-8 w-8 items-center justify-center text-sm text-deactivated md:h-12 md:w-12 md:text-base"
				>
					С
				</div>

				{#each days as { day, current, event }}
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold hover:bg-gray-800 md:h-12 md:w-12
            md:text-base
            {!current ? 'text-gray-600' : ''}
            {day === new Date().getDate() &&
						current &&
						currentDate.getMonth() === new Date().getMonth() &&
						currentDate.getFullYear() === new Date().getFullYear()
							? 'bg-blue-500'
							: ''}
            {event ? getEventStatusColor(event.status) : ''}"
					>
						{day}
					</div>
				{/each}
			</div>

			<!-- Add month indicators -->
			<div class="mt-4 flex justify-center space-x-2">
				{#each months as month, index}
					<div
						class="h-3 w-3 rounded-full {currentDate.getMonth() === index
							? 'bg-light-green'
							: 'bg-deactivated/60'}"
						title={month}
					></div>
				{/each}
			</div>
		</div>
	{/if}
</div>

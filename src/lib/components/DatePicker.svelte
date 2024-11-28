<script lang="ts">
	import { Calendar } from 'lucide-svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	export let value: string = '';

	const dispatch = createEventDispatcher();
	let showCalendar = false;
	let currentDate = new Date();
	let datePickerElement: HTMLDivElement;

	$: selectedDate = value ? new Date(value) : null;

	// Handle click outside
	function handleClickOutside(event: MouseEvent) {
		if (datePickerElement && !datePickerElement.contains(event.target as Node)) {
			showCalendar = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь'
	];

	function getDaysInMonth(year: number, month: number) {
		return new Date(year, month + 1, 0).getDate();
	}

	function getFirstDayOfMonth(year: number, month: number) {
		const day = new Date(year, month, 1).getDay();
		return day === 0 ? 7 : day;
	}

	function getPreviousMonthDays(year: number, month: number) {
		const firstDay = getFirstDayOfMonth(year, month);
		const prevMonth = month === 0 ? 11 : month - 1;
		const prevYear = month === 0 ? year - 1 : year;
		const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

		return Array.from({ length: firstDay - 1 }, (_, i) => ({
			day: daysInPrevMonth - (firstDay - 2) + i,
			month: prevMonth,
			year: prevYear
		}));
	}

	function getNextMonthDays(year: number, month: number) {
		const daysInMonth = getDaysInMonth(year, month);
		const firstDayOfMonth = getFirstDayOfMonth(year, month);
		const totalDaysToShow = 42; // 6 rows × 7 days
		const daysFromPrevMonth = firstDayOfMonth - 1;
		const nextDaysNeeded = totalDaysToShow - daysInMonth - daysFromPrevMonth;

		const nextMonth = month === 11 ? 0 : month + 1;
		const nextYear = month === 11 ? year + 1 : year;

		return Array.from({ length: nextDaysNeeded }, (_, i) => ({
			day: i + 1,
			month: nextMonth,
			year: nextYear
		}));
	}

	function handleDateSelect(
		day: number,
		month = currentDate.getMonth(),
		year = currentDate.getFullYear()
	) {
		const newDate = new Date(year, month, day);
		value = newDate.toISOString();
		dispatch('change', { value });
		showCalendar = false;
	}

	function previousMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
	}

	function nextMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
	}
</script>

<div class="relative" bind:this={datePickerElement}>
	<button
		type="button"
		class="text-md relative w-full rounded-lg border-2 border-deactivated bg-background-secondary/50 px-4 py-2 text-left text-white focus:ring-2 focus:ring-primary"
		on:click={() => (showCalendar = !showCalendar)}
	>
		<div class="flex items-center gap-2">
			<Calendar size={20} class="text-primary" />
			<span>
				{selectedDate
					? selectedDate.toLocaleDateString('ru-RU', {
							day: 'numeric',
							month: 'short'
						})
					: 'Выберите дату'}
			</span>
		</div>
	</button>

	{#if showCalendar}
		<div
			class="absolute z-50 mt-2 w-full space-y-4 rounded-xl bg-background-secondary p-4 shadow-lg"
		>
			<div class="mb-4 flex items-center justify-between">
				<button
					type="button"
					class="rounded-full p-2 text-secondary hover:bg-secondary/10"
					on:click={previousMonth}
				>
					←
				</button>
				<span class="font-medium text-white">
					{months[currentDate.getMonth()]}
					{currentDate.getFullYear()}
				</span>
				<button
					type="button"
					class="rounded-full p-2 text-secondary hover:bg-secondary/10"
					on:click={nextMonth}
				>
					→
				</button>
			</div>

			<div class="grid grid-cols-7 gap-1 text-center text-sm">
				<span class="text-deactivated">Пн</span>
				<span class="text-deactivated">Вт</span>
				<span class="text-deactivated">Ср</span>
				<span class="text-deactivated">Чт</span>
				<span class="text-deactivated">Пт</span>
				<span class="text-deactivated">Сб</span>
				<span class="text-deactivated">Вс</span>

				<!-- Previous month days -->
				{#each getPreviousMonthDays(currentDate.getFullYear(), currentDate.getMonth()) as { day, month, year }}
					<button
						type="button"
						class="rounded-full p-1.5 text-sm text-deactivated opacity-50 transition-colors hover:bg-secondary/10"
						on:click={() => handleDateSelect(day, month, year)}
					>
						{day}
					</button>
				{/each}

				<!-- Current month days -->
				{#each Array(getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())) as _, i}
					{@const day = i + 1}
					<button
						type="button"
						class="rounded-full p-1.5 text-sm transition-colors
							{selectedDate?.getDate() === day &&
						selectedDate?.getMonth() === currentDate.getMonth() &&
						selectedDate?.getFullYear() === currentDate.getFullYear()
							? 'bg-secondary text-white'
							: 'hover:bg-secondary/10 hover:text-secondary'}"
						on:click={() => handleDateSelect(day)}
					>
						{day}
					</button>
				{/each}

				<!-- Next month days -->
				{#each getNextMonthDays(currentDate.getFullYear(), currentDate.getMonth()) as { day, month, year }}
					<button
						type="button"
						class="rounded-full p-1.5 text-sm text-deactivated opacity-50 transition-colors hover:bg-secondary/10"
						on:click={() => handleDateSelect(day, month, year)}
					>
						{day}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

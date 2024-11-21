<script lang="ts">
	import { EventStatus, type EventShortInfo } from '$lib/types';

	export let event: EventShortInfo;

	const statusColorMap = {
		[EventStatus.COMPLETED]: '#8E96FF',
		[EventStatus.PLANNED]: '#FF968E',
		[EventStatus.IN_PROGRESS]: '#89cf80'
	} as const;
</script>

<div class="h-[180px] w-full rounded-xl bg-background-secondary/50 p-4">
	<div class="flex h-full flex-col">
		<div class="h-[72px]">
			<div class="mb-2">
				<span
					class="rounded-full px-3 py-1 text-sm font-bold text-white/90 shadow-sm"
					style="background-color: {statusColorMap[
						event.status
					]}; text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
				>
					{event.status === EventStatus.COMPLETED
						? 'Завершен'
						: event.status === EventStatus.PLANNED
							? 'Запланирован'
							: 'В процессе'}
				</span>
			</div>
			<h3 class="mb-1 line-clamp-2 text-sm font-medium">{event.title}</h3>
			<p class="text-xs text-gray-500">{event.type}</p>
		</div>

		<div class="mt-auto">
			<div class="mb-2 h-2 rounded-full bg-white/10">
				<div
					class="h-full rounded-full bg-primary-gradient"
					style="width: {(event.participants / event.participantsLimit) * 100}%"
				></div>
			</div>
			<p class="text-right text-xs font-medium text-deactivated">
				{event.participants}/{event.participantsLimit}
			</p>
		</div>
	</div>
</div>

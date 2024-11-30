import { EventStatus, EventType } from '$lib/types';

export const load = ({ status }: { status: EventStatus | undefined }) => {
	return [
		{
			id: 1,
			title: 'Cool meetup',
			status: EventStatus.IN_PROGRESS,
			participants: 13,
			participantsLimit: 15,
			type: EventType.PUBLIC
		},
		{
			id: 2,
			title: 'Ferrari Meet',
			status: EventStatus.IN_PROGRESS,
			participants: 9,
			participantsLimit: 20,
			type: EventType.PUBLIC
		},
		{
			id: 3,
			title: 'Tsunami Picnic',
			status: EventStatus.PLANNED,
			participants: 5,
			participantsLimit: 1000,
			type: EventType.PUBLIC
		},
		{
			id: 4,
			title: 'Swamp Rust',
			status: EventStatus.PLANNED,
			participants: 18,
			participantsLimit: 50,
			type: EventType.PUBLIC
		},
		{
			id: 5,
			title: 'Evening Meet',
			status: EventStatus.IN_PROGRESS,
			participants: 10,
			participantsLimit: 20,
			type: EventType.PUBLIC
		},
		{
			id: 6,
			title: 'JDM Meet',
			status: EventStatus.PLANNED,
			participants: 25,
			participantsLimit: 30,
			type: EventType.PUBLIC
		},
		{
			id: 7,
			title: 'German Classics',
			status: EventStatus.COMPLETED,
			participants: 40,
			participantsLimit: 40,
			type: EventType.PUBLIC
		},
		{
			id: 8,
			title: 'Night Drift Session',
			status: EventStatus.IN_PROGRESS,
			participants: 12,
			participantsLimit: 16,
			type: EventType.PUBLIC
		},
		{
			id: 9,
			title: 'Stance & Fitment',
			status: EventStatus.PLANNED,
			participants: 8,
			participantsLimit: 15,
			type: EventType.PUBLIC
		},
		{
			id: 10,
			title: 'Stance & Fitment',
			status: EventStatus.PLANNED,
			participants: 8,
			participantsLimit: 15,
			description: 'Встреча любителей stance-культуры. Обсуждение настроек подвески и фитмента',
			date: 'Apr 8, 9:00AM',
			location: 'Underground Parking',
			private: true
		}
	].filter((item) => (status === undefined ? true : item.status === status));
};

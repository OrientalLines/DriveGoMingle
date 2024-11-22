import { EventStatus } from "$lib/types";

export const load = ({ params }) => {
	// For now, using mock data - replace with actual API call later
	const items = [
		{
			id: 1,
			title: 'Cool meetup',
			status: EventStatus.IN_PROGRESS,
			participants: 13,
			participantsLimit: 15,
			description: 'Cool meetup description',
			date: 'Mar 20, 4:30PM',
			location: 'Sample Location 1'
		},
		{
			id: 2,
			title: 'Ferrari Meet',
			status: EventStatus.IN_PROGRESS,
			participants: 9,
			participantsLimit: 20,
			description: 'Ferrari meet description',
			date: 'Mar 22, 2:00PM',
			location: 'Sample Location 2'
		},
		{
			id: 3,
			title: 'Tsunami Picnic',
			status: EventStatus.PLANNED,
			participants: 5,
			participantsLimit: 1000,
			description: 'Big beach party with music and food',
			date: 'Apr 15, 12:00PM',
			location: 'Beach Resort'
		},
		{
			id: 4,
			title: 'Swamp Rust',
			status: EventStatus.PLANNED,
			participants: 18,
			participantsLimit: 50,
			description: 'Rust programming workshop in nature',
			date: 'Apr 1, 10:00AM',
			location: 'Nature Park'
		},
		{
			id: 5,
			title: 'Evening Meet',
			status: EventStatus.IN_PROGRESS,
			participants: 10,
			participantsLimit: 20,
			description: 'Casual evening networking event',
			date: 'Mar 25, 6:00PM',
			location: 'Downtown Cafe'
		},
		{
			id: 6,
			title: 'JDM Meet',
			status: EventStatus.PLANNED,
			participants: 25,
			participantsLimit: 30,
			description: 'Встреча владельцев японских автомобилей. Особое внимание Skyline, Supra, Silvia',
			date: 'Apr 5, 11:00AM',
			location: 'Парковка ТРЦ Мега'
		},
		{
			id: 7,
			title: 'German Classics',
			status: EventStatus.COMPLETED,
			participants: 40,
			participantsLimit: 40,
			description: 'Выставка классических немецких автомобилей. BMW, Mercedes, Porsche',
			date: 'Mar 15, 7:00PM',
			location: 'Исторический центр'
		},
		{
			id: 8,
			title: 'Night Drift Session',
			status: EventStatus.IN_PROGRESS,
			participants: 12,
			participantsLimit: 16,
			description: 'Ночная дрифт-сессия на закрытой трассе. Только для опытных водителей',
			date: 'Mar 23, 6:30PM',
			location: 'Автодром'
		},
		{
			id: 9,
			title: 'Stance & Fitment',
			status: EventStatus.PLANNED,
			participants: 8,
			participantsLimit: 15,
			description: 'Встреча любителей stance-культуры. Обсуждение настроек подвески и фитмента',
			date: 'Apr 8, 9:00AM',
			location: 'Underground Parking'
		}
	];

	const event = items.find((item) => item.id === parseInt(params.id));

	return {
		event
	};
};

import { EventStatus, EventType } from '$lib/types';
import { writable } from 'svelte/store';

type Event = {
	id: number;
	title: string;
	authorUsername: string;
	authorAvatar: string;
	status: EventStatus;
	participants: number;
	participantsLimit: number;
	type: EventType;
	location: string;
	date: string;
	time: string;
	description: string;
	locationRating: number;
	categories: string[];
	photos: string[];
	isParticipant: boolean;
};

// Import initial events from your +page.ts or define them here
export const events = writable<Event[]>([
	{
		id: 1,
		title: 'Дрифт-соревнования',
		authorUsername: 'kxrxh',
		authorAvatar: '',
		status: EventStatus.COMPLETED,
		participants: 35,
		participantsLimit: 35,
		type: EventType.PUBLIC,
		location: 'Автодром "Скорость", Санкт-Петербург',
		date: '2024-03-15',
		time: '14:00',
		description:
			'Профессиональные соревнования по дрифту с участием лучших пилотов города. Зрелищные заезды, дым из-под колес и накал страстей!',
		locationRating: 68,
		categories: ['drift', 'competition', 'motorsport'],
		photos: [
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130931/DSC02045-1200x800.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130916/DSC09059-680x453.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04125015/DSC00194.jpg'
		],
		isParticipant: true
	},
	{
		id: 2,
		title: 'Мотофестиваль "Два колеса"',
		authorUsername: 'bikerclub',
		authorAvatar: '',
		status: EventStatus.PLANNED,
		participants: 75,
		participantsLimit: 100,
		type: EventType.PUBLIC,
		location: 'Парк 300-летия, Санкт-Петербург',
		date: '2024-05-20',
		time: '12:00',
		description:
			'Грандиозный мотофестиваль с участием байкеров со всей России. Выставка мотоциклов, трюковые шоу, живая музыка и многое другое!',
		locationRating: 94,
		categories: ['motorcycle', 'festival', 'entertainment'],
		photos: [
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130931/DSC02045-1200x800.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130916/DSC09059-680x453.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04125015/DSC00194.jpg'
		],
		isParticipant: false
	},
	{
		id: 4,
		title: 'Мастер-класс по экстремальному вождению',
		authorUsername: 'extremedriver',
		authorAvatar: '',
		status: EventStatus.PLANNED,
		participants: 22,
		participantsLimit: 25,
		type: EventType.PUBLIC,
		location: 'Центр водительского мастерства, Пушкин',
		date: '2024-06-05',
		time: '10:00',
		description:
			'Интенсивный курс экстремального вождения от профессиональных инструкторов. Теория и практика на специально оборудованной площадке.',
		locationRating: 98,
		categories: ['training', 'extreme', 'safety'],
		photos: [
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130931/DSC02045-1200x800.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130916/DSC09059-680x453.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04125015/DSC00194.jpg'
		],
		isParticipant: true
	},
	{
		id: 5,
		title: 'Выставка тюнингованных авто',
		authorUsername: 'tuningpro',
		authorAvatar: '',
		status: EventStatus.PLANNED,
		participants: 80,
		participantsLimit: 100,
		type: EventType.PUBLIC,
		location: 'Экспофорум, Санкт-Петербург',
		date: '2024-04-20',
		time: '11:00',
		description:
			'Крупнейшая выставка тюнингованных автомобилей в Северо-Западном регионе. Уникальные проекты, мастер-классы и конкурсы.',
		locationRating: 98,
		categories: ['exhibition', 'tuning', 'showcase'],
		photos: [
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130931/DSC02045-1200x800.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130916/DSC09059-680x453.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04125015/DSC00194.jpg'
		],
		isParticipant: true
	},
	{
		id: 6,
		title: 'Гонки на внедорожниках',
		authorUsername: 'offroadmaster',
		authorAvatar: '',
		status: EventStatus.COMPLETED,
		participants: 25,
		participantsLimit: 25,
		type: EventType.PUBLIC,
		location: 'Трасса "Грязь и слава", Ленинградская область',
		date: '2024-03-01',
		time: '09:00',
		description:
			'Экстремальные соревнования на подготовленных внедорожниках. Сложная трасса, преодоление препятствий, командный дух.',
		locationRating: 94,
		categories: ['offroad', 'racing', 'extreme'],
		photos: [
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130931/DSC02045-1200x800.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130916/DSC09059-680x453.jpg'
		],
		isParticipant: true
	},
	{
		id: 7,
		title: 'Парад классических автомобилей',
		authorUsername: 'retrocar',
		authorAvatar: '',
		status: EventStatus.PLANNED,
		participants: 45,
		participantsLimit: 60,
		type: EventType.PUBLIC,
		location: 'Невский проспект, Санкт-Петербург',
		date: '2024-07-15',
		time: '13:00',
		description:
			'Торжественный парад ретро-автомобилей в центре города. Выставка, конкурс на лучшую реставрацию, общение с коллекционерами.',
		locationRating: 96,
		categories: ['retro', 'parade', 'exhibition'],
		photos: [
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130931/DSC02045-1200x800.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130916/DSC09059-680x453.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04125015/DSC00194.jpg'
		],
		isParticipant: true
	},
	{
		id: 8,
		title: 'Автомобильный квест по городу',
		authorUsername: 'questmaster',
		authorAvatar: '',
		status: EventStatus.IN_PROGRESS,
		participants: 30,
		participantsLimit: 40,
		type: EventType.PRIVATE,
		location: 'Старт: Московская площадь, Санкт-Петербург',
		date: '2024-04-05',
		time: '15:00',
		description:
			'Увлекательный автомобильный квест по историческим местам города. Загадки, головоломки и интересные задания.',
		locationRating: 92,
		categories: ['quest', 'entertainment', 'tourism'],
		photos: [
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130931/DSC02045-1200x800.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130916/DSC09059-680x453.jpg'
		],
		isParticipant: true
	},
	{
		id: 9,
		title: 'Семинар по безопасному вождению',
		authorUsername: 'safetyexpert',
		authorAvatar: '',
		status: EventStatus.PLANNED,
		participants: 15,
		participantsLimit: 30,
		type: EventType.PUBLIC,
		location: 'Автошкола "Профессионал", Санкт-Петербург',
		date: '2024-05-10',
		time: '16:00',
		description:
			'Теоретический и практический семинар по безопасному вождению в городских условиях. Разбор сложных ситуаций, советы экспертов.',
		locationRating: 90,
		categories: ['education', 'safety', 'theory'],
		photos: [
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130931/DSC02045-1200x800.jpg',
			'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2020/03/04130916/DSC09059-680x453.jpg'
		],
		isParticipant: true
	}
]);

export function addEvent(eventData: Partial<Event>) {
	const newEvent = {
		...eventData,
		id: Math.floor(Math.random() * 10000) + 10, // Random ID starting from 10
		status: EventStatus.PLANNED,
		participants: 0,
		authorUsername: 'kxrxh', // Hardcoded for prototype
		authorAvatar: '',
		isParticipant: true,
		locationRating: Math.floor(Math.random() * 30) + 70 // Random rating 70-100
	};

	events.update((currentEvents) => [...currentEvents, newEvent as Event]);
	return newEvent.id;
}

export function leaveEvent(eventId: number) {
	events.update((currentEvents) =>
		currentEvents.map((event) =>
			event.id === eventId ? { ...event, isParticipant: false } : event
		)
	);
}

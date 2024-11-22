export async function load({ params }) {
	const events = [
		{
			id: 1,
			title: 'Дрифт-соревнования',
			authorUsername: 'kxrxh',
			authorAvatar: '',
			status: 'COMPLETED',
			participants: 35,
			participantsLimit: 35,
			type: 'PUBLIC',
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
			status: 'PLANNED',
			participants: 75,
			participantsLimit: 100,
			type: 'PUBLIC',
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
			id: 3,
			title: 'Ночной автопробег',
			authorUsername: 'kxrxh',
			authorAvatar: ''
		},
		{
			id: 4,
			title: 'Мастер-класс по экстремальному вождению',
			authorUsername: 'extremedriver',
			authorAvatar: '/avatars/extremedriver.jpg',
			status: 'PLANNED',
			participants: 22,
			participantsLimit: 25,
			type: 'PUBLIC',
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
			status: 'PLANNED',
			participants: 80,
			participantsLimit: 100,
			type: 'PUBLIC',
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
			status: 'COMPLETED',
			participants: 25,
			participantsLimit: 25,
			type: 'PUBLIC',
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
			status: 'PLANNED',
			participants: 45,
			participantsLimit: 60,
			type: 'PUBLIC',
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
			status: 'IN_PROGRESS',
			participants: 30,
			participantsLimit: 40,
			type: 'PRIVATE',
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
			status: 'PLANNED',
			participants: 15,
			participantsLimit: 30,
			type: 'PUBLIC',
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
	];

	return { event: events.find((event) => event.id === Number(params.id)) };
}

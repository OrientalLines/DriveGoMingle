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
		}
	];

	const event = items.find((item) => item.id === parseInt(params.id));

	return {
		event
	};
};

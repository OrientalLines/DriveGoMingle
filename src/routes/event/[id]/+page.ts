export const load = ({ params }) => {
    // For now, using mock data - replace with actual API call later
    const items = [
        { id: 1, title: 'Cool meetup', status: 'В ПРОЦЕССЕ', progress: '13/15', description: 'Cool meetup description', date: 'Mar 20, 4:30PM', location: 'Sample Location 1' },
        { id: 2, title: 'Ferrari Meet', status: 'В ПРОЦЕССЕ', progress: '9/20', description: 'Ferrari meet description', date: 'Mar 22, 2:00PM', location: 'Sample Location 2' },
        // ... other items
    ];

	const event = items.find((item) => item.id === parseInt(params.id));

	return {
		event
    };
}; 
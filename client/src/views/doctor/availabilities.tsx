import { generateCurrentWeek } from '@/utils/utils';
import { Button, Card } from '@/ui/index';

export default function Availabilities() {
	const currentWeek = generateCurrentWeek();
	const date = currentWeek.map((week) => week.formattedDate)
	const timeSlots = [
		{ startTime: '09:00', endTime: '12:00' },
		{ startTime: '13:00', endTime: '16:00' },
		{ startTime: '17:00', endTime: '20:00' }
	]
	
	const handleSave = () => {
	
	};
	
	return (
		<Card className={'max-w-[1000px]'}>
			<Card.Header
				title={'Set Your Availability'}
				description={'Choose the time slots you\'re available for appointments each day.'}
			/>
			
			<Card.Content className={'gap-6 grid md:grid-cols-2 lg:grid-cols-3'}>
				{}
			</Card.Content>
			
			<Card.Footer>
				<Button
					type={'submit'}
					onClick={handleSave}
					className={'mt-5 w-full'}
				>
					Save Availability
				</Button>
			</Card.Footer>
		</Card>
	);
}
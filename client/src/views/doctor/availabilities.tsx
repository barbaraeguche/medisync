import { generateCurrentWeek } from '@/utils/utils.ts';
import CardLayout from '@/layouts/cards.tsx';
import CardHeader from '@/components/card-header.tsx';

export default function Availabilities() {
	
	return (
		<CardLayout className={'max-w-[800px]'}>
			<CardHeader
				title={'Set Your Availability'}
				description={'Choose the time slots you\'re available for appointments each day.'}
			/>
			
			<div>
				{generateCurrentWeek().map((week, idx) => (
					<p key={idx}>
						{week.isoDate} {' '} {week.formattedDate}
					</p>
				))}
			</div>
		</CardLayout>
	);
}
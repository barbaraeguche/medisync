import { generateCurrentWeek } from '@/utils/utils';
import { Button, Card } from '@/ui/index';
import { useState } from 'react';

interface DayAvailability {
	[key: string]: boolean
}
interface WeekAvailability {
	[key: string]: DayAvailability
}

const [date, formattedDate] = generateCurrentWeek().reduce<[string[], string[]]>(
	([dateArr, formatedArr], { date, formattedDate }) => {
		dateArr.push(date);
		formatedArr.push(formattedDate);
		return [dateArr, formatedArr];
	},
	[[], []]
);
const timeSlots = [
	{ startTime: '09:00', endTime: '12:00' },
	{ startTime: '13:00', endTime: '16:00' },
	{ startTime: '17:00', endTime: '20:00' }
]

// TODO: need to replace this with actual data
const retrieved =	[
	{
		"date": "2025-02-18",
		"startTime": "09:00",
		"endTime": "12:00"
	},
		{
			"date": "2025-02-18",
			"startTime": "13:00",
			"endTime": "16:00"
		},
		{
			"date": "2025-02-18",
			"startTime": "17:00",
			"endTime": "20:00"
		},
		{
			"date": "2025-02-19",
			"startTime": "09:00",
			"endTime": "12:00"
		},
		{
			"date": "2025-02-19",
			"startTime": "13:00",
			"endTime": "16:00"
		},
		{
			"date": "2025-02-19",
			"startTime": "17:00",
			"endTime": "20:00"
		},
		{
			"date": "2025-02-21",
			"startTime": "09:00",
			"endTime": "12:00"
		},
		{
			"date": "2025-02-21",
			"startTime": "13:00",
			"endTime": "16:00"
		},
		{
			"date": "2025-02-22",
			"startTime": "09:00",
			"endTime": "12:00"
		},
		{
			"date": "2025-02-22",
			"startTime": "13:00",
			"endTime": "16:00"
		},
		{
			"date": "2025-02-22",
			"startTime": "17:00",
			"endTime": "20:00"
		}
	]

export default function Availabilities() {
	const [availability, setAvailability] = useState<WeekAvailability>(() => {
		const initial: WeekAvailability = {}
		
		date.forEach((day) => {
			initial[day] = {};
			timeSlots.forEach((slot) => {
				initial[day][`${slot.startTime}-${slot.endTime}`] = false;
			});
		});
		
		// set the initial availability if provided
		retrieved.forEach((app) => {
			const { date, startTime, endTime } = app;
			const timeSlot = `${startTime}-${endTime}`;
			
			if (initial[date] && timeSlot in initial[date]) {
				initial[date][timeSlot] = true;
			}
		})
		
		return initial;
	});
	
	const handleCheckChange = (date: string, timeSlot: string) => {
		setAvailability((prev) => ({
			...prev,
			[date]: {
				...prev[date],
				[timeSlot]: !prev[date][timeSlot]
			}
		}));
	};
	
	const handleSave = () => {
		const savedAvailability = [];
		
		for (const [date, slots] of Object.entries(availability)) {
			for (const [timeSlot, isAvailable] of Object.entries(slots)) {
				if (isAvailable) {
					const [startTime, endTime] = timeSlot.split('-');
					savedAvailability.push({ date, startTime, endTime });
				}
			}
		}
		console.log(savedAvailability)
	};
	
	return (
		<Card className={'max-w-[1000px]'}>
			<Card.Header
				title={'Set Your Availability'}
				description={'Choose the time slots you\'re available for appointments each day.'}
			/>
			
			<Card.Content className={'gap-6 grid md:grid-cols-2 lg:grid-cols-3'}>
				{formattedDate.map((day, idx) => (
					<div
						key={day}
						className={'space-y-2'}
					>
						<h4 className={'font-medium mb-2'}>{day}</h4>
						{timeSlots.map((slot) => (
							<div
								key={`${date[idx]}-${slot.startTime}-${slot.endTime}`}
								className={'flex items-center space-x-2'}
							>
								<input
                  type={'checkbox'}
                  className={'peer accent-background shadow-sm checked:shadow-none'}
                  id={`${date[idx]}-${slot.startTime}-${slot.endTime}`}
                  name={`${date[idx]}-${slot.startTime}-${slot.endTime}`}
                  checked={availability[date[idx]][`${slot.startTime}-${slot.endTime}`]}
                  onChange={() => handleCheckChange(date[idx], `${slot.startTime}-${slot.endTime}`)}
                />
                <label
                  htmlFor={`${date[idx]}-${slot.startTime}-${slot.endTime}`}
                  className={'text-gray-500 text-sm font-medium leading-tight cursor-pointer peer-checked:cursor-default peer-checked:opacity-70'}
                >
                  {slot.startTime} - {slot.endTime}
                </label>
							</div>
						))}
					</div>
				))}
			</Card.Content>
			
			<Card.Footer>
				<Button
					// type={'submit'}
					onClick={handleSave}
					className={'mt-5 w-full'}
				>
					Save Availability
				</Button>
			</Card.Footer>
		</Card>
	);
}
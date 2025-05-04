import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { saveAvailability } from '@/redux/thunks/doctor-thunk';
import { resetStatus } from '@/redux/slices/doctor-slice';
import { getCurrentWeek } from '@/utils/utils';
import Spinner from '@/components/spinner';
import { Button, Card } from '@/components/ui';

interface DayAvailability {
	[key: string]: boolean
}
interface WeekAvailability {
	[key: string]: DayAvailability
}

const [date, displayedDate] = getCurrentWeek();
const timeSlots = [
	{ startTime: '09:00', endTime: '12:00' },
	{ startTime: '13:00', endTime: '16:00' },
	{ startTime: '17:00', endTime: '20:00' }
];

export default function Availabilities() {
	const dispatch = useAppDispatch();
	const { doctor, status } = useAppSelector((state) => state.doctorSlice);
	
	const isSubmitting = status === 'pending';
	
	const [availability, setAvailability] = useState<WeekAvailability>(() => {
		const initial: WeekAvailability = {};
		
		date.forEach((day) => {
			initial[day] = {};
			timeSlots.forEach((slot) => {
				initial[day][`${slot.startTime}-${slot.endTime}`] = false;
			});
		});
		
		// set the initial availability if provided
		doctor.availabilities?.forEach((appt) => {
			const { date, startTime, endTime } = appt;
			const timeSlot = `${startTime}-${endTime}`;
			
			if (initial[date] && timeSlot in initial[date]) {
				initial[date][timeSlot] = true;
			}
		});
		
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
	
	const handleSave = async () => {
		const availabilities = [];
		
		for (const [date, slots] of Object.entries(availability)) {
			for (const [timeSlot, isAvailable] of Object.entries(slots)) {
				if (isAvailable) {
					const [startTime, endTime] = timeSlot.split('-');
					availabilities.push({ date, startTime, endTime });
				}
			}
		}
		
		await dispatch(saveAvailability({
			id: doctor._id,
			availabilityInfo: availabilities
		}));
		dispatch(resetStatus());
	};
	
	return (
		<Card className={'max-w-[1000px]'}>
			<Card.Header
				title={'Set Your Availability'}
				description={'Choose the time slots you\'re available for appointments each day.'}
			/>
			
			<Card.Content className={'gap-6 grid md:grid-cols-2 lg:grid-cols-3'}>
				{displayedDate.map((day, idx) => (
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
                  id={`${date[idx]}-${slot.startTime}-${slot.endTime}`}
                  name={`${date[idx]}-${slot.startTime}-${slot.endTime}`}
									className={'peer accent-background shadow-sm checked:shadow-none'}
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
					onClick={handleSave}
					disabled={isSubmitting}
					className={'mt-5 w-full'}
					aria-label={'Save Availability'}
				>
					{isSubmitting && <Spinner/>}
					Save Availability
				</Button>
			</Card.Footer>
		</Card>
	);
}
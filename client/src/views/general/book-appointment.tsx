import { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentSchema, AppointmentType } from '@/schemas/appointment-schema';
import {
	formatDate, generateLabelValue, generateTimeSlots
} from '@/utils/utils.ts';
import { appointmentType } from '@/utils/constants';
import InputWrapper from '@/components/input-wrapper';
import { Button, Card, Select } from '@/ui/index';

const doctorOptions = [
	{ value: "3f98e8a2-6b4d-4c02-bf89-7c72a2d1e3b5", label: "Dr. Sarah Smith" },
	{ value: "d1e3f5a8-9c4b-41f6-b2c7-8d70e5a9f134", label: "Dr. John Doe" },
	{ value: "a72d1e39-6f5b-4d12-89c7-3b0e8a4f2d5c", label: "Dr. Emily Brown" },
]
const henna = [
	{
		"id": doctorOptions[0].value,
		"date": "2025-02-18",
		"startTime": "09:00",
		"endTime": "12:00"
	},
	{
		"id": doctorOptions[1].value,
		"date": "2025-02-18",
		"startTime": "13:00",
		"endTime": "16:00"
	},
	{
		"id": doctorOptions[2].value,
		"date": "2025-02-18",
		"startTime": "17:00",
		"endTime": "20:00"
	},
	{
		"id": doctorOptions[0].value,
		"date": "2025-02-19",
		"startTime": "9:00",
		"endTime": "12:00"
	},
	{
		"date": "2025-02-19",
		"startTime": "17:00",
		"endTime": "20:00"
	},
];

export default function BookAppointment() {
	const {
		register, handleSubmit, formState: { errors }, control, watch
	} = useForm<AppointmentType>({
		resolver: zodResolver(AppointmentSchema),
		reValidateMode: 'onBlur'
	});
	
	const [doctorId, appointmentDate] = watch(['doctorId', 'date']);
	
	// TODO: remove !id in production, also check if the appointment date isn't already booked
	// filter appointments by doctorId (or include those without a specified doctor)
	const getDoctorDetails = useMemo(() => {
		return henna.filter(({ id }) => id === doctorId || !id);
	}, [doctorId]);
	
	// find all dates available dates for the chosen doctor
	const getDateOptions = useMemo(() => {
		const dateSet = new Set<string>();
		
		return getDoctorDetails
			.filter(({ date }) => {
				if (dateSet.has(date)) return false;
				dateSet.add(date);
				return true;
			})
			.map(({ date }) =>
				generateLabelValue(date, formatDate(date)));
	}, [getDoctorDetails]);
	
	const getTimeOptions = useMemo(() => {
		// find all time slots for the selected doctor & date
		const timeSet = new Set<string>();
		
		const uniqueSlots =  getDoctorDetails
			.filter(({ date }) => date === appointmentDate)
			.filter(({ startTime }) => {
				if (timeSet.has(startTime)) return false;
				timeSet.add(startTime);
				return true;
			});
		
		// generate the differences
		return uniqueSlots.flatMap(({ startTime, endTime }) =>
			generateTimeSlots(endTime, startTime));
	}, [getDoctorDetails, appointmentDate]);
	
	const onSubmit: SubmitHandler<AppointmentType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card className={'max-w-[700px]'}>
				<Card.Header
					title={'Book an Appointment'}
					description={'Select a doctor, date, and time for your appointment.'}
				/>
				
				<Card.Content>
					{/* doctor */}
					<Select
						conf={{
							label: 'Preferred Doctor',
							placeholder: 'Choose a doctor'
						}}
						name={'doctorId'}
						control={control}
						options={doctorOptions}
						error={errors.doctorId}
					/>
					
					{/* date */}
					<Select
						disabled={!doctorId}
						conf={{
							label: 'Preferred Date',
							placeholder: 'Choose a date'
						}}
						name={'date'}
						control={control}
						options={getDateOptions}
						error={errors.date}
					/>
					
					{/* time */}
					<Select
						disabled={!appointmentDate}
						conf={{
							label: 'Preferred Time',
							placeholder: 'Choose a time'
						}}
						name={'time'}
						control={control}
						options={getTimeOptions}
						error={errors.time}
					/>
					
					{/* type */}
					<Select
						conf={{
							label: 'Appointment Type',
							placeholder: 'Choose a type'
						}}
						name={'type'}
						control={control}
						options={appointmentType}
						error={errors.type}
					/>
					
					{/* notes */}
					<InputWrapper
						{...register('notes')}
						conf={{
							label: 'Additional Notes (Optional)',
							placeholder: 'Anything you want your doctor to know?'
						}}
						name={'notes'}
						error={errors.notes}
					/>
				</Card.Content>
				
				<Card.Footer>
					<Button
						type={'submit'}
						className={'mt-5 w-full'}
					>
						Book Appointment
					</Button>
				</Card.Footer>
			</Card>
		</form>
	);
}
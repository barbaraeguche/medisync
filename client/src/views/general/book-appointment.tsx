import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentSchema, AppointmentType } from '@/schemas/appointment-schema';
import { formatDate } from '@/utils/utils.ts';
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
		"startTime": "19:00",
		"endTime": "12:00"
	},
	{
		"date": "2025-02-19",
		"startTime": "15:00",
		"endTime": "16:00"
	},
];

const getDateAndTimeOptions = (doctorId: string) => {
	type OptionsReturnType = { label: string, value: string }[];
	
	return henna
		.filter((doctor) => doctor.id === doctorId ||!doctor.id)
		.reduce<[OptionsReturnType, OptionsReturnType]>(
	    ([dateArr, timeArr], { date, startTime }) => {
	      dateArr.push({ label: date, value: date });
	      timeArr.push({ label: `${startTime}`, value: `${startTime}` });
	      return [dateArr, timeArr];
	    },
	    [[], []]
	  );
}

export default function BookAppointment() {
	const {
		register, handleSubmit, formState: { errors }, control, watch
	} = useForm<AppointmentType>({
		resolver: zodResolver(AppointmentSchema),
		reValidateMode: 'onBlur'
	});
	
	const [doctorId, appointmentDate] = watch(['doctorId', 'date']);
	const [dateOptions, timeOptions] = getDateAndTimeOptions(doctorId);
	console.log(dateOptions)
	
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
						options={[...new Set(dateOptions)]}
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
						options={timeOptions}
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
						// onClick={handleSave}
						className={'mt-5 w-full'}
					>
						Book Appointment
					</Button>
				</Card.Footer>
			</Card>
		</form>
	);
}
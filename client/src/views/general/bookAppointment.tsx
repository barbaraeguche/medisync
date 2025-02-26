import { useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentSchema, AppointmentType } from '@/schemas/appointmentSchema';
import { useAppSelector } from '@/hooks/useAppDispatch.ts';
import {
	formatDate, generateLabelValue, generateTimeSlots
} from '@/utils/utils';
import { yyyy_MM_dd } from '@/utils/constants';
import { appointmentTypeOptions } from '@/utils/constants';
import InputWrapper from '@/components/inputWrapper';
import { Button, Card, Select } from '@/ui/index';

export default function BookAppointment() {
	const doctors = useAppSelector((state) => state.doctorSlice.doctors);
	const doctorOptions = useMemo(() => {
		return doctors.map(({ _id, user: { firstName, lastName }}) =>
			generateLabelValue(_id, `Dr. ${firstName} ${lastName}`));
	}, [doctors]);
	
	const {
		register, handleSubmit, formState: { errors }, control, watch, resetField
	} = useForm<AppointmentType>({
		resolver: zodResolver(AppointmentSchema),
		reValidateMode: 'onBlur'
	});
	
	const [doctorId, appointmentDate] = watch(['doctorId', 'date']);
	
	useEffect(() => {
		if (doctorId) {
			resetField('date');
			resetField('time');
		}
	}, [doctorId, resetField]);
	useEffect(() => {
		if (appointmentDate) {
			resetField('time');
		}
	}, [appointmentDate, resetField]);
	
	// TODO: check if the appointment date isn't already booked
	
	// filter appointments by doctorId (or include those without a specified doctor)
	const getDoctorDetails = useMemo(() => {
		return doctors.filter(({ _id }) => doctorId === _id)[0];
	}, [doctors, doctorId]);
	
	// find all dates available dates for the chosen doctor
	const getDateOptions = useMemo(() => {
		if (!getDoctorDetails || !getDoctorDetails.availabilities?.length) return [];
		const dateSet = new Set<string>();

		return getDoctorDetails.availabilities
			.filter(({ date }) => {
				const formattedDate = formatDate(date, yyyy_MM_dd);

				if (dateSet.has(formattedDate)) return false;
				dateSet.add(formattedDate);
				return true;
			})
			.map(({ date }) =>
				generateLabelValue(formatDate(date, yyyy_MM_dd), formatDate(date)));
	}, [getDoctorDetails]);

	// find all time slots for the selected doctor & date
	const getTimeOptions = useMemo(() => {
		if (!getDoctorDetails || !getDoctorDetails.availabilities?.length) return [];
		const timeSet = new Set<string>();

		const uniqueSlots =  getDoctorDetails.availabilities
			.filter(({ date }) =>
				formatDate(date, yyyy_MM_dd) === appointmentDate)
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
							placeholder: 'Select a doctor'
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
							placeholder: 'Select a date'
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
							placeholder: 'Select a time'
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
						options={appointmentTypeOptions}
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
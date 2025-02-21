import { useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentSchema, AppointmentType } from '@/schemas/appointment-schema';
import {
	formatDate, generateLabelValue, generateTimeSlots
} from '@/utils/utils.ts';
import { appointmentType } from '@/utils/constants';
import InputWrapper from '@/components/input-wrapper';
import { Button, Card, Select } from '@/ui/index';

export default function BookAppointment() {
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
	
	// TODO: remove !id in production, also check if the appointment date isn't already booked
	// filter appointments by doctorId (or include those without a specified doctor)
	// const getDoctorDetails = useMemo(() => {
	// 	return henna.filter(({ id }) => id === doctorId || !id);
	// }, [doctorId]);
	//
	// // find all dates available dates for the chosen doctor
	// const getDateOptions = useMemo(() => {
	// 	const dateSet = new Set<string>();
	//
	// 	return getDoctorDetails
	// 		.filter(({ date }) => {
	// 			if (dateSet.has(date)) return false;
	// 			dateSet.add(date);
	// 			return true;
	// 		})
	// 		.map(({ date }) =>
	// 			generateLabelValue(date, formatDate(date)));
	// }, [getDoctorDetails]);
	//
	// const getTimeOptions = useMemo(() => {
	// 	// find all time slots for the selected doctor & date
	// 	const timeSet = new Set<string>();
	//
	// 	const uniqueSlots =  getDoctorDetails
	// 		.filter(({ date }) => date === appointmentDate)
	// 		.filter(({ startTime }) => {
	// 			if (timeSet.has(startTime)) return false;
	// 			timeSet.add(startTime);
	// 			return true;
	// 		});
	//
	// 	// generate the differences
	// 	return uniqueSlots.flatMap(({ startTime, endTime }) =>
	// 		generateTimeSlots(endTime, startTime));
	// }, [getDoctorDetails, appointmentDate]);
	
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
					{/*<Select*/}
					{/*	conf={{*/}
					{/*		label: 'Preferred Doctor',*/}
					{/*		placeholder: 'Choose a doctor'*/}
					{/*	}}*/}
					{/*	name={'doctorId'}*/}
					{/*	control={control}*/}
					{/*	options={doctorOptions}*/}
					{/*	error={errors.doctorId}*/}
					{/*/>*/}
					
					{/* date */}
					{/*<Select*/}
					{/*	disabled={!doctorId}*/}
					{/*	conf={{*/}
					{/*		label: 'Preferred Date',*/}
					{/*		placeholder: 'Choose a date'*/}
					{/*	}}*/}
					{/*	name={'date'}*/}
					{/*	control={control}*/}
					{/*	options={getDateOptions}*/}
					{/*	error={errors.date}*/}
					{/*/>*/}
					
					{/* time */}
					{/*<Select*/}
					{/*	disabled={!appointmentDate}*/}
					{/*	conf={{*/}
					{/*		label: 'Preferred Time',*/}
					{/*		placeholder: 'Choose a time'*/}
					{/*	}}*/}
					{/*	name={'time'}*/}
					{/*	control={control}*/}
					{/*	options={getTimeOptions}*/}
					{/*	error={errors.time}*/}
					{/*/>*/}
					
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
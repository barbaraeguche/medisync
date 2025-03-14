import { useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { isBefore } from 'date-fns';
import clsx from 'clsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentSchema, AppointmentType } from '@/schemas/appointmentSchema';
import { fetchDoctors } from '@/redux/thunks/doctorThunk';
import { createAppointment, saveAppointment } from '@/redux/thunks/patientThunk';
import { resetStatus } from '@/redux/slices/patientSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch.ts';
import {
	formatDate, generateLabelValue, generateTimeSlots
} from '@/utils/utils';
import {
	appointmentStatusOptions, appointmentTypeOptions, EEEE_MMM_dd_yyyy
} from '@/utils/constants';
import InputWrapper from '@/components/inputWrapper';
import { Button, Card, Select } from '@/ui';

interface AppointmentFormProps {
	mode: 'book' | 'edit';
	appointmentId?: number;
	appointmentData?: AppointmentType;
	isCancelable?: boolean;
	onCancel?: () => void;
}

export default function AppointmentsForm(
	{ mode, appointmentId, appointmentData, isCancelable, onCancel }: AppointmentFormProps
) {
	const dispatch = useAppDispatch();
	const { doctors } = useAppSelector((state) => state.doctorSlice);
	const { patient } = useAppSelector((state) => state.patientSlice);
	
	useEffect(() => {
		dispatch(fetchDoctors());
	}, [dispatch]);
	
	const {
		register, handleSubmit, formState: { errors }, control, watch, resetField, reset
	} = useForm<AppointmentType>({
		resolver: zodResolver(appointmentSchema),
		reValidateMode: 'onBlur',
		values: appointmentData ?? undefined
	})
	
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
	
	const doctorOptions = useMemo(() => {
		return doctors.map(({ _id, user: { firstName, lastName }}) =>
			generateLabelValue(_id, `Dr. ${firstName} ${lastName}`));
	}, [doctors]);
	
	// filter appointments by doctorId (or include those without a specified doctor)
	const getDoctorDetails = useMemo(() => {
		return doctors.find(({ _id }) => doctorId === _id);
	}, [doctors, doctorId]);
	
	// find all dates available dates for the chosen doctor
	const getDateOptions = useMemo(() => {
		if (!getDoctorDetails || !getDoctorDetails.availabilities?.length) return [];
		const dateSet = new Set<string>();
		
		// create a date that's 2 days from now (if today is 13th, the earliest appointment is 15th)
		const minAllowedDate = new Date();
		minAllowedDate.setDate(minAllowedDate.getDate() + 1);
		minAllowedDate.setHours(0, 0, 0, 0); // reset to start of day
		
		return getDoctorDetails.availabilities
			.filter(({ date }) => {
				const formattedDate = formatDate(date);
				
				/*
				*	skip if:
				* 1. date is already in our filtered set
				* 2. date is before the minimum allowed date (2 days from now)
				*/
				const isToSkip =
					dateSet.has(formattedDate) ||
					isBefore(date, minAllowedDate);
				
				if (isToSkip) return false;
				dateSet.add(formattedDate);
				return true;
			})
			.map(({ date }) =>
				generateLabelValue(formatDate(date), formatDate(date, EEEE_MMM_dd_yyyy)));
	}, [getDoctorDetails]);
	
	// find all time slots for the selected doctor & date
	const getTimeOptions = useMemo(() => {
		if (!getDoctorDetails || !getDoctorDetails.availabilities?.length) return [];
		
		// find the availability entries for the selected date
		const dateAvailabilities = getDoctorDetails.availabilities
			.filter(({ date }) => formatDate(date) === appointmentDate);
		
		if (dateAvailabilities.length === 0) return [];
		
		// get all time slots from the availabilities
		const allTimeSlots = dateAvailabilities.flatMap(({ startTime, endTime }) =>
			generateTimeSlots(endTime, startTime));
		
		// remove duplicate time slots (in cases where multiple availabilities have overlapping times)
		const uniqueTimeSlots = Array.from(
			new Map(allTimeSlots.map(slot => [slot.value, slot])).values()
		);
		
		// find all booked times for this doctor on this date
		const bookedTimes = getDoctorDetails.appointments
			?.filter(apt => formatDate(apt.date) === appointmentDate)
			.map(apt => apt.time) || [];
		
		// filter out already booked times
		return uniqueTimeSlots.filter(slot => !bookedTimes.includes(slot.value));
	}, [getDoctorDetails, appointmentDate]);
	
	const onSubmit: SubmitHandler<AppointmentType> = (data) => {
		if (mode === 'book') {
			// when booking, we don't include the status field
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { status, ...bookingData } = data;
			
			dispatch(createAppointment({
				id: patient._id,
				appointmentInfo: {
					...bookingData,
					patientId: patient._id
				}
			}));
		} else {
			dispatch(saveAppointment({
				id: patient._id,
				appointmentInfo: {
					...data,
					_id: appointmentId!,
					patientId: patient._id
				}
			}));
		}
		
		reset(); // reset the form after submission
		dispatch(resetStatus());
	};
	
	return (
		<div className={'flex items-center justify-center min-h-screen'}>
			<form
				className={'w-full'}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Card className={'container max-w-[700px]'}>
					<Card.Header
						title={mode === 'book' ? 'Book an Appointment' : 'Edit Appointment'}
						description={mode === 'book'
							? 'Select a doctor, date, and time for your appointment'
							: 'Update your appointment details'
						}
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
						
						{/* status - only show in edit mode */}
						{mode === 'edit' && (
							<Select
								conf={{
									label: 'Appointment Status',
									placeholder: 'Choose a status'
								}}
								name={'status'}
								control={control}
								options={appointmentStatusOptions}
								error={errors.status}
							/>
						)}
						
						{/* note to doctor */}
						<InputWrapper
							{...register('noteToDoctor')}
							conf={{
								label: 'Additional Notes (Optional)',
								placeholder: 'Anything you want your doctor to know?'
							}}
							name={'notes'}
							error={errors.noteToDoctor}
						/>
					</Card.Content>
					
					<Card.Footer>
						<div className={'flex flex-col gap-2 sm:flex-row sm:justify-end'}>
							<Button
								type={'submit'}
								className={clsx(
									'mt-5 w-full',
									{ 'w-fit': isCancelable }
								)}
							>
								{mode === 'book' ? 'Book Appointment' : 'Update Appointment'}
							</Button>
						</div>
						{isCancelable && onCancel && (
							<Button
								variant={'outline'}
								onClick={() => {
									reset();
									onCancel();
								}}
							>
								Cancel Changes
							</Button>
						)}
					</Card.Footer>
				</Card>
			</form>
		</div>
	);
}
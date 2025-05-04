import { useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isBefore } from 'date-fns';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch.ts';
import { fetchDoctors } from '@/redux/thunks/doctor-thunk';
import { createAppointment, saveAppointment } from '@/redux/thunks/patient-thunk';
import { resetStatus } from '@/redux/slices/patient-slice';
import { appointmentSchema, AppointmentType } from '@/schemas/appointment-schema';
import { formatDate, generateLabelValue, generateTimeSlots } from '@/utils/utils';
import {
	appointmentStatusOptions, appointmentTypeOptions, EEEE_MMM_dd_yyyy
} from '@/utils/constants';
import InputWrapper from '@/components/input-wrapper';
import Spinner from '@/components/spinner';
import { Button, Card, Select } from '@/components/ui';

interface AppointmentFormProps {
	id?: number;
	data?: AppointmentType;
	mode: 'book' | 'edit';
	onCancel?: () => void;
}

export default function AppointmentsForm(
	{ id, data, mode, onCancel }: AppointmentFormProps
) {
	const isBooking = mode === 'book';

	const dispatch = useAppDispatch();
	const { doctors } = useAppSelector((state) => state.doctorSlice);
	const { patient } = useAppSelector((state) => state.patientSlice);
	
	useEffect(() => {
		dispatch(fetchDoctors());
	}, [dispatch]);

	const {
		register, handleSubmit, formState: { errors, isSubmitting }, control, watch, resetField, reset
	} = useForm<AppointmentType>({
		resolver: zodResolver(appointmentSchema),
		reValidateMode: 'onBlur',
		values: data
	})
	
	const [doctorId, apptDate] = watch(['doctorId', 'date']);

	useEffect(() => {
		if (doctorId) resetField('date');
	}, [doctorId, resetField]);
	useEffect(() => {
		if (apptDate) resetField('time');
	}, [apptDate, resetField]);

	const doctorOptions = useMemo(() => {
		return doctors.map(({ _id, user: { firstName, lastName } }) =>
			generateLabelValue(_id, `Dr. ${firstName} ${lastName}`));
	}, [doctors]);

	// filter appointments by doctorId (or include those without a specified doctor)
	const getDoctor = useMemo(() => {
		return doctors.find(({ _id }) => doctorId === _id);
	}, [doctors, doctorId]);

	// find all dates available dates for the chosen doctor
	const dateOptions = useMemo(() => {
		if (!getDoctor || !getDoctor.availabilities?.length) return [];

		// create a date that's 2 days from now (if today is 13th, the earliest appointment is 15th)
		const minDate = new Date();
		minDate.setDate(minDate.getDate() + 1);
		minDate.setHours(0, 0, 0, 0); // reset to start of day

		// skip if: date is before the minimum allowed date (2 days from now)
		const uniqueDates = Array.from(
			new Set(
				getDoctor.availabilities
					.map(({ date }) => formatDate(date))
					.filter((date) => !isBefore(date, minDate))
			)
		);

		return uniqueDates.map((date) => generateLabelValue(
			formatDate(date), formatDate(date, EEEE_MMM_dd_yyyy)
		));
	}, [getDoctor]);

	// find all time slots for the selected doctor and date
	const timeOptions = useMemo(() => {
		if (!getDoctor || !getDoctor.availabilities?.length) return [];

		// find the availability entries for the selected date
		const dateAvailabilities = getDoctor.availabilities
			.filter(({ date }) => formatDate(date) === apptDate);

		if (dateAvailabilities.length === 0) return [];

		// get all time slots from the availabilities
		const allTimeSlots = dateAvailabilities.flatMap(({ startTime, endTime }) =>
			generateTimeSlots(endTime, startTime));

		// remove duplicate time slots (in cases where multiple availabilities have overlapping times)
		const uniqueTimeSlots = Array.from(
			new Map(allTimeSlots.map((slot) => [slot.value, slot])).values()
		);

		// find all booked times for this doctor on this date
		const bookedTimes = getDoctor.appointments
			?.filter((apt) => formatDate(apt.date) === apptDate)
			.map((apt) => apt.time) || [];

		// filter out already booked times
		return uniqueTimeSlots.filter((slot) => !bookedTimes.includes(slot.value));
	}, [getDoctor, apptDate]);

	const onSubmit: SubmitHandler<AppointmentType> = async (data) => {
		if (isBooking) {
			// when booking, we don't include the status field
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { status, ...rest } = data;

			await dispatch(createAppointment({
				id: patient._id,
				appointmentInfo: {
					...rest,
					patientId: patient._id
				}
			}));
			
			// reset the form after submission
			reset();
		} else {
			await dispatch(saveAppointment({
				id: patient._id,
				appointmentInfo: {
					...data,
					_id: id!,
					patientId: patient._id
				}
			}));
			if (onCancel) onCancel();
		}
		
		// re-fetch the doctor's list and clear status
		await dispatch(fetchDoctors());
		dispatch(resetStatus());
	};

	return (
			<form
				className={clsx(
					'', {
						'flex items-center justify-center px-2 py-10': isBooking
					}
				)}
				onSubmit={handleSubmit(onSubmit)}
				aria-label={'Appointment Booking Form'}
		>
			<Card className={clsx(
				'max-w-[700px]', {
					'container': isBooking
				}
			)}>
				<Card.Header
					title={isBooking ? 'Book an Appointment' : 'Edit Appointment'}
					description={isBooking
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
						options={dateOptions}
						error={errors.date}
					/>

					{/* time */}
					<Select
						disabled={!apptDate}
						conf={{
							label: 'Preferred Time',
							placeholder: 'Select a time'
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
						options={appointmentTypeOptions}
						error={errors.type}
					/>

					{/* status - only show in edit mode */}
					{!isBooking && (
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
				
				<Card.Footer className={'flex flex-col gap-2 sm:flex-row sm:justify-end mt-5'}>
					<Button
						type={'submit'}
						disabled={isSubmitting}
						className={isBooking ? 'w-full' : ''}
					>
						{isSubmitting && <Spinner/>}
						{isBooking ? 'Book Appointment' : 'Save Appointment'}
					</Button>
					{!isBooking && onCancel && (
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
	);
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterType } from '@/schemas/auth-schema';
import { DoctorType } from '@/schemas/doctor-schema';
import { PatientType } from '@/schemas/patient-schema';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { registerUser } from '@/redux/thunks/auth-thunk';
import { resetStatus } from '@/redux/slices/user-slice';
import {
	genderOptions, roleOptions, bloodTypeOptions
} from '@/utils/constants';
import InputWrapper from '@/components/input-wrapper';
import { ServerError } from '@/components/errors/error-messages';
import { Button, Card, Select } from '@/components/ui';
import { Entity } from '@/lib/types';

export default function RegisterForm() {
	const [steps, setSteps] = useState(1);
	
	const dispatch = useAppDispatch();
	const { error } = useAppSelector((state) => state.userSlice);
	
	useEffect(() => {
		// clear sign in error if exist
		dispatch(resetStatus());
	}, [dispatch]);
	
	const {
		register, handleSubmit, formState: { errors }, control, watch, trigger
	} = useForm<RegisterType>({
		resolver: zodResolver(registerSchema),
		reValidateMode: 'onBlur'
	});
	const userRole = watch('role');
	
	const prevStep = () => setSteps((prev) => Math.max(1, prev - 1));
	// validate before proceeding to the next step
	const nextStep = async (isContinue: boolean) => {
		const isValid = await trigger('user');
		if (isValid) {
			if (!isContinue) return;
			
			dispatch(resetStatus()); // clear status if the role is no longer `Admin`
			setSteps((next) => Math.max(2, next + 1));
		}
	};
	
	const onSubmit: SubmitHandler<RegisterType> = (data) => {
		const { role, user, ...rest } = data;
		
		const updatedUser = {
			...user, role
		};
		const updatedData =
			role === 'Admin'
				? updatedUser
				: role === 'Doctor'
					? { user: updatedUser, practitioner: { ...rest } }
					: { user: updatedUser, ...rest };
		
		dispatch(registerUser(updatedData as Entity));
		dispatch(resetStatus());
	};
	
	// type guards for validation errors
	const isDoctorErrors = (
		errors: FieldErrors<RegisterType>
	): errors is FieldErrors<DoctorType> => {
		return (errors as DoctorType) !== undefined;
	};
	const isPatientErrors = (
		errors: FieldErrors<RegisterType>
	): errors is FieldErrors<PatientType> => {
		return (errors as PatientType) !== undefined;
	};
	
	return (
		<Card>
			<Card.Header
				title={'Create an account'}
				description={steps === 1 ? 'Enter your basic information, and select a role' : 'Complete your profile'}
			/>
			
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card.Content>
					{/* user information */}
					{steps === 1 && (
						<>
							{/* first name */}
							<InputWrapper
								{...register('user.firstName')}
								conf={{
									label: 'First Name',
									placeholder: 'Jane'
								}}
								error={errors.user?.firstName}
							/>
							
							{/* last name */}
							<InputWrapper
								{...register('user.lastName')}
								conf={{
									label: 'Last Name',
									placeholder: 'Doe'
								}}
								error={errors.user?.lastName}
							/>
							
							{/* email */}
							<InputWrapper
								{...register('user.email')}
								conf={{
									label: 'Email',
									placeholder: 'jane.doe@example.com'
								}}
								error={errors.user?.email}
							/>
							
							{/* password */}
							<InputWrapper
								{...register('user.password')}
								type={'password'}
								conf={{
									label: 'Password',
									subscriptNum: '2',
									placeholder: '******'
								}}
								error={errors.user?.password}
							/>
							
							{/* gender */}
							<Select
								conf={{
									label: 'Gender',
									subscriptNum: '1',
									placeholder: 'Select your gender'
								}}
								name={'user.gender'}
								control={control}
								options={genderOptions}
								error={errors.user?.gender}
							/>
							
							{/* role */}
							<Select
								conf={{
									label: 'Role',
									subscriptNum: '1',
									placeholder: 'Select your role'
								}}
								name={'role'}
								control={control}
								options={roleOptions}
								error={errors.role}
							/>
							
							{userRole === 'Admin' ? (
								<Button
									type={'submit'}
									className={'mt-2 w-full'}
									disabled={userRole === undefined}
									onClick={() => nextStep(false)}
								>
									Create Account
								</Button>
							) : (
								<Button
									className={'mt-2 w-full'}
									disabled={userRole === undefined}
									onClick={() => nextStep(true)}
								>
									Next Step
								</Button>
							)}
						</>
					)}
					
					{/* doctor information */}
					{(steps === 2 && userRole === 'Doctor') && (
						<>
							{/* license number */}
							<InputWrapper
								{...register('licenseNumber')}
								conf={{
									label: 'License Number',
									placeholder: 'LX-8745-2931'
								}}
								name={'licenseNumber'}
								error={isDoctorErrors(errors) ? errors.licenseNumber : undefined}
							/>
							
							{/* specialization */}
							<InputWrapper
								{...register('specialization')}
								conf={{
									label: 'Specialization',
									placeholder: 'Cardiology, General Medicine'
								}}
								name={'specialization'}
								error={isDoctorErrors(errors) ? errors.specialization : undefined}
							/>
							
							{/* years of experience */}
							<InputWrapper
								{...register('yearsOfExperience')}
								type={'number'}
								conf={{
									label: 'Years of Experience (Optional)',
									placeholder: '5'
								}}
								name={'yearsOfExperience'}
								error={isDoctorErrors(errors) ? errors.yearsOfExperience : undefined}
							/>
							
							{/* languages */}
							<InputWrapper
								{...register('languages')}
								conf={{
									label: 'Languages',
									placeholder: 'English, French'
								}}
								name={'languages'}
								error={isDoctorErrors(errors) ? errors.languages : undefined}
							/>
							
							{/* navigation buttons */}
							<PrevConfirmButtons prevClick={prevStep}/>
						</>
					)}
					
					{/* patient information */}
					{(steps === 2 && userRole === 'Patient') && (
						<>
							{/* date of birth */}
							<InputWrapper
								{...register('dateOfBirth')}
								conf={{
									label: 'Date of Birth',
									placeholder: '1900-01-01'
								}}
								name={'dateOfBirth'}
								error={isPatientErrors(errors) ? errors.dateOfBirth : undefined}
							/>
							
							{/* allergies */}
							<InputWrapper
								{...register('allergies')}
								conf={{
									label: 'Allergies (Optional)',
									placeholder: 'Peanuts, Milk'
								}}
								name={'allergies'}
								error={isPatientErrors(errors) ? errors.allergies : undefined}
							/>
							
							{/* blood type */}
							<Select
								conf={{
									subscriptNum: '1',
									label: 'Blood Type',
									placeholder: 'Select your blood type'
								}}
								name={'bloodType'}
								control={control}
								options={bloodTypeOptions}
								error={isPatientErrors(errors) ? errors.bloodType : undefined}
							/>
							
							{/* chronic conditions */}
							<InputWrapper
								{...register('chronicConditions')}
								conf={{
									label: 'Chronic Conditions (Optional)',
									placeholder: 'Diabetes, Asthma'
								}}
								name={'chronicConditions'}
								error={isPatientErrors(errors) ? errors.chronicConditions : undefined}
							/>
							
							{/* navigation buttons */}
							<PrevConfirmButtons prevClick={prevStep}/>
						</>
					)}
					
					{/* error */}
					<ServerError message={error}/>
				</Card.Content>
			</form>
			
			<Card.Footer className={'space-y-7 text-muted-foreground'}>
				<div className={'text-xs flex flex-col space-y-2'}>
					<span className={'underline underline-offset-2'}>Note:</span>
					<sup>1</sup> Field cannot be changed after registration.
					<sup>2</sup> Special characters include `@`, `$`, `!`, `%`, `*`, `?`, and `&`
				</div>
				<div className={'text-sm text-center'}>
					Have an account? {' '}
					<Link
						to={'/auth/signin'}
						aria-label={'Sign in to account'}
						className={'text-primary underline-offset-4 hover:underline cursor-pointer'}
					>
						Sign in
					</Link>
				</div>
			</Card.Footer>
		</Card>
	);
}

function PrevConfirmButtons({ prevClick }: {
	prevClick: () => void
}) {
	return (
		<div className={'flex justify-between'}>
			<Button
				onClick={prevClick}
				className={'mt-2 w-1/3'}
			>
				Previous Step
			</Button>
			<Button
				type={'submit'}
				className={'mt-2 w-1/3'}
			>
				Create Account
			</Button>
		</div>
	);
}
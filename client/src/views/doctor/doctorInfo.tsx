import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	DoctorSchema, EducationSchema, DoctorType, EducationType
} from '@/schemas/doctorSchema';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { useEditableState } from '@/hooks/useEditableState';
import { Doctor } from '@/lib/definitions';
import InputWrapper from '@/components/inputWrapper';
import FormActionButtons from '@/components/formActionButtons';
import { Card } from '@/ui/index';

export default function DoctorInfo() {
	const doctor = useAppSelector((state) => state.doctorSlice.doctor);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<RoleInfo doctor={doctor}/>
			<Education doctor={doctor}/>
		</div>
	);
}

function RoleInfo({ doctor }: {
	doctor: Doctor
}) {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<DoctorType>({
		resolver: zodResolver(DoctorSchema),
		reValidateMode: 'onBlur',
		values: doctor.practitioner
	});

	const onSubmit: SubmitHandler<DoctorType> = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Role Information'}/>
				
				<Card.Content>
					{/* license number */}
					<InputWrapper
						{...register('licenseNumber')}
						readOnly={!isEditing}
						conf={{
							label: 'License Number',
							placeholder: 'LX-8745-2931'
						}}
						name={'licenseNumber'}
						error={errors.licenseNumber}
					/>
	
					{/* specialization */}
					<InputWrapper
						{...register('specialization')}
						readOnly={!isEditing}
						conf={{
							label: 'Specialization',
							placeholder: 'Cardiology, General Medicine'
						}}
						name={'specialization'}
						error={errors.specialization}
					/>
	
					{/* years of experience */}
					<InputWrapper
						{...register('yearsOfExperience')}
						readOnly={!isEditing}
						type={'number'}
						conf={{
							label: 'Years of Experience (Optional)',
							placeholder: '5'
						}}
						name={'yearsOfExperience'}
						error={errors.yearsOfExperience}
					/>
	
					{/* languages */}
					<InputWrapper
						{...register('languages')}
						readOnly={!isEditing}
						conf={{
							label: 'Languages',
							placeholder: 'English, French'
						}}
						name={'languages'}
						error={errors.languages}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}

function Education({ doctor }: {
	doctor: Doctor
}) {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<EducationType>({
		resolver: zodResolver(EducationSchema),
		reValidateMode: 'onBlur',
		values: doctor.practitioner.education
	});

	const onSubmit: SubmitHandler<EducationType> = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Education'}/>
				
				<Card.Content>
					{/* degree */}
					<InputWrapper
						{...register('degree')}
						readOnly={!isEditing}
						conf={{
							label: 'Degree',
							placeholder: 'Doctor of Medicine (MD)'
						}}
						name={'degree'}
						error={errors.degree}
					/>
	
					{/*/!* institution *!/*/}
					<InputWrapper
						{...register('institution')}
						readOnly={!isEditing}
						conf={{
							label: 'Institution',
							placeholder: 'Harvard Medical School'
						}}
						name={'institution'}
						error={errors.institution}
					/>
	
					{/*/!* graduationYear *!/*/}
					<InputWrapper
						{...register('graduationYear')}
						readOnly={!isEditing}
						conf={{
							label: 'Graduation Year (Optional)',
							placeholder: '1990'
						}}
						name={'graduationYear'}
						error={errors.graduationYear}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	DoctorSchema, EducationSchema, DoctorType, EducationType
} from '@/schemas/doctorSchema';
import InputWrapper from '@/components/inputWrapper';
import FormButtons from '@/components/formButtons';
import { Card } from '@/ui/index';

export default function DoctorInfo() {
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<RoleInfo/>
			<Education/>
		</div>
	);
}

function RoleInfo() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<DoctorType>({
		resolver: zodResolver(DoctorSchema),
		reValidateMode: 'onBlur'
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
						conf={{
							label: 'Languages',
							placeholder: 'English, French'
						}}
						name={'languages'}
						error={errors.languages}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormButtons/>
				</Card.Footer>
			</Card>
		</form>
	);
}

function Education() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<EducationType>({
		resolver: zodResolver(EducationSchema),
		reValidateMode: 'onBlur'
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
						conf={{
							label: 'Graduation Year (Optional)',
							placeholder: '1990'
						}}
						name={'graduationYear'}
						error={errors.graduationYear}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormButtons/>
				</Card.Footer>
			</Card>
		</form>
	);
}
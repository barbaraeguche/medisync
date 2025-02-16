import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	DoctorSchema, EducationSchema, DoctorType, EducationType
} from '@/schemas/doctor-schema';
import FormLayout from '@/layouts/cards';
import InputWrapper from '@/components/input-wrapper';
import FormButtons from '@/components/form-buttons';
import FormHeader from '@/components/card-header';

export default function DoctorInfo() {
	return (
		<div className={'space-y-12 md:space-y-24'}>
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
			<FormLayout>
				<FormHeader title={'Role Information'}/>
				
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
						label: 'Years of Experience',
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
				
				<FormButtons/>
			</FormLayout>
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
			<FormLayout>
				<FormHeader title={'Education'}/>
				
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
						label: 'Graduation Year',
						placeholder: '1990'
					}}
					name={'graduationYear'}
					error={errors.graduationYear}
				/>
				
				<FormButtons/>
			</FormLayout>
		</form>
	);
}
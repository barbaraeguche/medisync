import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	BasicPatientSchema, PatientType, HealthMetricsSchema, HealthMetricsType
} from '@/schemas/patient-schema';
import InputWrapper from '@/components/input-wrapper';
import FormButtons from '@/components/form-buttons';
import { Card } from '@/ui/index';

export default function PatientInfo() {
	return (
		<div className={'space-y-12 md:space-y-24'}>
			<RoleInfo/>
			<HealthMetrics/>
		</div>
	);
}

function RoleInfo() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<PatientType>({
		resolver: zodResolver(BasicPatientSchema),
		reValidateMode: 'onBlur'
	});

	const onSubmit: SubmitHandler<PatientType> = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Role Information'}/>

				<Card.Content>
					{/* date of birth */}
					<InputWrapper
						{...register('dateOfBirth')}
						conf={{
							label: 'Date of Birth',
							placeholder: '1900-01-01'
						}}
						name={'dateOfBirth'}
						error={errors.dateOfBirth}
					/>
	
					{/* allergies */}
					<InputWrapper
						{...register('allergies')}
						conf={{
							label: 'Allergies',
							placeholder: 'Peanuts, Milk'
						}}
						name={'allergies'}
						error={errors.allergies}
					/>
	
					{/* blood type */}
					<InputWrapper
						disabled
						conf={{
							label: 'Blood Type',
							placeholder: 'AB+'
						}}
						name={'bloodType'}
					/>
	
					{/* insurance provider */}
					<InputWrapper
						{...register('insuranceProvider')}
						conf={{
							label: 'Insurance Provider',
							placeholder: 'Sentinel Assurance Inc.'
						}}
						name={'insuranceProvider'}
						error={errors.insuranceProvider}
					/>
	
					{/* insurance policy number */}
					<InputWrapper
						{...register('insurancePolicyNumber')}
						conf={{
							label: 'Insurance Policy Number',
							placeholder: 'SA-9876543210'
						}}
						name={'insurancePolicyNumber'}
						error={errors.insurancePolicyNumber}
					/>
	
					{/* chronic conditions */}
					<InputWrapper
						{...register('chronicConditions')}
						conf={{
							label: 'Chronic Conditions',
							placeholder: 'Diabetes, Asthma'
						}}
						name={'chronicConditions'}
						error={errors.chronicConditions}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormButtons/>
				</Card.Footer>
			</Card>
		</form>
	);
}

function HealthMetrics() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<HealthMetricsType>({
		resolver: zodResolver(HealthMetricsSchema),
		reValidateMode: 'onBlur'
	});

	const onSubmit: SubmitHandler<HealthMetricsType> = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Health Metrics'}/>
				
				<Card.Content>
					{/* height */}
					<InputWrapper
						{...register('height')}
						type={'number'}
						conf={{
							label: 'Height (cm)',
							placeholder: '175'
						}}
						name={'height'}
						error={errors.height}
					/>
	
					{/* weight */}
					<InputWrapper
						type={'number'}
						{...register('weight')}
						conf={{
							label: 'Weight (kg)',
							placeholder: '75'
						}}
						name={'weight'}
						error={errors.weight}
					/>
	
					{/* heart rate */}
					<InputWrapper
						type={'number'}
						{...register('heartRate')}
						conf={{
							label: 'Heart Rate (bpm)',
							placeholder: '75'
						}}
						name={'heartRate'}
						error={errors.heartRate}
					/>
				</Card.Content>
			
				<Card.Footer>
					<FormButtons/>
				</Card.Footer>
			</Card>
		</form>
	);
}
import {
	noBloodTypeSchema, NoBloodType, healthMetricsSchema, HealthMetricsType
} from '@/schemas/patientSchema';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { savePatient } from '@/redux/thunks/patientThunk';
import { resetStatus } from '@/redux/slices/patientSlice';
import { showToast } from '@/utils/toast';
import { Patient } from '@/lib/definitions';
import { FieldConfig, ThunkError, ThunkStatus } from '@/lib/types';
import GenericForm from '@/components/genericForm';

export default function PatientInfo() {
	const { error, patient, status } = useAppSelector((state) => state.patientSlice);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<RoleInfo patient={patient} error={error} status={status}/>
			<HealthMetrics patient={patient} error={error} status={status}/>
		</div>
	);
}

function RoleInfo({ patient, error, status }: {
	patient: Patient,
	error: ThunkError,
	status: ThunkStatus
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: NoBloodType) => {
		dispatch(savePatient(data));
		showToast(error, status);
		dispatch(resetStatus());
	};
	
	const roleFields: FieldConfig[] = [
		{
			name: 'dateOfBirth',
			label: 'Date of Birth',
			placeholder: '1900-01-01'
		},
		{
			name: 'allergies',
			label: 'Allergies (Optional)',
			placeholder: 'Peanuts, Milk'
		},
		{
			name: 'bloodType',
			label: 'Blood Type',
			placeholder: 'AB+',
			disabled: true
		},
		{
			name: 'insuranceProvider',
			label: 'Insurance Provider (Optional)',
			placeholder: 'Sentinel Assurance Inc.'
		},
		{
			name: 'insurancePolicyNumber',
			label: 'Insurance Policy Number (Optional)',
			placeholder: 'SA-9876543210'
		},
		{
			name: 'chronicConditions',
			label: 'Chronic Conditions (Optional)',
			placeholder: 'Diabetes, Asthma'
		}
	];
	
	return (
		<GenericForm
			fields={roleFields}
			onSubmit={handleSubmit}
			initialValues={patient}
			title={'Role Information'}
			schema={noBloodTypeSchema}
			readOnlyFields={['bloodType']}
		/>
	);
}

function HealthMetrics({ patient, error, status }: {
	patient: Patient,
	error: ThunkError,
	status: ThunkStatus
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: HealthMetricsType) => {
		dispatch(savePatient({
			'healthMetrics': data
		}));
		showToast(error, status);
	};
	
	const metricsFields: FieldConfig[] = [
		{
			name: 'height',
			label: 'Height (cm)',
			placeholder: '175'
		},
		{
			name: 'weight',
			label: 'Weight (lbs)',
			placeholder: '75' // todo: find avg weight
		},
		{
			name: 'heartRate',
			label: 'Heart Rate (bpm)',
			placeholder: '75'
		}
	];
	
	return (
		<GenericForm
			fields={metricsFields}
			onSubmit={handleSubmit}
			title={'Health Metrics'}
			schema={healthMetricsSchema}
			initialValues={patient.healthMetrics}
		/>
	);
}
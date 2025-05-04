import {
	noBloodTypeSchema, NoBloodType, healthMetricsSchema, HealthMetricsType
} from '@/schemas/patient-schema';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { savePatient } from '@/redux/thunks/patient-thunk';
import { resetStatus } from '@/redux/slices/patient-slice';
import { Patient } from '@/lib/definitions';
import { FieldConfig } from '@/lib/types';
import EditableForm from '@/components/editable-form';

export default function PatientInfo() {
	const { patient } = useAppSelector((state) => state.patientSlice);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<RoleInfo patient={patient}/>
			<HealthMetrics patient={patient}/>
		</div>
	);
}

function RoleInfo({ patient }: {
	patient: Patient
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = async (data: NoBloodType) => {
		await dispatch(savePatient({
			id: patient._id,
      patientInfo: data
		}));
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
		<EditableForm
			fields={roleFields}
			onSubmit={handleSubmit}
			initialValues={patient}
			title={'Role Information'}
			schema={noBloodTypeSchema}
			readOnlyFields={['bloodType']}
		/>
	);
}

function HealthMetrics({ patient }: {
	patient: Patient
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = async (data: HealthMetricsType) => {
		await dispatch(savePatient({
			id: patient._id,
			patientInfo: { 'healthMetrics': data }
		}));
		dispatch(resetStatus());
	};
	
	const metricsFields: FieldConfig[] = [
		{
			type: 'number',
			name: 'height',
			label: 'Height (cm)',
			placeholder: '175'
		},
		{
			type: 'number',
			name: 'weight',
			label: 'Weight (lbs)',
			placeholder: '135'
		},
		{
			type: 'number',
			name: 'heartRate',
			label: 'Heart Rate (bpm)',
			placeholder: '75'
		}
	];
	
	return (
		<EditableForm
			fields={metricsFields}
			onSubmit={handleSubmit}
			title={'Health Metrics'}
			schema={healthMetricsSchema}
			initialValues={patient.healthMetrics}
		/>
	);
}
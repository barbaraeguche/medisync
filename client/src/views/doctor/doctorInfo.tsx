import {
	doctorSchema, educationSchema, DoctorType, EducationType
} from '@/schemas/doctorSchema';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { saveDoctor } from '@/redux/thunks/doctorThunk';
import { resetStatus } from '@/redux/slices/doctorSlice';
import { Doctor } from '@/lib/definitions';
import { FieldConfig } from '@/lib/types';
import GenericEditableForm from '@/components/genericEditableForm';

export default function DoctorInfo() {
	const { doctor } = useAppSelector((state) => state.doctorSlice);
	
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
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: DoctorType) => {
		dispatch(saveDoctor({
			id: doctor._id,
      practitioner: data
		}));
		dispatch(resetStatus());
	};
	
	const doctorFields: FieldConfig[] = [
		{
			name: 'licenseNumber',
			label: 'License Number',
			placeholder: 'LX-8745-2931'
		},
		{
			name: 'specialization',
			label: 'Specialization',
			placeholder: 'Cardiology, General Medicine'
		},
		{
			name: 'yearsOfExperience',
			label: 'Years of Experience (Optional)',
			placeholder: '5'
		},
		{
			name: 'languages',
			label: 'Languages',
			placeholder: 'English, French'
		}
	];
	
	return (
		<GenericEditableForm
			slice={'doctor'}
			schema={doctorSchema}
			fields={doctorFields}
			onSubmit={handleSubmit}
			title={'Role Information'}
			initialValues={doctor.practitioner}
		/>
	);
}

function Education({ doctor }: {
	doctor: Doctor
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: EducationType) => {
		dispatch(saveDoctor({
			id: doctor._id,
			practitioner: { 'education': data }
		}));
		dispatch(resetStatus());
	};
	
	const educationFields: FieldConfig[] = [
		{
			name: 'degree',
			label: 'Degree',
			placeholder: 'Doctor of Medicine (MD)'
		},
		{
			name: 'institution',
			label: 'Institution',
			placeholder: 'Harvard Medical School'
		},
		{
			name: 'graduationYear',
			label: 'Graduation Year (Optional)',
			placeholder: '1990'
		}
	];
	
	return (
		<GenericEditableForm
			slice={'doctor'}
			title={'Education'}
			onSubmit={handleSubmit}
			schema={educationSchema}
			fields={educationFields}
			initialValues={doctor.practitioner.education}
		/>
	);
}
import {
	doctorSchema, educationSchema, DoctorType, EducationType
} from '@/schemas/doctor-schema';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { saveDoctor } from '@/redux/thunks/doctor-thunk';
import { resetStatus } from '@/redux/slices/doctor-slice';
import { Doctor } from '@/lib/definitions';
import { FieldConfig } from '@/lib/types';
import EditableForm from '@/components/editable-form';

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
	
	const handleSubmit = async (data: DoctorType) => {
		await dispatch(saveDoctor({
			id: doctor._id,
			doctorInfo: data
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
			type: 'number',
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
		<EditableForm
			slice={'doctor'}
			fields={doctorFields}
			schema={doctorSchema}
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
	
	const handleSubmit = async (data: EducationType) => {
		await dispatch(saveDoctor({
			id: doctor._id,
			doctorInfo: { 'education': data }
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
		<EditableForm
			slice={'doctor'}
			title={'Education'}
			onSubmit={handleSubmit}
			fields={educationFields}
			schema={educationSchema}
			initialValues={doctor.practitioner.education}
		/>
	);
}
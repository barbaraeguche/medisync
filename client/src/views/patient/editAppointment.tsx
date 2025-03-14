import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { NotFound } from '@/views/auth/error';
import AppointmentsForm from '@/components/appointmentsForm';

export default function EditAppointment() {
	const { id } = useParams();
	const navigate = useNavigate();
	
	const { appointments } = useAppSelector((state) => state.patientSlice.patient);
	const appointmentToEdit = useMemo(() => {
		return appointments?.find((apt) => apt._id === Number(id));
	}, [appointments, id]);
	
	if (!appointmentToEdit) {
		return (<NotFound/>);
	}
	
	const handleCancel = () => {
		navigate('/patient/appointments');
	};
	
	return (
		<AppointmentsForm
			isCancelable
			mode={'edit'}
			onCancel={handleCancel}
			appointmentData={appointmentToEdit}
			appointmentId={appointmentToEdit._id}
		/>
	);
}
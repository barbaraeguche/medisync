import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteAppointment } from '@/redux/thunks/patient-thunk';
import { resetStatus } from '@/redux/slices/patient-slice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';

export const EditAppointment = ({ id }: {
	id: number
}) => {
	return (
		<Link
			aria-label={'Edit Appointment'}
			to={`/patient/appointments/${id}/edit`}
      className={'p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-800'}
    >
      <span className={'sr-only'}>Edit Appointment</span>
      <Pencil size={16}/>
    </Link>
	);
};

export const DeleteAppointment = ({ id }: {
	id: number
}) => {
	const dispatch = useAppDispatch();
	
	const { _id } = useAppSelector((state) => state.userSlice.user);
	const status = useAppSelector((state) => state.patientSlice.status);
	
	const handleDelete = async () => {
		await dispatch(deleteAppointment({
			patientId: _id,
      aptId: id
		}));
		dispatch(resetStatus());
	};
	
	return (
		<button
			onClick={handleDelete}
			disabled={status === 'pending'}
			aria-label={'Delete Appointment'}
			className={'p-2 rounded-md text-red-400 hover:bg-red-100 hover:text-red-800 cursor-pointer'}
		>
			<span className={'sr-only'}>Delete Appointment</span>
			<Trash2 size={16}/>
		</button>
	);
};
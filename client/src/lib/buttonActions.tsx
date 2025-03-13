import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';

export const EditAppointment = ({ id }: {
	id: number
}) => {
	return (
		<Link
			to={`/patient/appointments/${id}/edit`}
      className={'shadow-none bg-transparent hover:bg-transparent text-gray-400 hover:text-gray-600'}
    >
      <span className={'sr-only'}>Edit Appointment</span>
      <Pencil size={16}/>
    </Link>
	);
};
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import Button from '@/ui/button';

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

export const DeleteAppointment = ({ id }: {
	id: number
}) => {
	return (
		<Button>
		
		</Button>
		
		
		
		// <Link
		// 	to={`/patient/appointments/${id}/edit`}
		// 	className={'shadow-none bg-transparent hover:bg-transparent text-gray-400 hover:text-gray-600'}
		// >
		// 	<span className={'sr-only'}>Edit Appointment</span>
		// 	<Pencil size={16}/>
		// </Link>
	);
};
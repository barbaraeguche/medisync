import { Appointments } from '@/lib/definitions'; // todo: remove after redux
import { doctorApptColumn } from '@/lib/columns';
import AppointmentsTable from '@/components/appointmentsTable';

export default function DoctorAppointments() {
	// todo: appointments from redux
	const appointments: Appointments[] = [];
	
	return (
		<AppointmentsTable
			appointments={appointments}
			columns={doctorApptColumn}
		/>
	);
}
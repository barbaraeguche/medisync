import { Appointments } from '@/lib/definitions'; // todo: remove after redux
import { patientApptColumn } from '@/lib/columns';
import AppointmentsTable from '@/components/appointments-table';

export default function PatientAppointments() {
	// todo: appointments from redux
	const appointments: Appointments[] = [];
	
	return (
		<AppointmentsTable
			appointments={appointments}
			columns={patientApptColumn}
		/>
	);
}
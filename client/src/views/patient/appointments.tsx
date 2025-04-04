import { useAppSelector } from '@/hooks/useAppDispatch';
import { patientApptColumns } from '@/lib/columns';
import AppointmentsTable from '@/ui/appointments/table';

export default function PatientAppointments() {
	const { appointments } = useAppSelector((state) => state.patientSlice.patient);
	
	return (
		<AppointmentsTable
			columns={patientApptColumns}
			appointments={appointments ?? []}
		/>
	);
}
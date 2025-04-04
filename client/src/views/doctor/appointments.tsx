import { useAppSelector } from '@/hooks/useAppDispatch';
import { doctorApptColumns } from '@/lib/columns';
import AppointmentsTable from '@/ui/appointments/table';

export default function DoctorAppointments() {
	const { appointments } = useAppSelector((state) => state.doctorSlice.doctor);
	
	return (
		<AppointmentsTable
			columns={doctorApptColumns}
			appointments={appointments ?? []}
		/>
	);
}
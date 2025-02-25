import { useAppSelector } from '@/hooks/useAppDispatch';
import { doctorApptColumn } from '@/lib/columns';
import AppointmentsTable from '@/components/appointmentsTable';

export default function DoctorAppointments() {
	const { appointments } = useAppSelector((state) => state.doctorSlice.doctor);
	
	return (
		<AppointmentsTable
			appointments={appointments ?? []}
			columns={doctorApptColumn}
		/>
	);
}
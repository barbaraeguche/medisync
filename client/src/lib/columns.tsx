import { ColumnDef } from '@tanstack/react-table';
import { isAfter, isToday } from 'date-fns';
import { formatDate } from '@/utils/utils';
import { Appointments } from '@/lib/definitions';
import { DeleteAppointment } from '@/lib/buttonActions';
import AppointmentStatus from '@/ui/status';

const baseApptColumns: ColumnDef<Appointments>[] = [
	{
		accessorKey: '_id',
		header: 'ID',
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => {
			return <div>{formatDate(row.getValue('date'), 'MMM. dd yyyy')}</div>
		}
	},
	{
		accessorKey: 'time',
		header: 'Time',
	},
	{
		accessorKey: 'type',
		header: 'Type',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<AppointmentStatus status={row.getValue('status')}/>
		)
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
		cell: ({ row }) => {
			return <div className={'truncate max-w-[250px]'}>{row.getValue('notes')}</div>
		}
	}
];

export const patientApptColumn: ColumnDef<Appointments>[] = [...baseApptColumns];
patientApptColumn.splice(1, 0, {
	accessorKey: 'patientId',
	header: 'Patient'
});
patientApptColumn.splice(patientApptColumn.length, 0, {
	id: 'actions',
	cell: ({ row }) => {
		const appointment = row.original;
		return (
			<>
				{(
					!isToday(appointment.date) && isAfter(appointment.date, new Date())
					) && <DeleteAppointment id={appointment._id}/>
				}
			</>
		);
	}
})

export const doctorApptColumn: ColumnDef<Appointments>[] = [...baseApptColumns];
doctorApptColumn.splice(doctorApptColumn.length, 0, {
	accessorKey: 'doctorId',
  header: 'Doctor',
	cell: ({ row }) => {
		return <div>Dr. {row.getValue('doctorId')}</div>;
	}
});
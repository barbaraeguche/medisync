import { ColumnDef } from '@tanstack/react-table';
import { Appointments } from '@/lib/definitions';

export const doctorAppColumn: ColumnDef<Appointments>[] = [
	{
		accessorKey: '_id',
		header: 'ID',
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => {
			const date = new Date(row.getValue('date'));
			const formattedDate = date.toISOString().split('T')[0];
			
			return <div>{formattedDate}</div>
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
	},
	{
		accessorKey: 'notes',
		// header: () => <div className={'text-right'}>Notes</div>,
		// cell: info => info.getValue()
	},
];
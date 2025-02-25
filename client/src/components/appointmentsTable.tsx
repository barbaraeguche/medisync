import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { categorizeAppointments } from '@/utils/utils';
import { Appointments } from '@/lib/definitions';
import { Card, Table } from '@/ui';

export default function AppointmentsTable({ appointments, columns }: {
	appointments: Appointments[],
	columns: ColumnDef<Appointments>[]
}) {
	const { past, current, upcoming } = useMemo(() =>
		categorizeAppointments(appointments),
		[appointments]
	);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			{/* past appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={'Past Appointments'}/>
				<Card.Content>
					<Table
						columns={columns}
						data={past}
					/>
				</Card.Content>
			</Card>
			
			{/* current appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={'Current Appointments'}/>
				<Card.Content>
					<Table
						columns={columns}
						data={current}
					/>
				</Card.Content>
			</Card>
			
			{/* upcoming appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={'Upcoming Appointments'}/>
				<Card.Content>
					<Table
						columns={columns}
						data={upcoming}
					/>
				</Card.Content>
			</Card>
		</div>
	);
}
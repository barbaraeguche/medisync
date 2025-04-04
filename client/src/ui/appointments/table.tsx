import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { categorizeAppointments } from '@/utils/utils';
import { Appointments } from '@/lib/definitions';
import { Card, Table } from '@/components/ui';

export default function AppointmentsTable({ appointments, columns }: {
	appointments: Appointments[],
	columns: ColumnDef<Appointments>[]
}) {
	const { previous, current, upcoming } = useMemo(() =>
		categorizeAppointments(appointments), [appointments]
	);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			{/* previous appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={'Previous Appointments'}/>
				<Card.Content>
					<Table
						data={previous}
						columns={columns}
					/>
				</Card.Content>
			</Card>
			
			{/* today's appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={"Today's Appointments"}/>
				<Card.Content>
					<Table
						data={current}
						columns={columns}
					/>
				</Card.Content>
			</Card>
			
			{/* upcoming appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={'Upcoming Appointments'}/>
				<Card.Content>
					<Table
						data={upcoming}
						columns={columns}
					/>
				</Card.Content>
			</Card>
		</div>
	);
}
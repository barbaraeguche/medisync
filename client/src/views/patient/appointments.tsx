// import { useMemo } from 'react';
// import { categorizeAppointments } from '@/utils/utils';
// import { patientApptColumn } from '@/lib/columns';
// import { Card, Table } from '@/ui/index';
import { Card } from '@/ui/index';

export default function Appointments() {
	// const { past, current, upcoming } = useMemo(() =>
	// 	categorizeAppointments(dummyAppointments),
	// 	[]
	// );
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			{/* past appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={'Past Appointments'}/>
				{/*<Card.Content>*/}
				{/*	<Table*/}
				{/*		columns={patientApptColumn}*/}
				{/*		data={past}*/}
				{/*	/>*/}
				{/*</Card.Content>*/}
			</Card>
			
			{/* current appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={'Current Appointments'}/>
				{/*<Card.Content>*/}
				{/*	<Table*/}
				{/*		columns={patientApptColumn}*/}
				{/*		data={current}*/}
				{/*	/>*/}
				{/*</Card.Content>*/}
			</Card>
			
			{/* upcoming appointments */}
			<Card className={'max-w-full'}>
				<Card.Header title={'Upcoming Appointments'}/>
				{/*<Card.Content>*/}
				{/*	<Table*/}
				{/*		columns={patientApptColumn}*/}
				{/*		data={upcoming}*/}
				{/*	/>*/}
				{/*</Card.Content>*/}
			</Card>
		</div>
	);
}
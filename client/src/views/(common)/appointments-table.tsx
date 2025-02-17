// import {
// 	ColumnDef
// } from '@tanstack/react-table';
import { appointments } from '@/lib/definitions';
import { doctorAppColumn } from '@/lib/columns';
import { Table } from '@/ui/index';

export default function AppointmentsTable() {
	return (
		<div className={'p-4'}>
			<Table
				columns={doctorAppColumn}
				data={appointments}
			/>
		</div>
	);
}
import { useEffect, useMemo } from 'react';
import { fetchPatients } from '@/redux/thunks/patientThunk';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { entityColumns } from '@/lib/columns';
import { Card, Table } from '@/ui';

export default function AllPatients() {
	const dispatch = useAppDispatch();
	
	const { patients } = useAppSelector((state) => state.patientSlice);
	const shownPatients = useMemo(() => {
		return patients.map((pat) => pat.user);
	}, [patients]);
	
	useEffect(() => {
		dispatch(fetchPatients());
	}, [dispatch]);
	
	return (
		<Card className={'max-w-full'}>
			<Card.Header
				title={'Patients'}
				description={'A table of all registered patients.'}
			/>
			<Card.Content>
				<Table
					columns={entityColumns}
					data={shownPatients}
				/>
			</Card.Content>
		</Card>
	);
}
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchPatients } from '@/redux/thunks/patient-thunk';
import { entityColumns } from '@/lib/columns';
import { Card, Table } from '@/components/ui';

export default function RegisteredPatients() {
	const dispatch = useAppDispatch();
	
	const { patients } = useAppSelector((state) => state.patientSlice);
	const registeredPatients = useMemo(() => {
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
					data={registeredPatients}
				/>
			</Card.Content>
		</Card>
	);
}
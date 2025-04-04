import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchDoctors } from '@/redux/thunks/doctor-thunk';
import { entityColumns } from '@/lib/columns';
import { Card, Table } from '@/components/ui';

export default function RegisteredDoctors() {
	const dispatch = useAppDispatch();
	
	const { doctors } = useAppSelector((state) => state.doctorSlice);
	const registeredDoctors = useMemo(() => {
		return doctors.map((doc) => doc.user);
	}, [doctors]);
	
	useEffect(() => {
		dispatch(fetchDoctors());
	}, [dispatch]);
	
	return (
		<Card className={'max-w-full'}>
			<Card.Header
				title={'Doctors'}
				description={'A table of all registered doctors.'}
			/>
			<Card.Content>
				<Table
					columns={entityColumns}
					data={registeredDoctors}
				/>
			</Card.Content>
		</Card>
	);
}
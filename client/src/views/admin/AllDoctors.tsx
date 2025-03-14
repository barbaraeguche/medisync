import { useEffect, useMemo } from 'react';
import { fetchDoctors } from '@/redux/thunks/doctorThunk';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { entityColumns } from '@/lib/columns';
import { Card, Table } from '@/ui';

export default function AllDoctors() {
	const dispatch = useAppDispatch();
	
	const { doctors } = useAppSelector((state) => state.doctorSlice);
	const shownDoctors = useMemo(() => {
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
					data={shownDoctors}
				/>
			</Card.Content>
		</Card>
	);
}
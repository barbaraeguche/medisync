import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deleteDoctor } from '@/redux/thunks/doctor-thunk';
import { deletePatient } from '@/redux/thunks/patient-thunk';
import { Button, Card } from '@/components/ui';

export const DeleteAccount = ({ userId, role }: {
	userId: string,
	role: 'Doctor' | 'Patient'
}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	
	const handleDelete = async () => {
		try {
			const resultAction = await dispatch(
				role === 'Doctor' ? deleteDoctor(userId) : deletePatient(userId)
			);
			
			if (resultAction.meta.requestStatus === 'fulfilled') {
				// redirect to home page
				navigate('/', { replace: true });
			}
		} catch (err) {
			console.error('Account deletion failed:', err);
		}
	};
	
	return (
		<Card>
			<Card.Header
				title={'Deleting Your Account'}
				description={'This action cannot be undone.'}
			/>
			
			<Card.Content>
				<p className={'text-sm'}>
					{role === 'Doctor'
						? 'Deleting your account will remove your provider profile and patient relationships from QuantumCare.' +
						' Ensure patient care continuity before proceeding.'
						: 'Deleting your account will permanently remove your health records and appointment data from QuantumCare.' +
						' Consider downloading your records first.'
					}
				</p>
			</Card.Content>
			
			<Card.Footer>
				<Button
					className={'w-full'}
					onClick={handleDelete}
					variant={'destructive'}
					aria-label={'Delete Account'}
				>
					Delete Account
				</Button>
			</Card.Footer>
		</Card>
	);
};
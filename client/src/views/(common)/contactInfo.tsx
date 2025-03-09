import {
	addressSchema, emergencyContactSchema, AddressType, EmergencyContactType
} from '@/schemas/userSchema';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { saveUser } from '@/redux/thunks/userThunk';
import { resetStatus } from '@/redux/slices/userSlice';
import { showToast } from '@/utils/toast';
import { provinceOptions } from '@/utils/constants';
import { User } from '@/lib/definitions';
import { FieldConfig, ThunkError, ThunkStatus } from '@/lib/types';
import GenericForm from '@/components/genericForm';

export default function ContactInfo() {
	const { error, status, user } = useAppSelector((state) => state.userSlice);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<Address user={user} error={error} status={status}/>
			<EmergencyContact user={user} error={error} status={status}/>
		</div>
	);
}

function Address({ user, error, status }: {
	user: User,
	error: ThunkError,
	status: ThunkStatus
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: AddressType) => {
		dispatch(saveUser({
			id: user._id,
			user: { 'address': data }
		}));
		showToast(error, status);
		dispatch(resetStatus());
	};
	
	const addressFields: FieldConfig[] = [
		{
			name: 'street',
			label: 'Street (Optional)',
			placeholder: '123 Main St'
		},
		{
			name: 'city',
			label: 'City (Optional)',
			placeholder: 'Vancouver'
		},
		{
			name: 'province',
			label: 'Province',
			placeholder: 'Select your province',
			isSelect: true,
			options: provinceOptions
		},
		{
			name: 'postalCode',
			label: 'Postal Code',
			placeholder: 'V6B 2K8'
		},
		{
			name: 'country',
			label: 'Country',
			placeholder: 'Canada',
		}
	];
	
	return (
		<GenericForm
			title={'Address'}
			schema={addressSchema}
			fields={addressFields}
			onSubmit={handleSubmit}
			initialValues={user.address}
		/>
	);
}

function EmergencyContact({ user, error, status }: {
	user: User,
	error: ThunkError,
	status: ThunkStatus
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: EmergencyContactType) => {
		dispatch(saveUser({
			id: user._id,
			user: { 'emergencyContact': data }
		}));
		showToast(error, status);
	};
	
	const contactFields: FieldConfig[] = [
		{
			name: 'name',
			label: 'Contact Name',
			placeholder: 'Steve Dave'
		},
		{
			name: 'relationship',
			label: 'Relationship to User (Optional)',
			placeholder: 'Spouse'
		},
		{
			name: 'email',
			label: 'Contact Email',
			placeholder: 'steve.dave@example.com'
		}
	];
	
	return (
		<GenericForm
			fields={contactFields}
			onSubmit={handleSubmit}
			title={'Emergency Contact'}
			schema={emergencyContactSchema}
			initialValues={user.emergencyContact}
		/>
	);
}
import { userFullNameSchema, UserFullNameType } from '@/schemas/userSchema';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { saveUser } from '@/redux/thunks/userThunk';
import { resetStatus } from '@/redux/slices/userSlice';
import { showToast } from '@/utils/toast';
import { FieldConfig } from '@/lib/types';
import GenericForm from '@/components/genericForm';
import { useEffect } from 'react';

export default function UserInfo() {
	const dispatch = useAppDispatch();
	const { error, status, user } = useAppSelector((state) => state.userSlice);
	
	useEffect(() => {
		console.log(status)
	}, [status]);
	
	const handleSubmit = (data: UserFullNameType) => {
		dispatch(saveUser({
			id: user._id,
			user: data
		}));
		showToast(error, status);
		dispatch(resetStatus());
	};
	
	const userFields: FieldConfig[] = [
		{
			name: 'firstName',
			label: 'First Name',
			placeholder: 'Jane'
		},
		{
			name: 'lastName',
			label: 'Last Name',
			placeholder: 'Doe'
		},
		{
			name: 'email',
			label: 'Email',
			placeholder: 'jane.doe@example.com',
			disabled: true
		},
		{
			name: 'phoneNumber',
			label: 'Phone number',
			placeholder: '(123) 456-7890',
			disabled: true
		},
		{
			name: 'gender',
			label: 'Gender',
			placeholder: 'Male',
			disabled: true
		}
	];
	
	return (
		<GenericForm
			fields={userFields}
			initialValues={user}
			onSubmit={handleSubmit}
			title={'User Information'}
			schema={userFullNameSchema}
			readOnlyFields={['email', 'phoneNumber', 'gender']}
		/>
	);
}

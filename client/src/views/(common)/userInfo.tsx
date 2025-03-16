import { userFullNameSchema, UserFullNameType } from '@/schemas/userSchema';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { saveUser } from '@/redux/thunks/userThunk';
import { resetStatus } from '@/redux/slices/userSlice';
import { FieldConfig } from '@/lib/types';
import GenericEditableForm from '@/components/genericEditableForm';

export default function UserInfo() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.userSlice);
	
	const handleSubmit = (data: UserFullNameType) => {
		dispatch(saveUser({
			id: user._id,
			userInfo: data
		}));
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
		<GenericEditableForm
			slice={'user'}
			fields={userFields}
			initialValues={user}
			onSubmit={handleSubmit}
			title={'User Information'}
			schema={userFullNameSchema}
			readOnlyFields={['email', 'phoneNumber', 'gender']}
		/>
	);
}

import {
	updateEmailSchema, updatePhoneNumberSchema, updatePasswordSchema,
	UpdateEmailType, UpdatePhoneNumberType, UpdatePasswordType
} from '@/schemas/userSchema';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { saveUser } from '@/redux/thunks/userThunk';
import { resetStatus } from '@/redux/slices/userSlice';
import { User } from '@/lib/definitions';
import { FieldConfig } from '@/lib/types';
import GenericEditableForm from '@/components/genericEditableForm';

export default function Settings() {
	const user = useAppSelector((state) => state.userSlice.user);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<ChangeEmail user={user}/>
      <ChangePhoneNumber user={user}/>
      <ChangePassword/>
		</div>
	);
}

function ChangeEmail({ user }: {
	user: User
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: UpdateEmailType) => {
		dispatch(saveUser({
			id: user._id,
			userInfo: data
		}));
		dispatch(resetStatus());
	};
	
	const emailField: FieldConfig[] = [
		{
			name: 'email',
			label: 'New Email',
			placeholder: 'jane.doe@example.com'
		},
	];
	
	return (
		<GenericEditableForm
			fields={emailField}
			initialValues={user}
			title={'Change Email'}
			onSubmit={handleSubmit}
			schema={updateEmailSchema}
		/>
  );
}

function ChangePhoneNumber({ user }: {
	user: User
}) {
	const formatUser = {
		...user,
		phoneNumber: user.phoneNumber ?? ''
	};
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: UpdatePhoneNumberType) => {
		dispatch(saveUser({
			id: user._id,
			userInfo: {
				...data,
				phoneNumber: data.phoneNumber === '' ? null : data.phoneNumber
			}
		}));
		dispatch(resetStatus());
	};
	
	const phoneNumberField: FieldConfig[] = [
		{
			name: 'phoneNumber',
			label: 'New Phone number',
			placeholder: '(123) 456-7890'
		},
	];
	
	return (
		<GenericEditableForm
			onSubmit={handleSubmit}
			fields={phoneNumberField}
			initialValues={formatUser}
			title={'Change Phone Number'}
			schema={updatePhoneNumberSchema}
		/>
	);
}

function ChangePassword() {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: UpdatePasswordType) => {
		console.log(data);
		// dispatch(saveUser({
		// 	id: user._id,
		// 	user: data
		// }));
		dispatch(resetStatus());
	};
	
	const passwordFields: FieldConfig[] = [
		{
			name: 'password',
			label: 'New Password',
			placeholder: '******'
		},
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
			placeholder: '******'
		},
	];
	
	return (
		<GenericEditableForm
			onSubmit={handleSubmit}
			fields={passwordFields}
			title={'Change Password'}
			schema={updatePasswordSchema}
		/>
	);
}
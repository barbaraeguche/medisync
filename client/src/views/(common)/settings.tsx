import {
	updateEmailSchema, updatePhoneNumberSchema, updatePasswordSchema,
	UpdateEmailType, UpdatePhoneNumberType, UpdatePasswordType
} from '@/schemas/userSchema';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { savePassword, saveUser } from '@/redux/thunks/userThunk';
import { resetStatus } from '@/redux/slices/userSlice';
import { User } from '@/lib/definitions';
import { FieldConfig } from '@/lib/types';
import GenericEditableForm from '@/components/genericEditableForm';
import { DeleteEntity } from '@/components/deleteButton';

export default function Settings() {
	const user = useAppSelector((state) => state.userSlice.user);
	const role = user.role;
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<ChangeEmail user={user}/>
      <ChangePhoneNumber user={user}/>
      <ChangePassword user={user}/>
			{(role === 'Doctor' || role === 'Patient') && (
				<DeleteEntity id={user._id} role={role}/>
			)}
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
			placeholder: 'jane.doe@example.com',
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
			userInfo: { phoneNumber: data.phoneNumber?.trim() || null }
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

function ChangePassword({ user }: {
	user: User
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: UpdatePasswordType) => {
		dispatch(savePassword({
			id: user._id,
			userInfo: data
		}));
		dispatch(resetStatus());
	};
	
	const passwordFields: FieldConfig[] = [
		{
			name: 'password',
			type: 'password',
			placeholder: '******',
			label: 'New Password',
		},
		{
			type: 'password',
			placeholder: '******',
			name: 'confirmPassword',
			label: 'Confirm Password',
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
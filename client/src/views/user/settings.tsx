import {
	updateEmailSchema, updatePhoneNumberSchema, updatePasswordSchema,
	UpdateEmailType, UpdatePhoneNumberType, UpdatePasswordType
} from '@/schemas/user-schema';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { savePassword, saveUser } from '@/redux/thunks/user-thunk';
import { resetStatus } from '@/redux/slices/user-slice';
import { User } from '@/lib/definitions';
import { FieldConfig } from '@/lib/types';
import EditableForm from '@/components/editable-form';
import { DeleteAccount } from '@/components/delete-account';

export default function Settings() {
	const user = useAppSelector((state) => state.userSlice.user);
	const { _id, role } = user;
	const canDeleteAccount = role === 'Doctor' || role === 'Patient';
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<ChangeEmail user={user}/>
      <ChangePhoneNumber user={user}/>
      <ChangePassword user={user}/>
			{canDeleteAccount && (
				<DeleteAccount userId={_id} role={role}/>
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
		<EditableForm
			slice={'user'}
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
			userInfo: { phoneNumber: data.phoneNumber.trim() || null }
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
		<EditableForm
			slice={'user'}
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
			type: 'password',
			name: 'password',
			label: 'New Password',
			placeholder: '******'
		},
		{
			type: 'password',
			name: 'confirmPassword',
			label: 'Confirm Password',
			placeholder: '******'
		},
	];
	
	return (
		<EditableForm
			slice={'user'}
			fields={passwordFields}
			onSubmit={handleSubmit}
			title={'Change Password'}
			schema={updatePasswordSchema}
		/>
	);
}
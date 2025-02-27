import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	UpdateEmailSchema, UpdatePhoneNumberSchema, UpdatePasswordSchema,
	UpdateEmailType, UpdatePhoneNumberType, UpdatePasswordType
} from '@/schemas/userSchema';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { useEditableState } from '@/hooks/useEditableState';
import { User } from '@/lib/definitions';
import InputWrapper from '@/components/inputWrapper';
import FormActionButtons from '@/components/formActionButtons';
import { Card } from '@/ui';

export default function Settings() {
	const user = useAppSelector((state) => state.userSlice.user);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			{/* todo: insert previous values for email and phone number */}
			<ChangeEmail user={user}/>
      <ChangePhoneNumber user={user}/>
      <ChangePassword/>
		</div>
	);
}

function ChangeEmail({ user }: {
	user: User
}) {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<UpdateEmailType>({
		resolver: zodResolver(UpdateEmailSchema),
		reValidateMode: 'onBlur',
		values: { email: user.email }
	});
	
	const onSubmit: SubmitHandler<UpdateEmailType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
	    <Card>
		    <Card.Header title={'Change Email'}/>
		    <Card.Content>
			    <InputWrapper
				    {...register('email')}
						readOnly={!isEditing}
				    conf={{
					    label: 'New Email',
					    placeholder: 'jane.doe@example.com'
				    }}
				    name={'email'}
				    error={errors.email}
			    />
        </Card.Content>
		    <Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
		    </Card.Footer>
	    </Card>
    </form>
  );
}

function ChangePhoneNumber({ user }: {
	user: User
}) {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<UpdatePhoneNumberType>({
		resolver: zodResolver(UpdatePhoneNumberSchema),
		reValidateMode: 'onBlur',
		values: { phoneNumber: user.phoneNumber }
	});
	
	const onSubmit: SubmitHandler<UpdatePhoneNumberType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Change Phone Number'}/>
				<Card.Content>
					<InputWrapper
						{...register('phoneNumber')}
						readOnly={!isEditing}
						conf={{
							label: 'New Phone number',
							placeholder: '(123) 456-7890'
						}}
						name={'phoneNumber'}
						error={errors.phoneNumber}
					/>
				</Card.Content>
				<Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}

function ChangePassword() {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<UpdatePasswordType>({
		resolver: zodResolver(UpdatePasswordSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<UpdatePasswordType> = (data) => {
    console.log(data);
  };
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Change Password'}/>
				<Card.Content>
					{/* new password */}
					<InputWrapper
						{...register('password')}
						readOnly={!isEditing}
						conf={{
							label: 'New Password',
							placeholder: '******'
						}}
						name={'newPassword'}
						error={errors.password}
					/>
					
					{/* confirmed password */}
					<InputWrapper
						{...register('confirmPassword')}
						readOnly={!isEditing}
						conf={{
							label: 'Confirm Password',
							placeholder: '******'
						}}
						name={'confirmPassword'}
						error={errors.confirmPassword}
					/>
				</Card.Content>
				<Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}
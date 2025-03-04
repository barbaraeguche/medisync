import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFullNameSchema, UserFullNameType } from '@/schemas/userSchema';
import { saveUser } from '@/redux/thunks/userThunk';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch.ts';
import { useEditableState } from '@/hooks/useEditableState.ts';
import InputWrapper from '@/components/inputWrapper';
import FormActionButtons from '@/components/formActionButtons.tsx';
import { Card } from '@/ui/index';

export default function UserInfo() {
	const { isEditing, setIsEditing } = useEditableState();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.userSlice.user);
	
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<UserFullNameType>({
		resolver: zodResolver(userFullNameSchema),
		reValidateMode: 'onBlur',
		values: user
	});
	
	const onSubmit: SubmitHandler<UserFullNameType> = (data) => {
		console.log(data);
		dispatch(saveUser(data));
		setIsEditing(false);
  };

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'User Information'}/>
				
				<Card.Content>
					{/* first name */}
					<InputWrapper
						{...register('firstName')}
						readOnly={!isEditing}
						conf={{
							label: 'First Name',
							placeholder: 'Jane'
						}}
						name={'firstName'}
						error={errors.firstName}
					/>
					
					{/* last name */}
					<InputWrapper
						{...register('lastName')}
						readOnly={!isEditing}
						conf={{
							label: 'Last Name',
							placeholder: 'Doe'
						}}
						name={'lastName'}
						error={errors.lastName}
					/>
					
					{/* email */}
					<InputWrapper
						disabled
						readOnly={!isEditing}
						conf={{
							label: 'Email',
							placeholder: 'jane.doe@example.com'
						}}
						name={'email'}
					/>
					
					{/* phone number */}
					<InputWrapper
						disabled
						readOnly={!isEditing}
						conf={{
							label: 'Phone number',
							placeholder: '(123) 456-7890'
						}}
						name={'phoneNumber'}
					/>
					
					{/* gender */}
					<InputWrapper
						disabled
						readOnly={!isEditing}
						conf={{
							label: 'Gender',
							placeholder: 'Male'
						}}
						name={'gender'}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormActionButtons<UserFullNameType> isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}

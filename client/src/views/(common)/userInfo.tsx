import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFullNameSchema, UserFullNameType } from '@/schemas/userSchema';
import { useAppSelector } from '@/hooks/useAppDispatch.ts';
import InputWrapper from '@/components/inputWrapper';
import FormButtons from '@/components/formButtons';
import { Card } from '@/ui/index';

export default function UserInfo() {
	const [isEditing, setIsEditing] = useState(false);
	const user = useAppSelector((state) => state.userSlice.user);
	
	
	console.log(isEditing)
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<UserFullNameType>({
		resolver: zodResolver(UserFullNameSchema),
		reValidateMode: 'onBlur',
		defaultValues: user
	});
	
	const onSubmit: SubmitHandler<UserFullNameType> = (data) => {
		console.log(data);
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
					<FormButtons<UserFullNameType> isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}

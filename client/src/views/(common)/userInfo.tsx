import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFullNameSchema, UserFullNameType } from '@/schemas/userSchema';
import InputWrapper from '@/components/inputWrapper';
import FormButtons from '@/components/formButtons';
import { Card } from '@/ui/index';

export default function UserInfo() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<UserFullNameType>({
		resolver: zodResolver(UserFullNameSchema),
		reValidateMode: 'onBlur'
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
						conf={{
							label: 'Email',
							placeholder: 'jane.doe@example.com'
						}}
						name={'email'}
					/>
					
					{/* phone number */}
					<InputWrapper
						disabled
						conf={{
							label: 'Phone number',
							placeholder: '(123) 456-7890'
						}}
						name={'phoneNumber'}
					/>
					
					{/* gender */}
					<InputWrapper
						disabled
						conf={{
							label: 'Gender',
							placeholder: 'Male'
						}}
						name={'gender'}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormButtons/>
				</Card.Footer>
			</Card>
		</form>
	);
}

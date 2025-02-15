import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicUserSchema, BasicUserType } from '@/schemas/user-schema';
import FormLayout from '@/layouts/forms';
import InputWrapper from '@/components/input-wrapper';
import FormButtons from '@/components/form-buttons.tsx';
import FormHeader from '@/components/form-header.tsx';

export default function UserInfo() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<BasicUserType>({
		resolver: zodResolver(BasicUserSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<BasicUserType> = (data) => {
    console.log(data);
  };

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout>
				<FormHeader title={'User Information'}/>
				
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
				
				<FormButtons/>
			</FormLayout>
		</form>
	);
}

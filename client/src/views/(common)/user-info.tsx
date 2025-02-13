import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicUserInfoSchema, BasicUserInfoType } from '@/schemas/user-schema.ts';
import FormLayout from '@/layouts/forms.tsx';
import InputWrapper from '@/components/input-wrapper.tsx';
import { Button, Select } from '@/ui/index.ts';

export default function UserInfo() {
	const {
		register, handleSubmit, formState: { errors }, control
	} = useForm<BasicUserInfoType>({
		resolver: zodResolver(BasicUserInfoSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<BasicUserInfoType> = (data) => {
    console.log(data);
  };
	
	const options = [
		{ value: 'hi', label: 'Lmfao' },
		{ value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
	];
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout>
				{/* first name */}
				<InputWrapper
					{...register('firstName')}
					conf={{
						label: 'First Name'
					}}
					name={'firstName'}
					error={errors.firstName}
				/>
				
				{/* last name */}
				<InputWrapper
					{...register('lastName')}
					conf={{
						label: 'Last Name'
					}}
					name={'lastName'}
					error={errors.lastName}
				/>
				
				{/* email */}
				<InputWrapper
					{...register('email')}
					conf={{
						label: 'Email'
					}}
					name={'email'}
					error={errors.email}
				/>
				
				{/* phone number */}
				<InputWrapper
					{...register('phoneNumber')}
					conf={{
            label: 'Phone number'
          }}
					name={'phoneNumber'}
					error={errors.phoneNumber}
				/>
				
				{/* gender */}
				<Select
					conf={{
						label: 'Gender'
					}}
					name={'gender'}
					control={control}
					options={options}
					error={errors.gender}
				/>
				
				<Button type="submit">Save Changes</Button>
			</FormLayout>
		</form>
	);
}

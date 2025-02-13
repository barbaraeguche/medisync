import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShownBasicInfoSchema, BasicUserInfoType } from '@/schemas/user-schema';
import FormLayout from '@/layouts/forms';
import InputWrapper from '@/components/input-wrapper';
import { Button } from '@/ui/index';

export default function UserInfo() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<BasicUserInfoType>({
		resolver: zodResolver(ShownBasicInfoSchema),
		reValidateMode: 'onBlur',
	});
	
	const onSubmit: SubmitHandler<BasicUserInfoType> = (data) => {
    console.log(data);
  };

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
					disabled
					conf={{
						label: 'Email'
					}}
					name={'email'}
				/>
				
				{/* phone number */}
				<InputWrapper
					disabled
					conf={{
            label: 'Phone number'
          }}
					name={'phoneNumber'}
				/>
				
				{/* gender */}
				<InputWrapper
					disabled
					conf={{
						label: 'Gender'
					}}
					name={'gender'}
				/>
				
				<Button type="submit">Save Changes</Button>
			</FormLayout>
		</form>
	);
}

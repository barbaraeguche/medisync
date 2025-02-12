import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicUserInfoSchema, BasicUserInfoType } from '../../schemas/user-schema.ts';
import FormLayout from '../../layouts/forms.tsx';
import InputWrapper from '../../components/input-wrapper.tsx';
import { Button, Select } from '../../ui/index.ts';

export default function UserInfo() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<BasicUserInfoType>({
		// resolver: zodResolver(BasicUserInfoSchema),
		// reValidateMode: 'onChange',
		defaultValues: {
			firstName: 'barbara',
      lastName: 'eguche',
      email: 'barbara@gmail.com',
			phoneNumber: '(123) 456-7890',
      gender: 'male'
		}
	});
	
	const onSubmit = (data) => {
    // submit data
    console.log(data);
  };
	
	const options = [
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' }
	];
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout>
				{/* first name */}
				<InputWrapper
					{...register('firstName')}
					keyfield={'firstName'}
					conf={{
						label: 'First Name'
					}}
					error={errors.firstName}
				/>
				
				{/* last name */}
				<InputWrapper
					{...register('lastName')}
					keyfield={'lastName'}
					conf={{
						label: 'Last Name'
					}}
					error={errors.lastName}
				/>
				
				{/* email */}
				<InputWrapper
					{...register('email')}
					keyfield={'email'}
					conf={{
						label: 'Email'
					}}
					error={errors.email}
				/>
				
				{/* phone number */}
				<InputWrapper
					{...register('phoneNumber')}
					keyfield={'phoneNumber'}
					conf={{
            label: 'Phone number'
          }}
					error={errors.phoneNumber}
				/>
				
				<InputWrapper
					{...register('gender')}
					keyfield={'gender'}
					conf={{
						type:'select',
						label: 'Gender',
						options: options
					}}
					error={errors.gender}
				/>
				
				{/* gender */}
				{/*<Select {...register('gender')} options={options}/>*/}
				
				<Button type="submit">Save Changes</Button>
			</FormLayout>
		</form>
	);
}

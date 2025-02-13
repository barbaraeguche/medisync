import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAddressSchema, UserEmergencyContactSchema, UserAddressType, UserEmergencyContactType } from '@/schemas/user-schema.ts';
import FormLayout from '@/layouts/forms.tsx';
import InputWrapper from '@/components/input-wrapper.tsx';
import { Button } from '@/ui/index.ts';

export default function AdditionalUserinfo() {
	return (
		<div>
			<UserAddress/>
			<UserEmergencyContact/>
		</div>
	);
}

function UserAddress() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<UserAddressType>({
		resolver: zodResolver(UserAddressSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<UserAddressType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout>
				{/* street */}
				<InputWrapper
					{...register('street')}
					conf={{
						label: 'Street'
					}}
					name={'street'}
					error={errors.street}
				/>
				
				{/* city */}
				<InputWrapper
					{...register('city')}
					conf={{
						label: 'City'
					}}
					name={'city'}
					error={errors.city}
				/>
				
				{/* province */}
				<InputWrapper
					{...register('province')}
					conf={{
						label: 'Province'
					}}
					name={'province'}
					error={errors.province}
				/>
				
				{/* postal code */}
				<InputWrapper
					{...register('postalCode')}
					conf={{
						label: 'Postal Code'
					}}
					name={'postalCode'}
					error={errors.postalCode}
				/>
				
				{/* country */}
				<InputWrapper
					{...register('country')}
					conf={{
						label: 'Country'
					}}
					name={'country'}
					error={errors.country}
				/>
				
				<Button type="submit">Save Changes</Button>
			</FormLayout>
		</form>
	);
}

function UserEmergencyContact() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<UserEmergencyContactType>({
		resolver: zodResolver(UserEmergencyContactSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<UserEmergencyContactType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout>
				{/* name */}
				<InputWrapper
					{...register('name')}
					conf={{
						label: 'Contact Name'
					}}
					name={'name'}
					error={errors.name}
				/>
				
				{/* relationship */}
				<InputWrapper
					{...register('relationship')}
					conf={{
						label: 'Relationship to User'
					}}
					name={'relationship'}
					error={errors.relationship}
				/>
				
				{/* email */}
				<InputWrapper
					{...register('email')}
					conf={{
						label: 'Contact Email'
					}}
					name={'email'}
					error={errors.email}
				/>
				
				<Button type="submit">Save Changes</Button>
      </FormLayout>
		</form>
	);
}
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAddressSchema, UserEmergencyContactSchema, UserAddressType, UserEmergencyContactType } from '../../schemas/user-schema.ts';
import FormLayout from '../../layouts/forms.tsx';
import InputWrapper from '../../components/input-wrapper.tsx';
import { Button } from '../../ui/index.ts';

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
					keyfield={'street'}
					conf={{
						label: 'Street'
					}}
					error={errors.street}
				/>
				
				{/* city */}
				<InputWrapper
					{...register('city')}
					keyfield={'city'}
					conf={{
						label: 'City'
					}}
					error={errors.city}
				/>
				
				{/* province */}
				<InputWrapper
					{...register('province')}
					keyfield={'province'}
					conf={{
						label: 'Province'
					}}
					error={errors.province}
				/>
				
				{/* postal code */}
				<InputWrapper
					{...register('postalCode')}
					keyfield={'postalCode'}
					conf={{
						label: 'Postal Code'
					}}
					error={errors.postalCode}
				/>
				
				{/* country */}
				<InputWrapper
					{...register('country')}
					keyfield={'country'}
					conf={{
						label: 'Country'
					}}
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
					keyfield={'name'}
					conf={{
						label: 'Contact Name'
					}}
					error={errors.name}
				/>
				
				{/* relationship */}
				<InputWrapper
					{...register('relationship')}
					keyfield={'relationship'}
					conf={{
						label: 'Relationship to User'
					}}
					error={errors.relationship}
				/>
				
				{/* email */}
				<InputWrapper
					{...register('email')}
					keyfield={'email'}
					conf={{
						label: 'Contact Email'
					}}
					error={errors.email}
				/>
				
				<Button type="submit">Save Changes</Button>
      </FormLayout>
		</form>
	);
}
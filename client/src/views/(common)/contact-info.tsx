import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	AddressSchema, EmergencyContactSchema, AddressType, EmergencyContactType
} from '@/schemas/user-schema';
import { canadianProvinces } from '@/utils/constants';
import FormLayout from '@/layouts/forms';
import InputWrapper from '@/components/input-wrapper';
import FormButtons from '@/components/form-buttons';
import FormHeader from '@/components/form-header';
import { Select } from '@/ui/index';

export default function ContactInfo() {
	return (
		<div className={'space-y-12 md:space-y-24'}>
			<Address/>
			<EmergencyContact/>
		</div>
	);
}

function Address() {
	const {
		register, handleSubmit, formState: { errors }, control
	} = useForm<AddressType>({
		resolver: zodResolver(AddressSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<AddressType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout>
				<FormHeader title={'Address'}/>
				
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
				<Select
					conf={{
						label: 'Province'
					}}
					name={'province'}
					control={control}
					options={canadianProvinces}
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
				
				<FormButtons/>
			</FormLayout>
		</form>
	);
}

function EmergencyContact() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<EmergencyContactType>({
		resolver: zodResolver(EmergencyContactSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<EmergencyContactType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout>
				<FormHeader title={'Emergency Contact'}/>
				
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
				
				<FormButtons/>
      </FormLayout>
		</form>
	);
}
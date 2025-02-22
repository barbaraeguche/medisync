import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	AddressSchema, EmergencyContactSchema, AddressType, EmergencyContactType
} from '@/schemas/user-schema';
import { provinceOptions } from '@/utils/constants';
import InputWrapper from '@/components/input-wrapper';
import FormButtons from '@/components/form-buttons';
import { Card, Select } from '@/ui/index';

export default function ContactInfo() {
	return (
		<div className={'space-y-12 md:space-y-16'}>
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
			<Card>
				<Card.Header title={'Address'}/>

				<Card.Content>
					{/* street */}
					<InputWrapper
						{...register('street')}
						conf={{
							label: 'Street (Optional)',
							placeholder: '123 Main St'
						}}
						name={'street'}
						error={errors.street}
					/>
	
					{/* city */}
					<InputWrapper
						{...register('city')}
						conf={{
							label: 'City (Optional)',
							placeholder: 'Vancouver'
						}}
						name={'city'}
						error={errors.city}
					/>
	
					{/* province */}
					<Select
						conf={{
							label: 'Province',
							placeholder: 'Select your province'
						}}
						name={'province'}
						control={control}
						options={provinceOptions}
						error={errors.province}
					/>
	
					{/* postal code */}
					<InputWrapper
						{...register('postalCode')}
						conf={{
							label: 'Postal Code',
							placeholder: 'V6B 2K8'
						}}
						name={'postalCode'}
						error={errors.postalCode}
					/>
	
					{/* country */}
					<InputWrapper
						{...register('country')}
						conf={{
							label: 'Country',
							placeholder: 'Canada'
						}}
						name={'country'}
						error={errors.country}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormButtons/>
				</Card.Footer>
			</Card>
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
			<Card>
				<Card.Header title={'Emergency Contact'}/>

				<Card.Content>
					{/* name */}
					<InputWrapper
						{...register('name')}
						conf={{
							label: 'Contact Name',
							placeholder: 'Steve Dave'
						}}
						name={'name'}
						error={errors.name}
					/>
	
					{/* relationship */}
					<InputWrapper
						{...register('relationship')}
						conf={{
							label: 'Relationship to User (Optional)',
							placeholder: 'Spouse'
						}}
						name={'relationship'}
						error={errors.relationship}
					/>
	
					{/* email */}
					<InputWrapper
						{...register('email')}
						conf={{
							label: 'Contact Email',
							placeholder: 'steve.dave@example.com'
						}}
						name={'email'}
						error={errors.email}
					/>
				</Card.Content>
				
				<Card.Footer>
          <FormButtons/>
        </Card.Footer>
      </Card>
		</form>
	);
}
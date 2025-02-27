import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	addressSchema, emergencyContactSchema, AddressType, EmergencyContactType
} from '@/schemas/userSchema';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { useEditableState } from '@/hooks/useEditableState';
import { provinceOptions } from '@/utils/constants';
import { User } from '@/lib/definitions';
import InputWrapper from '@/components/inputWrapper';
import FormActionButtons from '@/components/formActionButtons';
import { Card, Select } from '@/ui/index';

export default function ContactInfo() {
	const user = useAppSelector((state) => state.userSlice.user);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<Address user={user}/>
			<EmergencyContact user={user}/>
		</div>
	);
}

function Address({ user }: {
	user: User
}) {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, control, reset
	} = useForm<AddressType>({
		resolver: zodResolver(addressSchema),
		reValidateMode: 'onBlur',
		values: user.address
	});

	const onSubmit: SubmitHandler<AddressType> = (data) => {
		console.log(data);
		setIsEditing(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Address'}/>

				<Card.Content>
					{/* street */}
					<InputWrapper
						{...register('street')}
						readOnly={!isEditing}
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
						readOnly={!isEditing}
						conf={{
							label: 'City (Optional)',
							placeholder: 'Vancouver'
						}}
						name={'city'}
						error={errors.city}
					/>
	
					{/* province */}
					<Select
						disabled={!isEditing}
						conf={{
							label: 'Province',
							placeholder: 'Select your province',
							readOnly: !isEditing
						}}
						name={'province'}
						control={control}
						options={provinceOptions}
						error={errors.province}
					/>
	
					{/* postal code */}
					<InputWrapper
						{...register('postalCode')}
						readOnly={!isEditing}
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
						readOnly={!isEditing}
						conf={{
							label: 'Country',
							placeholder: 'Canada'
						}}
						name={'country'}
						error={errors.country}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}

function EmergencyContact({ user }: {
	user: User
}) {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<EmergencyContactType>({
		resolver: zodResolver(emergencyContactSchema),
		reValidateMode: 'onBlur',
		values: user.emergencyContact
	});

	const onSubmit: SubmitHandler<EmergencyContactType> = (data) => {
		console.log(data);
		setIsEditing(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Emergency Contact'}/>

				<Card.Content>
					{/* name */}
					<InputWrapper
						{...register('name')}
						readOnly={!isEditing}
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
						readOnly={!isEditing}
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
						readOnly={!isEditing}
						conf={{
							label: 'Contact Email',
							placeholder: 'steve.dave@example.com'
						}}
						name={'email'}
						error={errors.email}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
        </Card.Footer>
      </Card>
		</form>
	);
}
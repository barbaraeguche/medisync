import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	UpdateEmailSchema, UpdatePhoneNumberSchema, UpdatePasswordSchema, UpdateEmailType, UpdatePhoneNumberType, UpdatePasswordType
} from '@/schemas/userSchema';
import InputWrapper from '@/components/input-wrapper';
import FormButtons from '@/components/form-buttons';
import { Card } from '@/ui';

export default function AccountSettings() {
	return (
		<div className={'space-y-12 md:space-y-16'}>
			{/* todo: insert previous values for email and phone number */}
			<ChangeEmail/>
      <ChangePhoneNumber/>
      <ChangePassword/>
		</div>
	);
}

function ChangeEmail() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<UpdateEmailType>({
		resolver: zodResolver(UpdateEmailSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<UpdateEmailType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
	    <Card>
		    <Card.Header title={'Change Email'}/>
		    <Card.Content>
			    <InputWrapper
				    {...register('email')}
				    conf={{
					    label: 'New Email',
					    placeholder: 'jane.doe@example.com'
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

function ChangePhoneNumber() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<UpdatePhoneNumberType>({
		resolver: zodResolver(UpdatePhoneNumberSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<UpdatePhoneNumberType> = (data) => {
		console.log(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Change Phone Number'}/>
				<Card.Content>
					<InputWrapper
						{...register('phoneNumber')}
						conf={{
							label: 'New Phone number',
							placeholder: '(123) 456-7890'
						}}
						name={'phoneNumber'}
						error={errors.phoneNumber}
					/>
				</Card.Content>
				<Card.Footer>
					<FormButtons/>
				</Card.Footer>
			</Card>
		</form>
	);
}

function ChangePassword() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<UpdatePasswordType>({
		resolver: zodResolver(UpdatePasswordSchema),
		reValidateMode: 'onBlur'
	});
	
	const onSubmit: SubmitHandler<UpdatePasswordType> = (data) => {
    console.log(data);
  };
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Change Password'}/>
				<Card.Content>
					{/* new password */}
					<InputWrapper
						{...register('password')}
						conf={{
							label: 'New Password',
							placeholder: '******'
						}}
						name={'newPassword'}
						error={errors.password}
					/>
					
					{/* confirmed password */}
					<InputWrapper
						{...register('confirmPassword')}
						conf={{
							label: 'Confirm Password',
							placeholder: '******'
						}}
						name={'confirmPassword'}
						error={errors.confirmPassword}
					/>
				</Card.Content>
				<Card.Footer>
					<FormButtons/>
				</Card.Footer>
			</Card>
		</form>
	);
}
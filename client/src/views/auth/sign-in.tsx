import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginType } from '@/schemas/authSchema';
import { AuthError } from '@/components/form-error';
import InputWrapper from '@/components/input-wrapper';
import { Button, Card } from '@/ui/index';

export default function SignInForm() {
	const navigate = useNavigate();
	
	const {
    register, handleSubmit, formState: { errors }
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
		reValidateMode: 'onBlur'
  });
	
	const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
  };
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header
					title={'Sign in'}
					description={'Choose your preferred sign in method'}
				/>
				
				<Card.Content className={'space-y-6'}>
					{/* email */}
					<InputWrapper
						{...register('email')}
						conf={{
							label: 'Email',
							placeholder: 'jane.doe@example.com'
						}}
						name={'email'}
						error={errors.email}
					/>
					
					{/* password */}
					<InputWrapper
						{...register('password')}
						conf={{
							label: 'Password',
							placeholder: '******'
						}}
						name={'password'}
						error={errors.password}
					/>
					
					<Button
						type={'submit'}
						className={'w-full'}
					>
						Sign in
					</Button>
					
					<AuthError message={''}/> {/* todo: change this here, and in registration form */}
				</Card.Content>
				
				<Card.Footer className={'text-sm text-muted-foreground text-center'}>
					Don't have an account? {' '}
					<button
						aria-label={'Create an account'}
						className={'text-primary underline-offset-4 hover:underline cursor-pointer'}
						onClick={() => navigate('/auth/register')}
					>
						Create an account
					</button>
				</Card.Footer>
			</Card>
		</form>
	);
}
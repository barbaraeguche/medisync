import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginType } from '@/schemas/authSchema';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { signInUser } from '@/redux/thunks/authThunk';
import { ServerError } from '@/components/formError';
import InputWrapper from '@/components/inputWrapper';
import { Button, Card } from '@/ui/index';

export default function SignInForm() {
	const dispatch = useAppDispatch();
	
	const {
    register, handleSubmit, formState: { errors }
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
		reValidateMode: 'onBlur'
  });
	
	const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
		dispatch(signInUser(data));
  };
	
	return (
		<Card>
			<Card.Header
				title={'Sign in'}
				description={'Choose your preferred sign in method'}
			/>
			
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card.Content>
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
					
					<ServerError message={''}/> {/* todo: change this here, and in registration form */}
				</Card.Content>
			</form>
			
			<Card.Footer className={'text-sm text-muted-foreground text-center'}>
				Don't have an account? {' '}
				<Link
					to={'/auth/register'}
					aria-label={'Create an account'}
					className={'text-primary underline-offset-4 hover:underline cursor-pointer'}
				>
					Create an account
				</Link>
			</Card.Footer>
		</Card>
	);
}
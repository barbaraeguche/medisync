import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginType } from '@/schemas/auth-schema';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { signInUser } from '@/redux/thunks/auth-thunk';
import { resetStatus } from '@/redux/slices/user-slice';
import InputWrapper from '@/components/input-wrapper';
import Spinner from '@/components/spinner';
import { ServerError } from '@/components/errors/error-messages';
import { Button, Card } from '@/components/ui';

export default function SignInForm() {
	const dispatch = useAppDispatch();
	const { error } = useAppSelector((state) => state.userSlice);
	
	useEffect(() => {
		// clear registration error if exist
		dispatch(resetStatus());
	}, [dispatch]);
	
	const {
    register, handleSubmit, formState: { errors, isSubmitting }
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
		reValidateMode: 'onBlur'
  });
	
	const onSubmit: SubmitHandler<LoginType> = async (data) => {
		await dispatch(signInUser(data));
		dispatch(resetStatus());
  };
	
	return (
		<Card>
			<Card.Header
				title={'Sign in'}
				description={'Manage your account and appointments'}
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
						type={'password'}
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
						disabled={isSubmitting}
					>
						{isSubmitting && <Spinner/>}
						Sign in
					</Button>
					
					<ServerError message={error}/>
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
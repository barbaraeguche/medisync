import { Link, useNavigate } from 'react-router-dom';
import { DoorClosed, DoorOpen } from 'lucide-react';
import { logoutUser } from '@/redux/thunks/auth-thunk';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button } from '@/components/ui';

export const SignOutButton = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	
	const handleLogout = async () => {
		try {
			const resultAction = await dispatch(logoutUser());
			
			if (resultAction.meta.requestStatus === 'fulfilled') {
				// redirect to home page
				navigate('/', { replace: true });
			}
		} catch (err) {
			console.error('Logout failed:', err);
		}
	};
	
	return (
		<Button
			variant={'ghost'}
			aria-label={'Log out'}
			onClick={handleLogout}
      className={'w-full px-3 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100'}
		>
			<span className={'hidden lg:block'}><DoorOpen size={22}/></span>
			<span className={'block lg:hidden'}>Sign Out</span>
		</Button>
	);
};

export const SignInButton = () => {
	return (
		<Link to={'/auth/signin'}>
			<Button
				variant={'form'}
				aria-label={'Sign in'}
				className={'w-full px-3 text-teal-600'}
			>
				<span className={'hidden lg:block'}><DoorClosed size={22}/></span>
				<span className={'block lg:hidden'}>Sign In</span>
			</Button>
		</Link>
	);
};
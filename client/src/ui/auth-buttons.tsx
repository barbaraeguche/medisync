import { Link, useNavigate } from 'react-router-dom';
import { DoorClosed, DoorOpen } from 'lucide-react';
import { logoutUser } from '@/redux/thunks/auth-thunk';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Button from '@/components/ui/button';

export const LogoutButton = () => {
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
      className={'px-3 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100'}
		>
			<DoorOpen size={22}/>
		</Button>
	);
};

export const SignInButton = () => {
	return (
		<Link to={'/auth/signin'}>
			<Button
				variant={'ghost'}
				aria-label={'Sign in'}
				className={'px-3 hover:text-teal-600'}
			>
				<DoorClosed size={22}/>
			</Button>
		</Link>
	);
};
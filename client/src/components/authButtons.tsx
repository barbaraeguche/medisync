import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '@/redux/thunks/authThunk';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Button from '@/ui/button';

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
			onClick={handleLogout}
      className={'bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100'}
		>
			Logout
		</Button>
	);
};

export const SignInButton = () => {
	return (
		<Link to={'/auth/signin'}>
			<Button
				variant={'ghost'}
				className={'hover:text-teal-600'}
			>
				Sign In
			</Button>
		</Link>
	);
};
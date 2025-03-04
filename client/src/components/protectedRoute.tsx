import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppDispatch';

export default function ProtectedRoute({ allowedRoles }: {
	allowedRoles: string[]
}) {
	const { _id, role } = useAppSelector((state) => state.userSlice.user);
	
	// if the user on an auth route
	if (allowedRoles.includes('Auth')) {
		// if the user is logged in, redirect to profile
		if (_id) {
			return <Navigate to={'/profile'} replace/>
		}
		// else proceed
		return <Outlet/>;
	}
	
	// no session, redirect to sign in
	if (!_id) {
		return <Navigate to={'/auth/signin'} replace/>
	}

	// check if the user has permission based on their role
	const hasRequiredRole = allowedRoles.includes(role) || allowedRoles.includes('All');
	if (!hasRequiredRole) {
		return <Navigate to={'/unauthorized'} replace/>
	}
	
	// the user is authenticated and authorized
	return <Outlet/>;
}
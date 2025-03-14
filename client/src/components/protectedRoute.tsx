import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppDispatch';

export default function ProtectedRoute({ allowedRoles }: {
	allowedRoles: string[]
}) {
	const { isAuthenticated, user: { role } } = useAppSelector((state) => state.userSlice);
	
	// if the user on an auth route
	if (allowedRoles.includes('Auth')) {
		// if the user is signed in, redirect to profile
		if (isAuthenticated) {
			return <Navigate to={'/profile'} replace/>
		}
		// else proceed
		return <Outlet/>;
	}
	
	// no session, redirect to sign in
	if (!isAuthenticated) {
		return <Navigate to={'/auth/signin'} replace/>
		// return <Navigate to={'/auth/signin'} replace state={{ from: window.location.pathname }}/>
		// todo: go to prev page before sign in
	}

	// check if the user has permission based on their role
	const hasRequiredRole = allowedRoles.includes(role) || allowedRoles.includes('All');
	if (!hasRequiredRole) {
		return <Navigate to={'/unauthorized'} replace/>
	}
	
	// the user is authenticated and authorized
	return <Outlet/>;
}
import { useEffect, useState } from 'react';
import { apiClient } from '@/utils/axios-config';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { doFetchAfterAuth } from '@/redux/thunks/auth-thunk';
import { clearAuth, resetStatus, setUser } from '@/redux/slices/user-slice';

export const useAuthVerification = () => {
	const [isVerifying, setIsVerifying] = useState(true);
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector((state) => state.userSlice);
	
	useEffect(() => {
		const verifyToken = async () => {
			try {
				/*
				* always verify the token on page load/reload regardless of state
				* try to verify token from cookie
				*/
				const { valid, user } = (await apiClient.get('auth/verify')).data;
				
				if (valid) {
					// if valid, update user state with user data from response
					dispatch(setUser(user));
					// important: fetch role-specific data the same we do after /signin
					await doFetchAfterAuth(user);
				} else {
					// if invalid, clear auth state
					dispatch(clearAuth());
				}
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (_) {
				// if error, clear auth state
				dispatch(clearAuth());
			} finally {
				// reset status and stop verification loading
				dispatch(resetStatus());
				setIsVerifying(false);
			}
		};
		
		verifyToken().then(() => {});
	}, [dispatch, isAuthenticated]);
	
	return { isVerifying };
};

export default useAuthVerification;
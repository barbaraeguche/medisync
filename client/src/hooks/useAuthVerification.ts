import { useEffect, useState } from 'react';
import { apiClient } from '@/utils/axiosConfig';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { clearAuth, resetStatus } from '@/redux/slices/userSlice';

export const useAuthVerification = () => {
	const [isVerifying, setIsVerifying] = useState(true);
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector((state) => state.userSlice);
	
	useEffect(() => {
		const verifyToken = async () => {
			try {
				// if already authenticated in state, skip verification
				if (isAuthenticated) {
					setIsVerifying(false);
					return;
				}
				
				// try to verify token from cookie
				const response = await apiClient.get('auth/verify');
				
				if (response.data.valid) {
					// if valid, update user state with user data from response
					dispatch({
						type: 'user/signInUser/fulfilled',
						payload: { user: response.data.user }
					});
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
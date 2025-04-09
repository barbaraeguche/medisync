import { useAppSelector } from '@/hooks/useAppDispatch';
import {
	adminRoutes, userRoutes, doctorRoutes, patientRoutes
} from '@/routes';

export const useNavItems = () => {
	const { isAuthenticated, user: { role } } = useAppSelector((state) => state.userSlice);
	
	const userNav = [...userRoutes];
	const roleNav = [...(
		role === 'Admin' ? adminRoutes
			: role === 'Doctor' ? doctorRoutes
				: role === 'Patient' ? patientRoutes
					: []
	)];
	
	return { isAuthenticated, role, userNav, roleNav };
};
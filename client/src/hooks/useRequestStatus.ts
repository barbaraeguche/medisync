import { useAppSelector } from '@/hooks/useAppDispatch';

export const useRequestStatus = (
	statusType: 'user' | 'doctor' | 'patient'
) => {
	const statuses = {
		user: useAppSelector((state) => state.userSlice.status),
		doctor: useAppSelector((state) => state.doctorSlice.status),
		patient: useAppSelector((state) => state.patientSlice.status)
	};
	
	return statuses[statusType] === 'pending';
};
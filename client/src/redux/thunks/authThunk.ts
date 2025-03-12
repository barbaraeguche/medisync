import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '@/redux/store';
import { fetchDoctor } from '@/redux/thunks/doctorThunk';
import { fetchPatient } from '@/redux/thunks/patientThunk';
import { resetStatus as resetDoctorStatus } from '@/redux/slices/doctorSlice';
import { resetStatus as resetPatientStatus } from '@/redux/slices/patientSlice';
import { apiClient } from '@/utils/axiosConfig';
import { Doctor, Patient, User } from '@/lib/definitions';

const authPath = 'auth';

// fetch the newly created user based on their role and dispatch the corresponding action
const doFetchAfterAuth = (user: User) => {
	const { _id, role } = user;
	const dispatch = store.dispatch;
	
	if (role == 'Doctor') {
		dispatch(fetchDoctor(_id));
		dispatch(resetDoctorStatus());
	} else if (role == 'Patient') {
		dispatch(fetchPatient(_id));
		dispatch(resetPatientStatus());
	} else return;
};

export const signInUser = createAsyncThunk(
	'user/signInUser',
	async (
		data: Pick<User, 'email' | 'password'>,
		{ rejectWithValue }
	) => {
		try {
			const response = await apiClient.post(`${authPath}/signin`, data);
			const user: User = response.data.user;
			
			doFetchAfterAuth(user);
			return user;
		} catch (err: any) {
			return rejectWithValue(err.response?.data || 'Login failed. Please try again.');
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (data: Partial<User | Doctor | Patient>, { rejectWithValue }) => {
		try {
			let role;
			
			// for doctor or patient, the role is nested in the user property
			if ('user' in data && data['user']?.role) {
				role = data['user'].role;
			} else if ('role' in data) { // for plain user(admin), role is directly on the data object
				role = data.role;
			} else { // if no role found, reject with a descriptive message
				return rejectWithValue('User role is required for registration');
			}
			
			// send registration request with the appropriate role
			const response = await apiClient.post(`${authPath}/register/${role}`, data);
			const user: User = response.data.user;
			
			doFetchAfterAuth(user);
			return user;
		} catch (err: any) {
			return rejectWithValue(err.response?.data || 'Registration failed. Please try again.');
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			// send a request to the backend to log the user out
			await apiClient.post(`${authPath}/logout`);
			return null;
		} catch (err: any) {
			return rejectWithValue(err.response?.data || 'Logout failed. Please try again.');
		}
	}
);
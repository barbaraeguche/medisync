import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '@/redux/store';
import { fetchDoctor } from '@/redux/thunks/doctorThunk';
import { fetchPatient } from '@/redux/thunks/patientThunk';
import { apiClient } from '@/utils/axiosConfig';
import { Doctor, Patient, User } from '@/lib/definitions';

const authPath = 'auth';

const doFetchAfterAuth = (user: User) => {
	const { _id, role } = user;
	
	if (role == 'Doctor') {
		store.dispatch(fetchDoctor(_id));
	} else if (role == 'Patient') {
		store.dispatch(fetchPatient(_id));
	} else {
		// todo: for admin, also in the backend registration, create base user
	}
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
	async (data: Partial<Doctor> | Partial<Patient>, { rejectWithValue }) => {
		try {
			// determine if registering a doctor or patient based on their role... admin would be me
			const response = await apiClient.post(`${authPath}/register/${data.user!.role}`, data);
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
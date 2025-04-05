import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '@/redux/store';
import { fetchDoctor } from '@/redux/thunks/doctor-thunk';
import { fetchPatient } from '@/redux/thunks/patient-thunk';
import { resetStatus as resetDoctorStatus } from '@/redux/slices/doctor-slice';
import { resetStatus as resetPatientStatus } from '@/redux/slices/patient-slice';
import { apiClient } from '@/utils/axios-config';
import { showToast } from '@/utils/toast';
import { User } from '@/lib/definitions';
import { Entity } from '@/lib/types';

const authPath = 'auth';

// fetch the newly created user based on their role and dispatch the corresponding action
export const doFetchAfterAuth = async (user: User) => {
	const { _id, role } = user;
	const dispatch = store.dispatch;
	
	if (role == 'Doctor') {
		await dispatch(fetchDoctor(_id));
		dispatch(resetDoctorStatus());
	} else if (role == 'Patient') {
		await dispatch(fetchPatient(_id));
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
			
			await doFetchAfterAuth(user);
			return user;
		} catch (err: any) {
			const errorMessage = err.response?.data || 'Login failed. Please try again.';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (data: Entity, { rejectWithValue }) => {
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
			
			await doFetchAfterAuth(user);
			return user;
		} catch (err: any) {
			const errorMessage = err.response?.data || 'Registration failed. Please try again.';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			// send a request to the backend to log the user out
			const response = (await apiClient.post(`${authPath}/logout`)).data;
			showToast(response, 'fulfilled');
			return null;
		} catch (err: any) {
			const errorMessage = err.response?.data || 'Logout failed. Please try again.';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
		}
	}
);
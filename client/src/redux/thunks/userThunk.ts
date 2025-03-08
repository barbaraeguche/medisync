import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/utils/axiosConfig';
import { Doctor, Patient, User } from '@/lib/definitions';

const authPath = 'auth';
const userPath = 'users';

// authentication
export const signInUser = createAsyncThunk(
	'user/signInUser',
	async (
		data: Pick<User, 'email' | 'password'>,
		{ rejectWithValue }
	) => {
		try {
			const response = await apiClient.post(`${authPath}/signin`, data);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || 'Login failed. Please try again.');
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (data: Doctor | Patient, { rejectWithValue }) => {
		try {
			// determine if registering a doctor or patient based on their role... admin would be me
			const userRole = data.user.role;
			
			const response = await apiClient.post(`${authPath}/register/${userRole}`, data);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || 'Registration failed. Please try again.');
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
			return rejectWithValue(err.response?.data?.message || 'Logout failed. Please try again.');
		}
	}
);

// user crud
export const fetchUsers = createAsyncThunk(
	'user/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const response = await apiClient.get(`/${userPath}`);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || 'Failed to fetch all users');
		}
	}
);

export const saveUser = createAsyncThunk(
	'user/saveUser',
  async (user: Partial<User>, { rejectWithValue }) => {
    try {
			const response = await apiClient.put(`/${userPath}/${user._id}`, user);
			return response.data?.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update user');
    }
  }
);
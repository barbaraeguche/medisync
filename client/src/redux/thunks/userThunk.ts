import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/utils/axiosConfig';
import { showToast } from '@/utils/toast';
import { User } from '@/lib/definitions';

const userPath = 'users';

export const fetchUsers = createAsyncThunk(
	'user/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const response = await apiClient.get(`${userPath}`);
			return response.data;
		} catch (err: any) {
			const errorMessage = err.response?.data || 'Failed to fetch all users';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
		}
	}
);

export const saveUser = createAsyncThunk(
	'user/saveUser',
  async (
		{ id, userInfo } : { id: string, userInfo: Partial<User> },
		{ rejectWithValue }
	) => {
		try {
			const { user, message } = (await apiClient.put(`${userPath}/${id}`, userInfo)).data;
			showToast(message, 'fulfilled');
			return user;
		} catch (err: any) {
			const errorMessage = err.response?.data || 'Failed to update user';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
		}
  }
);
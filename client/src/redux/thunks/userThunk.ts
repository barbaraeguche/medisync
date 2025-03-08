import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/utils/axiosConfig';
import { User } from '@/lib/definitions';

const userPath = 'users';

export const fetchUsers = createAsyncThunk(
	'user/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const response = await apiClient.get(`${userPath}`);
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
			const response = await apiClient.put(`${userPath}/${user._id}`, user);
			return response.data?.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update user');
    }
  }
);
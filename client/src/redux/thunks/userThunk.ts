import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/utils/axiosConfig';
import { User } from '@/lib/definitions';

const mainPath = 'users';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await apiClient.get(`/${mainPath}/${id}`);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || 'Failed to fetch user');
		}
	}
);

export const fetchUsers = createAsyncThunk(
	'user/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const response = await apiClient.get(`/${mainPath}`);
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
			await apiClient.put(`/${mainPath}/${user._id}`, user);
			return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { rejectWithValue }) => {
		try {
			await apiClient.delete(`${mainPath}/${id}`);
			return id;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
		}
	}
);
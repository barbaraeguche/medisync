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
			const response = await apiClient.put(`/${mainPath}/${user._id}`, user);
			return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update user');
    }
  }
);

export const saveAddress = createAsyncThunk(
	'user/saveAddress',
	async (
		{ id, address }: { id: string, address: NonNullable<User['address']> },
		{ rejectWithValue }
	) => {
		try {
			const response = await apiClient.put(`/${mainPath}/${id}/address`, address);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || 'Failed to update address');
		}
	}
);

export const saveEmergencyContact = createAsyncThunk(
	'user/saveEmergencyContact',
	async (
		{ id, emergencyContact }: { id: string, emergencyContact: NonNullable<User['emergencyContact']> },
		{ rejectWithValue }
	) => {
		try {
			const response = await apiClient.put(`/${mainPath}/${id}/emergencyContact`, emergencyContact);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || 'Failed to update emergency contact');
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
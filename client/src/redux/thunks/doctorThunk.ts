import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/utils/axiosConfig';
import { store } from '@/redux/store';
import { deleteUser } from '@/redux/slices/userSlice';
import { Practitioner, Availabilities } from '@/lib/definitions';

const doctorPath = 'doctors';

export const fetchDoctor = createAsyncThunk(
	'doctor/fetchDoctor',
	async (id: string, { rejectWithValue }) => {
		try {
      const response = await apiClient.get(`${doctorPath}/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch doctor');
    }
	}
);

export const fetchDoctors = createAsyncThunk(
	'doctor/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${doctorPath}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all doctors');
    }
  }
);

export const saveDoctor = createAsyncThunk(
	'doctor/saveDoctor',
  async (
		{ id, practitioner }: { id: string, practitioner: Partial<Practitioner> },
		{ rejectWithValue }
	) => {
    try {
      const response = await apiClient.put(`${doctorPath}/${id}`, practitioner);
      return response.data?.doctor;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save doctor role information');
    }
  }
);

export const saveAvailability = createAsyncThunk(
	'doctor/saveAvailability',
  async (
    { id, availability }: { id: string, availability: Availabilities },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(`${doctorPath}/${id}/availability`, availability);
      return response.data?.availability;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save doctor availability');
    }
  }
);

export const deleteDoctor = createAsyncThunk(
	'user/deleteDoctor',
	async (id: string, { rejectWithValue }) => {
		try {
			await apiClient.delete(`${doctorPath}/${id}`);
			store.dispatch(deleteUser(id));
			return id;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
		}
	}
);
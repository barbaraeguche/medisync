import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '@/redux/store';
import { deleteUser } from '@/redux/slices/user-slice';
import { apiClient } from '@/utils/axios-config';
import { showToast } from '@/utils/toast';
import { Practitioner, Availabilities } from '@/lib/definitions';

const doctorPath = 'doctors';

export const fetchDoctor = createAsyncThunk(
	'doctor/fetchDoctor',
	async (id: string, { rejectWithValue }) => {
		try {
      const response = await apiClient.get(`${doctorPath}/${id}`);
      return response.data;
    } catch (err: any) {
			const errorMessage = err.response?.data || 'Failed to fetch doctor';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
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
			const errorMessage = err.response?.data || 'Failed to fetch all doctors';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
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
      const { doctor, message } = (await apiClient.put(`${doctorPath}/${id}`, practitioner)).data;
			showToast(message, 'fulfilled');
			return doctor;
    } catch (err: any) {
			const errorMessage = err.response?.data || 'Failed to update doctor';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
    }
  }
);

export const saveAvailability = createAsyncThunk(
	'doctor/saveAvailability',
  async (
    { id, freeTime }: { id: string, freeTime: Availabilities },
    { rejectWithValue }
  ) => {
    try {
      const { availability, message } = (await apiClient.put(`${doctorPath}/${id}/availability`, freeTime)).data;
			showToast(message, 'fulfilled');
			return availability;
    } catch (err: any) {
			const errorMessage = err.response?.data || 'Failed to update availability';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
	'user/deleteDoctor',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = (await apiClient.delete(`${doctorPath}/${id}`)).data;
			store.dispatch(deleteUser(id));
			showToast(response, 'fulfilled');
			return id;
		} catch (err: any) {
			const errorMessage = err.response?.data || 'Failed to delete user';
			showToast(errorMessage, 'rejected');
			return rejectWithValue(errorMessage);
		}
	}
);
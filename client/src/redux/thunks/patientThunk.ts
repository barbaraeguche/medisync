import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/utils/axiosConfig';
import { store } from '@/redux/store';
import { deleteUser } from '@/redux/slices/userSlice';
import { Appointments, Patient } from '@/lib/definitions';

const patientPath = 'patients';

export const fetchPatient = createAsyncThunk(
	'patient/fetchPatient',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${patientPath}/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch patient');
    }
  }
);

export const fetchPatients = createAsyncThunk(
	'patient/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${patientPath}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all patients');
    }
  }
);

export const savePatient = createAsyncThunk(
	'patient/savePatient',
  async (patient: Partial<Patient>, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`${patientPath}/${patient._id}`, patient);
      return response.data?.patient;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save patient');
    }
  }
);

export const createAppointment = createAsyncThunk(
	'patient/createAppointment',
  async (
		{ id, appointment }: { id: string, appointment: Partial<Appointments> },
		{ rejectWithValue }
	) => {
    try {
      const response = await apiClient.post(`${patientPath}/${id}/appointments`, appointment);
      return response.data?.appointment;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create appointment');
    }
  }
);

export const saveAppointment = createAsyncThunk(
  'patient/saveAppointment',
  async (
		{ id, appointment }: { id: string, appointment: Appointments },
		{ rejectWithValue }
	) => {
    try {
      const response = await apiClient.put(`${patientPath}/${id}/appointments`, appointment);
      return response.data?.appointment;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save appointment');
    }
  }
);

export const deletePatient = createAsyncThunk(
  'user/deletePatient',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`${patientPath}/${id}`);
      store.dispatch(deleteUser(id));
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
    }
  }
);
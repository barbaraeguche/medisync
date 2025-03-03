import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/utils/axiosConfig';
import { Appointments, Patient } from '@/lib/definitions';

const mainPath = 'patients';

export const fetchPatient = createAsyncThunk(
	'patient/fetchPatient',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/${mainPath}/${id}`);
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
      const response = await apiClient.get(`/${mainPath}`);
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
      await apiClient.put(`/${mainPath}/${patient._id}`, patient);
      return patient;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save patient');
    }
  }
);

export const createAppointment = createAsyncThunk(
	'patient/createAppointment',
  async (
		{ id, appointment }: { id: string, appointment: Appointments },
		{ rejectWithValue }
	) => {
    try {
      const response = await apiClient.post(`/${mainPath}/${id}/appointments`, appointment);
      return response.data;
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
      const response = await apiClient.put(`/${mainPath}/${id}/appointments`, appointment);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save appointment');
    }
  }
);

export const deletePatient = createAsyncThunk(
  'user/deletePatient',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`${mainPath}/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
    }
  }
);
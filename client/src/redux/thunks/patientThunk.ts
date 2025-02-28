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
      const response = await apiClient.put(`/${mainPath}/${patient._id}`, patient);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save patient');
    }
  }
);

export const saveAppointment = createAsyncThunk(
	'patient/saveAppointment',
  async (appointment: Appointments, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/${mainPath}/${appointment.patientId}/appointments`, appointment);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save appointment');
    }
  }
);

export const saveHealthMetrics = createAsyncThunk(
	'patient/saveHealthMetrics',
  async (
    { id, healthMetrics }: { id: string, healthMetrics: Patient['healthMetrics'] },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(`/${mainPath}/${id}/healthMetrics`, healthMetrics);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save health metrics');
    }
  }
);
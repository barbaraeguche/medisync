import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/utils/axiosConfig';
import { store } from '@/redux/store';
import { fetchDoctors } from '@/redux/thunks/doctorThunk';
import { deleteUser } from '@/redux/slices/userSlice';
import { showToast } from '@/utils/toast';
import { Appointments, Patient } from '@/lib/definitions';

const patientPath = 'patients';

export const fetchPatient = createAsyncThunk(
	'patient/fetchPatient',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${patientPath}/${id}`);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data || 'Failed to fetch patient';
      showToast(errorMessage, 'rejected');
      return rejectWithValue(errorMessage);
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
      const errorMessage = err.response?.data || 'Failed to fetch all patients';
      showToast(errorMessage, 'rejected');
      return rejectWithValue(errorMessage);
    }
  }
);

export const savePatient = createAsyncThunk(
	'patient/savePatient',
  async (
    { id, patientInfo }: { id: string, patientInfo: Partial<Patient> },
    { rejectWithValue }
  ) => {
    try {
      const { patient, message } = (await apiClient.put(`${patientPath}/${id}`, patientInfo)).data;
      showToast(message, 'fulfilled');
      return patient;
    } catch (err: any) {
      const errorMessage = err.response?.data || 'Failed to update patient';
      showToast(errorMessage, 'rejected');
      return rejectWithValue(errorMessage);
    }
  }
);

export const createAppointment = createAsyncThunk(
	'patient/createAppointment',
  async (
		{ id, appointmentInfo }: { id: string, appointmentInfo: Partial<Appointments> },
		{ rejectWithValue }
	) => {
    try {
      const { appointment, message } = (await apiClient.post(`${patientPath}/${id}/appointment`, appointmentInfo)).data;
      store.dispatch(fetchDoctors());
      
      showToast(message, 'fulfilled');
      return appointment;
    } catch (err: any) {
      const errorMessage = err.response?.data || 'Failed to create appointment';
      showToast(errorMessage, 'rejected');
      return rejectWithValue(errorMessage);
    }
  }
);

export const saveAppointment = createAsyncThunk(
  'patient/saveAppointment',
  async (
		{ id, appointmentInfo }: { id: string, appointmentInfo: Appointments },
		{ rejectWithValue }
	) => {
    try {
      const { appointment, message } = (await apiClient.put(`${patientPath}/${id}/appointment`, appointmentInfo)).data;
      store.dispatch(fetchDoctors());
      
      showToast(message, 'fulfilled');
      return appointment;
    } catch (err: any) {
      const errorMessage = err.response?.data || 'Failed to update appointment';
      showToast(errorMessage, 'rejected');
      return rejectWithValue(errorMessage);
    }
  }
);

export const deletePatient = createAsyncThunk(
  'user/deletePatient',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = (await apiClient.delete(`${patientPath}/${id}`)).data;
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
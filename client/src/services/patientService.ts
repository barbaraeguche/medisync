import { apiClient } from '@/services/axiosConfig';
import { Patient } from '@/lib/definitions';

// get
export const getPatient = async (patientId: number) => {
	const response = await apiClient.get(`/patient/${patientId}`);
	return response.data;
};

// post
export const createPatient = async (patient: Patient) => {
	const response = await apiClient.post('/patient', patient);
	return response.data;
};

// put
export const replacePatient = async (patient: Patient) => {
	const response = await apiClient.put(`/patient/${patient.id}`, patient);
	return response.data;
};

// patch
export const updatePatient = async (patient: Partial<Patient>) => {
	const response = await apiClient.put(`/patient/${patient.id}`, patient);
	return response.data;
};

// delete
export const deletePatient = async (patientId: number) => {
	const response = await apiClient.delete(`/patient/${patientId}`);
	return response.data;
};

// implement dispatch to update global state
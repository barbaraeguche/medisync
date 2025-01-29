import { apiClient } from '@/services/axiosConfig';
import { Patient } from '@/lib/definitions';

export const getPatient = async (patientId: number) => {
	return await apiClient.get(`/patient/${patientId}`);
};

export const createPatient = async (patient: Patient) => {
	return await apiClient.post('/patient', patient);
};

export const replacePatient = async (patient: Patient) => {
	return await apiClient.put(`/patient/${patient.id}`, patient);
};

export const updatePatient = async (patient: Partial<Patient>) => {
	return await apiClient.patch(`/patient/${patient.id}`, patient);
};

export const deletePatient = async (patientId: number) => {
	return await apiClient.delete(`/patient/${patientId}`);
};

// implement dispatch to update global state
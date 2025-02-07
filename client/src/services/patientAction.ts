import { apiClient } from './axiosConfig.ts';
import { Patient } from '../lib/definitions.ts';

export const getPatient = async (id: string) => {
	const endpoint = `/patient/${id}`;
	
	return await apiClient.get(endpoint);
};

export const createPatient = async (patient: Patient) => {
	const endpoint = `/patient`;
	
	return await apiClient.post(endpoint, patient);
};

export const replacePatient = async (patient: Patient) => {
	const endpoint = `/patient/${patient._id}`;
	
	return await apiClient.put(endpoint, patient);
};

export const deletePatient = async (id: string) => {
	const endpoint = `/patient/${id}`;
	
	return await apiClient.delete(endpoint);
};

// implement dispatch to update global states
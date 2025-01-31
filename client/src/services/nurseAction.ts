import { apiClient } from './axiosConfig.ts';
import { Nurse } from '../lib/definitions.ts';

export const getNurse = async (id: string) => {
	const endpoint = `/nurse/${id}`;
	
	return await apiClient.get(endpoint);
};

export const createNurse = async (nurse: Nurse) => {
	const endpoint = `/nurse`;
	
	return await apiClient.post(endpoint, nurse);
};

export const replaceNurse = async (nurse: Nurse) => {
	const endpoint = `/nurse/${nurse.id}`;
	
	return await apiClient.put(endpoint, nurse);
};

export const deleteNurse = async (id: string) => {
	const endpoint = `/nurse/${id}`;
	
	return await apiClient.delete(endpoint);
};

// implement dispatch to update global states
import { apiClient } from '@/utils/axiosConfig.ts';
import { Doctor } from '@/lib/definitions.ts';

export const getDoctor = async (id: string) => {
	const endpoint = `/doctor/${id}`;

	return await apiClient.get(endpoint);
};

export const createDoctor = async (doctor: Doctor) => {
	const endpoint = `/doctor`;
	
	return await apiClient.post(endpoint, doctor);
};

export const replaceDoctor = async (doctor: Doctor) => {
	const endpoint = `/doctor/${doctor._id}`;
	
	return await apiClient.put(endpoint, doctor);
};

export const deleteDoctor = async (id: string) => {
	const endpoint = `/doctor/${id}`;
	
	return await apiClient.delete(endpoint);
};

// implement dispatch to update global states
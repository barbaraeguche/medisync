import { apiClient } from '@/services/axiosConfig';
import { Nurse } from '@/lib/definitions';

// get
export const getNurse = async (nurseId: number) => {
	const response = await apiClient.get(`/nurse/${nurseId}`);
	return response.data;
};

// post
export const createNurse = async (nurse: Nurse) => {
	const response = await apiClient.post('/nurse', nurse);
	return response.data;
};

// put
export const replaceNurse = async (nurse: Nurse) => {
	const response = await apiClient.put(`/nurse/${nurse.id}`, nurse);
	return response.data;
};

// patch
export const updateNurse = async (nurse: Partial<Nurse>) => {
	const response = await apiClient.patch(`/nurse/${nurse.id}`, nurse);
	return response.data;
};

// delete
export const deleteNurse = async (nurseId: number) => {
	const response = await apiClient.delete(`/nurse/${nurseId}`);
	return response.data;
};

// implement dispatch to update global state
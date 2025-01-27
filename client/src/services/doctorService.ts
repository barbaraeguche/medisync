import { apiClient } from '@/services/axiosConfig';
import { Doctor } from '@/lib/definitions';

// get
export const getDoctor = async (doctorId: number) => {
	const response = await apiClient.get(`/doctor/${doctorId}`);
	return response.data;
};

// post
export const createDoctor = async (doctor: Doctor) => {
	const response = await apiClient.post('/doctor', doctor);
	return response.data;
};

// put
export const replaceDoctor = async (doctor: Doctor) => {
	const response = await apiClient.put(`/doctor/${doctor.id}`, doctor);
	return response.data;
};

// patch
export const updateDoctor = async (doctor: Partial<Doctor>) => {
	const response = await apiClient.patch(`/doctor/${doctor.id}`, doctor);
	return response.data;
};

// delete
export const deleteDoctor = async (doctorId: number) => {
	const response = await apiClient.delete(`/doctor/${doctorId}`);
	return response.data;
};

// implement dispatch to update global state
import { apiClient } from '@/services/axiosConfig';
import { User } from '@/lib/definitions';

// get
export const getUser = async (userId: string) => {
	const response = await apiClient.get(`/user/${userId}`);
	return response.data;
};

// post
export const createUser = async (user: User) => {
	const response = await apiClient.post('/user', user);
	return response.data;
};

// put
export const replaceUser = async (user: User) => {
	const response = await apiClient.put(`/user/${user.id}`, user);
  return response.data;
};

// patch
export const updateUser = async (user: Partial<User>) => {
	const response = await apiClient.patch(`/user/${user.id}`, user);
  return response.data;
};

// delete
export const deleteUser = async (userId: string) => {
	const response = await apiClient.delete(`/user/${userId}`);
	return response.data;
};

// implement dispatch to update global state
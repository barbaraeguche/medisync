import { apiClient } from '@/services/axiosConfig';
import { User } from '@/lib/definitions';

export const getUser = async (userId: string) => {
	return await apiClient.get(`/user/${userId}`);
};

export const createUser = async (user: User) => {
	return await apiClient.post('/user', user);
};

export const replaceUser = async (user: User) => {
  return await apiClient.put(`/user/${user.id}`, user);
};

export const updateUser = async (user: Partial<User>) => {
  return await apiClient.patch(`/user/${user.id}`, user);
};

export const deleteUser = async (userId: string) => {
	return await apiClient.delete(`/user/${userId}`);
};

// implement dispatch to update global state
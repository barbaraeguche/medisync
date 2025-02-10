import { apiClient } from '../../utils/axios-config.ts';
import { User } from '../../lib/definitions.ts';

export const getUser = async (id: string) => {
	const endpoint = `/user/${id}`;
	
	return await apiClient.get(endpoint);
};

export const createUser = async (user: User) => {
	const endpoint = `/user`;
	
	return await apiClient.post(endpoint, user);
};

export const replaceUser = async (user: User) => {
	const endpoint = `/user/${user._id}`;
	
	return await apiClient.put(endpoint, user);
};

export const updateUser = async (path: string, user: User) => {
	const endpoint = `/user/${path}/${user._id}`;
	
	return await apiClient.patch(endpoint, user);
};

export const deleteUser = async (id: string) => {
	const endpoint = `/user/${id}`;
	
	return await apiClient.delete(endpoint);
};

// implement dispatch to update global states
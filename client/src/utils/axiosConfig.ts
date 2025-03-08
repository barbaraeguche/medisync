import axios, { AxiosInstance } from 'axios';

// use environment variable for flexibility
const backendUrl = import.meta.env.SPRING_BOOT_BACKEND_URL || 'http://localhost:8080';

export const apiClient: AxiosInstance = axios.create({
	baseURL: `${backendUrl}/api`,
	withCredentials: true, // ensure cookies are always sent with every request
	headers: {
		'Content-Type': 'application/json'
	}
});
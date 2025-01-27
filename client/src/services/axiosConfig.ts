import axios from 'axios';

// use environment variable for flexibility
const backendUrl = process.env.SPRING_BOOT_BACKEND_URL || 'http://localhost:8080';

export const apiClient = axios.create({
	baseURL: `${backendUrl}/api`,
	headers: {
		'Content-Type': 'application/json'
	}
});

apiClient.interceptors.request.use((config) => {
	const token = document.cookie
		.split('; ')
	  .find((key) => key.trim().startsWith('token'))
		?.split('=')[1];
	
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});
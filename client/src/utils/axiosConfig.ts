import axios, { AxiosInstance } from 'axios';
import { store } from '@/redux/store';
import { clearAuth } from '@/redux/slices/userSlice';

// use environment variable for flexibility
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const apiClient: AxiosInstance = axios.create({
	baseURL: `${backendUrl}/api/`,
	withCredentials: true, // important for cookies
	headers: {
		'Content-Type': 'application/json'
	}
});

// add an interceptor to ensure null values are properly transmitted
apiClient.interceptors.request.use(
	(config) => {
		// make sure config.data is defined and has a value
		if (config.data) {
			/*
			* convert javascript null values to JSON null values explicitly
			* this ensures null values aren't removed during serialization
			*/
			config.data = JSON.parse(JSON.stringify(config.data));
		}
		return config;
	}
);

// response interceptor for API calls
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// handle 401 (unauthorized) error
    if (error.response?.status === 401) {
			// dispatch logout action to clear auth state
			store.dispatch(clearAuth());
			
      // redirect to login page if not already there
			const directTo = '/auth/signin';
      const currentPath = window.location.pathname;
			
			if (!currentPath.includes(directTo)) {
				window.location.href = directTo;
			}
    }

		return Promise.reject(error);
	}
);
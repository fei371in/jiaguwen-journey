/// <reference types="vite/client" />
import axios from 'axios';

//const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
const API_URL = import.meta.env.VITE_API_URL || '/api/v1';
console.log("Using API URL:", API_URL);

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;

/// <reference types="vite/client" />
import axios from 'axios';

// Use environment variable or fallback to relative path which vercel.json rewrites to backend
const API_URL = import.meta.env.VITE_API_URL || '/api/v1';
console.log("Using API URL:", API_URL);

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to truncate password to 72 bytes
const truncatePassword = (password: string): string => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const bytes = encoder.encode(password);
    if (bytes.length <= 72) return password;
    return decoder.decode(bytes.slice(0, 72));
};

// Request interceptor to add token and truncate password if present
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Automatically truncate password field if it exists in the body
        if (config.data) {
            if (typeof config.data === 'string') {
                try {
                    const parsed = JSON.parse(config.data);
                    if (parsed.password) {
                        parsed.password = truncatePassword(parsed.password);
                        config.data = JSON.stringify(parsed);
                    }
                } catch (e) {
                    // Ignore parsing errors for non-JSON strings
                }
            } else if (typeof config.data === 'object' && config.data !== null) {
                if (config.data.password && typeof config.data.password === 'string') {
                    config.data.password = truncatePassword(config.data.password);
                }
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;

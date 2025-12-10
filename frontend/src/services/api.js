import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const getDataCategories = () => api.get('/data-categories');

export const getUserConsents = (userId) =>
    api.get(`/consents/${userId}`);

export const postUserConsent = (userId, dataCategory, newLevel) =>
    api.post(`/consents/${userId}`, { dataCategory, newLevel });

export const getUserHistory = (userId, params) =>
    api.get(`/consent-history/${userId}`, { params });

export const exportUserHistory = (userId) =>
    api.get(`/consent-history/${userId}/export`, {
        responseType: 'blob'
    });

export default api;

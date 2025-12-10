import api from './api';

export const authService = {
    signup: async (email, password) => {
        const response = await api.post('/auth/signup', { email, password });
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};

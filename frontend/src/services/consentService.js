import api from './api';

export const consentService = {
    getConsents: async () => {
        const response = await api.get('/consents');
        return response.data;
    },

    updateConsents: async (categories) => {
        const response = await api.put('/consents', { categories });
        return response.data;
    },

    getConsentHistory: async () => {
        const response = await api.get('/consents/history');
        return response.data;
    }
};

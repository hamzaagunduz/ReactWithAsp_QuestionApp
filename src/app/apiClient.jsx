// src/app/apiClient.jsx
import axios from 'axios';

export const baseURL = 'https://localhost:7172/api/';
export const imgUrl = 'https://localhost:7172/';
export const hubURL = 'https://localhost:7172'; // sadece base kısmı

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;

import axios from 'axios';

// API base URL'ini tanımlıyoruz
const apiClient = axios.create({
    baseURL: 'https://localhost:7172/api/',  // API base URL
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

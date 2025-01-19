import axios from 'axios';

// API base URL'ini tanımlıyoruz
const apiClient = axios.create({
    baseURL: 'https://localhost:7172/api/',  // API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;

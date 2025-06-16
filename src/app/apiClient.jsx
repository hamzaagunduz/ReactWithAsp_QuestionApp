// C:\Users\Hamza\Desktop\project\dob\src\app\apiClient.jsx
import axios from 'axios';

// Ortama göre URL'leri al
export const baseURL = import.meta.env.VITE_API_BASE_URL;
export const imgUrl = import.meta.env.VITE_IMAGE_URL;
export const hubURL = import.meta.env.VITE_HUB_URL;

// Axios instance oluştur
const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Token varsa ekle
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;

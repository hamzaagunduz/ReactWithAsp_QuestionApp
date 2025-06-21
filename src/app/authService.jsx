import apiClient from './apiClient.jsx';
import { jwtDecode } from 'jwt-decode';

export const login = async (userName, password) => {
    const response = await apiClient.post('AppUser/LoginToken', {
        userName,
        password
    });

    const token = response.data.token; // Backend token yapısına göre güncelle
    localStorage.setItem('token', token);

    // localStorage.setItem('userId', decoded.userId); // Opsiyonel

    return token;
};
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp && decoded.exp > currentTime;
    } catch (error) {
        return false;
    }
};

// Oturumu sonlandır
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};
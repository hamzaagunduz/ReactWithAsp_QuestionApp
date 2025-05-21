import apiClient from './apiClient.jsx';
import { jwtDecode } from 'jwt-decode';

export const login = async (userName, password) => {
    const response = await apiClient.post('AppUser/LoginToken', {
        userName,
        password
    });

    const token = response.data.token; // Backend token yapısına göre güncelle
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);

    localStorage.setItem('userId', decoded.userId); // Opsiyonel

    return token;
};

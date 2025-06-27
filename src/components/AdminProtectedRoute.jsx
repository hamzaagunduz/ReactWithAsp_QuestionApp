// src/components/AdminProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/login" />;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) return <Navigate to="/login" />;

        const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const isAdmin = Array.isArray(roles) ? roles.includes("Admin") : roles === "Admin";

        return isAdmin ? children : <Navigate to="/login" />;
    } catch (error) {
        return <Navigate to="/login" />;
    }
};

export default AdminProtectedRoute;

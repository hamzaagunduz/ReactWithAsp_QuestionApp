import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../app/authService';

const ProtectedRoute = ({ children }) => {
    return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

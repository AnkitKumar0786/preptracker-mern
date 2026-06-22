import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'

const ProtectedRoute = () => {

    const {user, loading} = useAuth();

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-medium">Loading your profile...</p>
            </div>
        );
    }
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute

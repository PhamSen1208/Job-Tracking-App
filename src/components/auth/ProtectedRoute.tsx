import { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated)
    {
        return <Navigate to ="/login" replace/>
    }
    return <>{children}</>
};

export default ProtectedRoute
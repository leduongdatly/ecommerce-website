import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/UserAuthContext";

const ProtectedUserRoute = ({ children }) => {

    let { currentUser } = useAuth();

    if (currentUser) {
        return <Navigate to="/" />
    }

    return children;
};

export default ProtectedUserRoute;
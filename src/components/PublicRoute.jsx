import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PublicRoute({ children }) {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (currentUser) {
        // Redirect them to the home page if they are logged in
        // Replace '/' with the path you want logged-in users to be redirected to
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children; // If not logged in, render the children components (login or register pages)
}



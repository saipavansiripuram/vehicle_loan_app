import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AdminNavbar from '../AdminComponents/AdminNavbar';
import UserNavbar from '../UserComponents/UserNavbar';
import ErrorPage from './ErrorPage';

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();
    if (!user) {
        return <Navigate to="/login" />;
    }
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (user.role.toLowerCase() !== 'admin' && isAdminRoute) {
      
        return <ErrorPage />;
    }

    return (
        <>
            {user.role.toLowerCase() === 'admin' ? <AdminNavbar /> : <UserNavbar />}
            {children}
        </>
    )
}

export default PrivateRoute
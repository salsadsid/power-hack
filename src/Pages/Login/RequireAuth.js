import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

const RequireAuth = ({ children }) => {
    const { isLoading, user, isError, error } = useSelector(state => state.auth)
    let location = useLocation();
    if (isLoading) {
        return <Loading></Loading>
    }
    if (!user.email) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children
};

export default RequireAuth;
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {getToken} from "../utilities/token";

const AlreadyLogin = () => {
    const isAuthenticated = !!getToken();
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AlreadyLogin;

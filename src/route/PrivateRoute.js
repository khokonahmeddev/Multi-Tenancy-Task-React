import React from 'react';
import {Navigate} from 'react-router-dom';
import {getToken} from "../utilities/token";

const PrivateRoute = ({element: Component, ...rest}) => {
    const isAuthenticated = !!getToken();
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/"/>;
};

export default PrivateRoute;

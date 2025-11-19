import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext);

    // user k jdi pai tobe se jekhane jete chay sekhane jao noyto login e fhire jao
    if(user){
        return children;
    }
    if(!user){
        <div className='text-center'>Loading.....</div>
        return  <Navigate to="/login"></Navigate>
    }
};

export default PrivateRoute;
import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);

    // user k jdi pai tobe se jekhane jete chay sekhane jao noyto login e fhire jao
    if(user){
        return children;
    }
    // if(!user){
    //     <div className='text-center'>Loading.....</div>
    //     return  <Navigate to="/login"></Navigate>
    // }
};

export default PrivateRoute;
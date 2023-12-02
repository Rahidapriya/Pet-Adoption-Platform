/* eslint-disable react/prop-types */
import  { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';



const PrivateRoute = ({children}) => {

    const {user,loading}=useContext(AuthContext);
    const location =useLocation();
    console.log(location);
    if(loading){
return <span className="loading loading-ring loading-lg"></span>
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
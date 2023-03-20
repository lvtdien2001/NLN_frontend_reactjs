
// import {Route, Navigate} from 'react-router-dom';
// import { useContext } from 'react';
// import {AuthContext} from '../../contexts/AuthContext';
// import Spinner from 'react-bootstrap/Spinner';


// import React from 'react'

// const ProtectedRoute = ({component: Component, ...rest}) => {
// const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);

//     if(authLoading) {
//         return (
//             <div className='spinner-container'>
//                 <Spinner animation='border' className='colorText' />
//             </div>
//         )
//     }

//   return (
//     <>
//     <Route {...rest} component={isAuthenticated ? (<>
//         <Component {...rest} />
//     </>) : (<Navigate to='/login' />)}  />

//     </>
//   )
// }

// export default ProtectedRoute



import { Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CustomSpinner from '../CustomSpinner';

import React from 'react'

const AdminRoute = ({children}) => {
const {authState: {authLoading, isAuthenticated, user}} = useContext(AuthContext);

    if(authLoading) {
        return (
            <div className='spinner-container'>
                <CustomSpinner />
            </div>
        )
    }
   
    if (!isAuthenticated) {
        return <Navigate to='/auth' />
    }

    if(!user.isAdmin) {
        return <Navigate to='/' />
    }

  return (
    <>
     {children}
    </>
   
  )
}

export default AdminRoute
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import CustomSpinner from '../../components/CustomSpinner';

import Login from '../../components/Login'
import { AuthContext } from '../../context/AuthContext'


function Auth() {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);
    let body;
    if(authLoading) {
        body = (
            <div className='d-flex justify-content-center mt-2'>
               <CustomSpinner />
            </div>
        )
    } else if (isAuthenticated) {
        return <Navigate to='/' />
    }
    return (
        <>
            {body}
            <Login />
        </>
    )
}

export default Auth

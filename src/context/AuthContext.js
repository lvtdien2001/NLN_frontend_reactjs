import {createContext, useReducer, useEffect, useState} from 'react';
import { SET_AUTH, UPDATE_USER_INFO, UPDATE_USER_IMAGE } from './constanst';
import axios from 'axios';

import { authReducer } from '../reducers/authReducer';
import setAuthToken from '../utils/setAuthToken';

import { API, LOCAL_STORAGE_TOKEN_NAME } from './constanst';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    });
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showUpdateAvatar, setShowUpdateAvatar] = useState(false);
   
    // Check Authenticate user
    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${API}/api/auth`)
            if(response.data.success) {
                dispatch({
                    type:SET_AUTH,
                    payload:{
                    isAuthenticated: true,
                    user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type:SET_AUTH,
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }


    useEffect(() => {
      loadUser();
    },[])

    // login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${API}/api/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)

            }

             await loadUser();
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else {
                return {success: false, message: error.message}
            }
        }
    }

    // register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${API}/api/auth/register`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)

            }

             await loadUser();
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else {
                return {success: false, message: error.message}
            }
        }
    }
    const logOutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        }
        )
    }
    
    const updateUser = async (updateUserForm) => {
        try {
            const response = await axios.put(`${API}/auth/${updateUserForm._id}`, updateUserForm);
            if (response.data.success) {
                dispatch({
                    type:UPDATE_USER_INFO,
                    payload:{
                    isAuthenticated: true,
                    user: response.data.info
                    }
                })
               return {success: true, message: response.data.message}

            }

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else {
                return {success: false, message: error.message}
            }
        }
    }

    const updateImage = async (updateUserForm, id) => {
        try {
            const response = await axios.put(`${API}/auth/image/${id}`, updateUserForm);
            if (response.data.success) {
                dispatch({
                    type:UPDATE_USER_IMAGE,
                    payload:{
                    isAuthenticated: true,
                    user: response.data.info
                    }
                })
               return {success: true, message: response.data.message}

            }

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else {
                return {success: false, message: error.message}
            }
        }
    }


    //context data
    const authContextData = {
        loginUser, authState, registerUser, logOutUser,
        updateUser,updateImage,
        showModalUpdateUser, setShowModalUpdateUser,
        showUpdateAvatar, setShowUpdateAvatar
    }


    // Return Provider
    return (
        <AuthContext.Provider value={
            authContextData
        }>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;
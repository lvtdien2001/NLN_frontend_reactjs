import {createContext, useReducer } from 'react';

import {detailReducer} from '../reducers';

import { API } from './constanst';

import axios from 'axios';

//const type
import { 
    DETAILS_LOADED_FAIL, DETAILS_LOADED_SUCCESS, CREATE_DETAIL_SUCCESS, DELETE_DETAIL_SUCCESS,
    UPDATE_DETAIL_SUCCESS
} from './constanst';

export const  DetailContext = createContext();


const DetailContextProvider = ({children}) => {
    
    const [detailState, dispatch] = useReducer(detailReducer, {
       detail: null,
       detailProducts: [],
       detailLoading: true
    });

    // Get all product    
    const getDetail = async (id) => {
        try {
            const response = await axios.get(`${API}/api/product/detail/${id}`)
            if (response.data.success) {
                dispatch({
                    type: DETAILS_LOADED_SUCCESS,
                    payload: response.data.detailProduct
                })
            }
        } catch (error) {
            dispatch({ type: DETAILS_LOADED_FAIL })
        }
    }
    
     // Create a product with multiples image
     const createNewDetail = async (newPost, id) => {
        try {
            const response = await axios.post(`${API}/api/product/detail/${id}`, newPost)
            if (response.data.success) {
                dispatch({
                    type: CREATE_DETAIL_SUCCESS,
                    payload: response.data.newDetail
                })
                return response.data
            }

        } catch (error) {
            return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
        }
    }
    // Delete a post
    const deleteDetail = async id => {
        try {
            const response = await axios.delete(`${API}/api/product/detail/${id}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_DETAIL_SUCCESS,
                    payload: id
                })
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
       
    }
    // Delete a post
    const updateDetail = async (data, id) => {
        try {
            const response = await axios.put(`${API}/api/product/detail/${id}`, data)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_DETAIL_SUCCESS,
                    payload: response.data.detailProduct
                })
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
       
    }

    
     
    
    

    // Detail Context Data
    const detailContextData = {
        detailState,
        dispatch,
        getDetail,
        createNewDetail,
        deleteDetail,
        updateDetail

      
    }


    return (
        <DetailContext.Provider value={detailContextData}>
            {children}
        </DetailContext.Provider>
    )
}

export default DetailContextProvider;



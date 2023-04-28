import {createContext, useReducer, useState } from 'react';

import {productReducer} from '../reducers';

import { API } from './constanst';

import axios from 'axios';

//const type
import { 
    PRODUCTS_LOADED_FAIL, PRODUCTS_LOADED_SUCCESS, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS
} from './constanst';

export const  ProductContext = createContext();


const ProductContextProvider = ({children}) => {
    // state
    // const {authState: {user}} = useContext(AuthContext)
    // page
    const [pageNumber, setPageNumber] = useState(1)
    const [call, setCall] = useState(false)
    const [productState, dispatch] = useReducer(productReducer, {
       product: null,
       products: [],
       productsLoading: true
    });

    // Get all product    
    const getProducts = async () => {
        try {
            const response = await axios.get(`${API}/api/product`)
            if (response.data.success) {
                dispatch({
                    type: PRODUCTS_LOADED_SUCCESS,
                    payload: response.data.allProducts
                })
            }
        } catch (error) {
            dispatch({ type: PRODUCTS_LOADED_FAIL })
        }
    }
    
     // Create a product with multiples image
     const createNewProduct = async (newPost, categoryID, productorID) => {
        try {
            const response = await axios.post(`${API}/api/product?category=${categoryID}&productor=${productorID}`, newPost)
            if (response.data.success) {
                dispatch({
                    type: CREATE_PRODUCT_SUCCESS,
                    payload: response.data.newProduct
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
    const deleteProduct = async id => {
        try {
            const response = await axios.delete(`${API}/api/product/${id}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_PRODUCT_SUCCESS,
                    payload: id
                })
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
       
    }
   


    //Update a product
    const updateProduct = async (data, id) => {
        try {
            const response = await axios.put(`${API}/api/product/${id}`, data)
            if (response.data.success) {
                dispatch({
                    type:UPDATE_PRODUCT_SUCCESS
                })
                return response.data
            }
        } catch (error) {
            return error.response.data
            ? error.response.data
            : { success: false, message: 'Server error' }
        }
    }
    
     
    
    

    // Post Context Data
    const productContextData = {
        productState,
        dispatch,
        getProducts,
        createNewProduct,
        deleteProduct,
        updateProduct,
        call, setCall,
        pageNumber, setPageNumber
      
    }


    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;



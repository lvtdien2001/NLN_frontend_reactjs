import {createContext, useReducer, useState } from 'react';

import {productReducer} from '../reducers';

import { API } from './constanst';

import axios from 'axios';

//const type
import { 
    PRODUCTS_LOADED_FAIL, PRODUCTS_LOADED_SUCCESS, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS
} from './constanst';

export const  ProductContext = createContext();


const ProductContextProvider = ({children}) => {
    // state
    // const {authState: {user}} = useContext(AuthContext)
    // page
    const [pageNumber, setPageNumber] = useState(1)
    const [productState, dispatch] = useReducer(productReducer, {
       product: null,
       products: [],
       productsLoading: true
    });

    // Get all product    
    const getProducts = async (currentPage) => {
        try {
            const response = await axios.get(`${API}/api/product?pageSize=2&page=${currentPage}`)
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
    const deleteProduct = async postId => {
        try {
            const response = await axios.delete(`${API}/api/posts/${postId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_PRODUCT_SUCCESS,
                    payload: postId
                })
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
       
    }
   


    // Update a post
    // const updatePost = async updatePost => {
    //     try {
    //         const response = await axios.put(`${API}/posts/${updatePost._id}`, updatePost)
    //         if (response.data.success) {
    //             dispatch({
    //                 type:UPDATE_POST_SUCCESS,
    //                 payload: response.data.post
    //             })
    //             return response.data
    //         }
    //     } catch (error) {
    //         return error.response.data
    //         ? error.response.data
    //         : { success: false, message: 'Server error' }
    //     }
    // }
    
     
    
    

    // Post Context Data
    const productContextData = {
        productState,
        dispatch,
        getProducts,
        createNewProduct,
        deleteProduct,


        pageNumber, setPageNumber
      
    }


    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;



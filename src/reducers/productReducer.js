import { 
    PRODUCTS_LOADED_FAIL,
    PRODUCTS_LOADED_SUCCESS,
    CREATE_PRODUCT_SUCCESS, 
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS
   
} from '../context/constanst';


const productReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case PRODUCTS_LOADED_SUCCESS:
             
            return {
                ...state,
               products: payload,
               productsLoading: false
            }
        case PRODUCTS_LOADED_FAIL:
             
            return {
                ...state,
                products: [],
                productsLoading: false
            }
      
        case CREATE_PRODUCT_SUCCESS:
             
            return {
                ...state,
                products: [...state.products, payload],
               
            }
        case  DELETE_PRODUCT_SUCCESS:
            //  const newPost = state.products;
            //  newPost.filter(post => post._id !== payload  )
            console.log(payload)
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload),
            }
        case  UPDATE_PRODUCT_SUCCESS:
                //  const newPost = state.products;
                //  newPost.filter(post => post._id !== payload  )
            return {
                ...state
            
            }    
        default:
            return state
    }
}

export default productReducer

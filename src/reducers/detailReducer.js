import { 
    DETAILS_LOADED_FAIL,
    DETAILS_LOADED_SUCCESS,
     CREATE_DETAIL_SUCCESS, 
     DELETE_DETAIL_SUCCESS
    
 } from '../context/constanst';
 
 
 const detailReducer = (state, action) => {
     const {type, payload} = action;
 
     switch (type) {
         case DETAILS_LOADED_SUCCESS:
              
             return {
                 ...state,
                detailProducts: payload,
                detailLoading: false
               
             }
         case DETAILS_LOADED_FAIL:
              
             return {
                 ...state,
                 detailProducts: [],
                 detailLoading: false
             }
       
         case CREATE_DETAIL_SUCCESS:
              
             return {
                 ...state,
                 detailProducts: [...state.detailProducts,payload],
                
             }
         case  DELETE_DETAIL_SUCCESS:
             //  const newPost = state.products;
             //  newPost.filter(post => post._id !== payload  )
             return {
                 ...state,
                 detailProducts: state.detailProducts.filter(detail => detail._id !== payload),
             }
        
         default:
             return state
     }
 }
 
 export default detailReducer
 
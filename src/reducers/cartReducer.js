import { 
    ADD_PRODUCT, REMOVE_PRODUCT, ADD_ALL_PRODUCT, REMOVE_ALL_PRODUCT, SET_TOTAL_AMOUNT, SET_PRODUCT_UPDATE 
} from "../context/constanst"

const initCartState = {
    selectAll: false,
    totalAmount: 0,
    productUpdate: null,
    products: []
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            }    
        case REMOVE_PRODUCT:
            const newProducts = [...state.products];
            newProducts.splice(action.payload, 1);
            return {
                ...state,
                products: newProducts
            }
        case ADD_ALL_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case REMOVE_ALL_PRODUCT:
            return {
                ...state,
                products: []
            }
        case SET_TOTAL_AMOUNT:
            let amounts = state.products.map(product => {
                const {quantity} = product;
                const {price} = product.detailProduct;
                return quantity*price;
            })
 
            let totalAmount = 0;
            for (let i=0; i<amounts.length; i++)
                totalAmount += amounts[i];
            return {
                ...state,
                totalAmount
            }
        case SET_PRODUCT_UPDATE:
            return {
                ...state,
                productUpdate: action.payload
            }
        default:
            throw new Error('Invalid action');
    }
}

export { initCartState }
export default cartReducer

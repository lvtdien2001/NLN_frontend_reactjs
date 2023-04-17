import {createContext, useState} from 'react';

const OrderContext = createContext();

const OrderContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    //context data
    const orderContextData = {
        products, setProducts, totalAmount, setTotalAmount
    }


    // Return Provider
    return (
        <OrderContext.Provider value={orderContextData} >
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext }
export default OrderContextProvider

import {createContext, useState} from 'react';

const OrderContext = createContext();

const OrderContextProvider = ({children}) => {
    const [ payMethod, setPayMethod ] = useState('Thanh toán trực tuyến');
    const [ products, setProducts ] = useState([]);
    const [password, setPassword] = useState('');

    //context data
    const orderContextData = {
        payMethod, setPayMethod, products, setProducts, password, setPassword
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

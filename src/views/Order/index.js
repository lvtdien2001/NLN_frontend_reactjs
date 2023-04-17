import { useState, useEffect } from 'react';

import CustomSpinner from '../../components/CustomSpinner';
import OrderList from '../../components/Order/OrderList';
import request from '../../utils/request';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            await request
                .get('/order')
                .then(res => {
                    if (res.data.success){
                        setOrders(res.data.orders);
                        setLoading(false);
                    }
                })
        }

        fetchApi();
    }, [])


    return (
        <>
            {loading ? <div className='text-center'><CustomSpinner /></div> : <OrderList data={orders} />}
        </>
    )
}

export default Order

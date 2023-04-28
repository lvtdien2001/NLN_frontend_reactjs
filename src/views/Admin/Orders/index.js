import { useEffect, useState } from 'react';

import OrdersTable from '../../../components/Admin/OrdersTable';
import CustomSpinner from '../../../components/CustomSpinner';
import Nav from '../../../components/Nav';
import request from '../../../utils/request';

function Orders() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const contentNav = [
        {
            id: 1,
            name: 'Quản lý đơn hàng',
            url: '#'
        }
    ]

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            await request
                .get('/order/all')
                .then(res => {
                    if (res.data.success){
                        setData(res.data.orders);
                        setLoading(false);
                    }
                })
        }
        fetchApi();
    }, [])

    return (
        <>
            <Nav content={contentNav} />
            <h3 style={{margin: '10px'}} className='text-center text-primary'>DANH SÁCH ĐƠN HÀNG</h3>
            {loading ? <CustomSpinner /> : <OrdersTable data={data} />}
        </>
    )
}

export default Orders

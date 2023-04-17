import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import OrderInfor from '../../components/Order/OrderInfor';
import CustomSpinner from '../../components/CustomSpinner';
import request from '../../utils/request';

const OrderDetail = () => {
    // const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState();

    const orderInforRef = useRef();

    const {id} = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            // setLoading(true);
            await request
                .get(`/order/${id}`)
                .then(res => {
                    if (res.data.success){
                        setOrder(res.data.bill);
                        // setLoading(false);
                    }
                })
        }

        fetchApi();
        
    }, [])

    return (
        <>
            {!order ? 
                <div className='text-center'><CustomSpinner /></div> : 
                <div>
                    <ReactToPrint
                        trigger={() => <button>Print this out!</button>}
                        content={() => orderInforRef.current}
                    />
                    {console.log(orderInforRef.current)}
                    <div ref={orderInforRef} >
                        <OrderInfor order={order} />
                    </div>
                </div>
            }
        </>
    )
}

export default OrderDetail

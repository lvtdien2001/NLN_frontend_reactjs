import { useEffect, useState } from 'react';
import request from '../../utils/request';
import CartDetailInfo from '../../components/Carts/CartDetailInfo';

const Cart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () =>{
            await request
                .get('/cart')
                .then((res) =>{
                    setData(res.data.cart)
                })
        }

        fetchApi();
    }, [])
    return (
        <>
            <CartDetailInfo data={data} />
        </>
    )
}

export default Cart

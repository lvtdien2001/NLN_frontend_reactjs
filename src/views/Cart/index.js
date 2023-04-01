import { useEffect, useState } from 'react';
import request from '../../utils/request';
import CartDetailInfo from '../../components/Carts/CartDetailInfo';
import CustomSpinner from '../../components/CustomSpinner';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () =>{
            setLoading(true);
            await request
                .get('/cart')
                .then((res) =>{
                    if (res.data.success){
                        setData(res.data.cart);
                        setLoading(false);
                    }
                })
        }

        fetchApi();
    }, [])
    return (
        <>
            { loading ? <div className='text-center'><CustomSpinner /></div> : <CartDetailInfo data={data} /> }
        </>
    )
}

export default Cart

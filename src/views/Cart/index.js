import { useEffect, useState } from 'react';
import request from '../../utils/request';
import CartDetailInfo from '../../components/Carts/CartDetailInfo';
import CustomSpinner from '../../components/CustomSpinner';
import Nav from '../../components/Nav';
import ProductSuggest from '../../components/ProductSuggest';

const Cart = () => {
    const [data, setData] = useState([]);
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(false);

    const contentNav = [
        {
            id: 1,
            name: 'GIỎ HÀNG',
            url: '/cart'
        }
    ]

    useEffect(() => {
        const fetchApi = async () =>{
            setLoading(true);
            await request
                .get('/cart')
                .then((res) =>{
                    if (res.data.success){
                        setData(res.data.cart);
                        setNames(res.data.names);
                        setLoading(false);
                    }
                })
        }

        fetchApi();
    }, [])

    return (
        <>
            <Nav content={contentNav} />
            { loading ? <div className='text-center'><CustomSpinner /></div> : <CartDetailInfo data={data} names={names} /> }
            <ProductSuggest />
        </>
    )
}

export default Cart

import classNames from 'classnames/bind';


import styles from './HotProducts.module.scss';
import { useEffect, useState } from 'react';

import request from '../../utils/request';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);


function HotProducts() {
    const [ hotProducts, setHotProducts] = useState([])
    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }
    
    useEffect(()=> {
        const getHotProduct = async () => {
            await request('/product/detail/hot/latest')
                    .then((res) => {
                        if(res.data.success) {
                            setHotProducts(res.data.hotProducts)
                        }
                    })
        }
        getHotProduct()
    }, [])

    const body = hotProducts.map((item) => 

        <Link key={item._id} to={`/product/${item.product}`} as='div' className={`${cx('items')} col-sm-5 col-xl-2`} >
            <img className={cx('item-image')} src={item.image} alt='img' width='230px' height='200px' />
            <div style={{fontWeight: '700'}} className='text-center text-danger'>{formatPrice(item?.price.toString())} đ</div>
            <div className={cx('item-hot')}>Nổi bật</div>
        </Link>
    )
    return (
        <div className={`${cx('wrapper')}`}>
            <b className={cx('title')}>SẢN PHẨM NỔI BẬT</b>
            <div as='div' className='row justify-content-around'>
              {body}
              
            </div>
        </div>
    )
}

export default HotProducts

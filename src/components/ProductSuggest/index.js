import { Card } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './ProductSuggest.module.scss';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductSuggest() {
    const [ suggestProducts, setSuggestProducts] = useState([])

    useEffect(()=> {
        const getSuggestProduct = async () => {
            await request('/product/detail/suggest/latest')
            .then((res) => {
                if(res.data.success) {
                    setSuggestProducts(res.data.suggestProduct)
                }
            })
        }
        getSuggestProduct()
    }, [])
    
    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }

    const body = suggestProducts.map((item) => (
            
            <Card key={item?._id} className={cx('card')}>
                 <Link to={`/product/${item.product}`} style={{textDecoration:'none'}} >
                    <Card.Img variant="top" className={cx('card-image')} src={item?.image} />
                    <Card.Body>
                        <Card.Title>{item?.name}</Card.Title>
                        <Card.Text>{console.log(item)}
                            <b className='text-danger'>{formatPrice(item?.price.toString())}đ</b><br/>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        
    ))

    return (
        <div className={`${cx('wrapper')}`}>
            <b className={cx('title')}>GỢI Ý</b>
            <div className={`row justify-content-around ${cx('content')}`}>
                {body}
            </div>
        </div>
    )
}

export default ProductSuggest

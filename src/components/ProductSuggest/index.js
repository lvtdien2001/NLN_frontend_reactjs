import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ProductSuggest.module.scss';
import CustomSpinner from '../CustomSpinner';
import request from '../../utils/request';

const cx = classNames.bind(styles);

function ProductSuggest() {
    const [suggestProducts, setSuggestProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const getSuggestProduct = async () => {
            setLoading(true);
            await request
                .get('/product/detail/suggest/latest')
                .then((res) => {
                    if(res.data.success) {
                        setSuggestProducts(res.data.suggestProducts);
                        setLoading(false);
                    }
                })
        }
        getSuggestProduct()
    }, [])
    
    // Format name
    // @desc Format name has length > 30 character
    // Ex: Dien thoai Samsung Galaxy S23 -> Dien thoai Samsung Gala...
    const formatName = name => {
        if (name.length <= 30)
            return name;
        return name.substring(0, 31) + '...'
    }

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
                 <Link to={`/product/${item.product._id}`} style={{textDecoration:'none'}} >
                    <Card.Img variant="top" className={cx('card-image')} src={item?.image} />
                    <Card.Body>
                        <Card.Title style={{height: '48px'}} >{formatName(item.product?.name)}</Card.Title>
                        <Card.Text>
                            <b className='text-danger'>{formatPrice(item?.price.toString())} đ</b><br/>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        
    ))

    return (
        <div className={`${cx('wrapper')}`}>
            <b className={cx('title')}>GỢI Ý</b>
            <div className={`row justify-content-around ${cx('content')}`}>
                {loading ? <CustomSpinner /> : body}
            </div>
        </div>
    )
}

export default ProductSuggest

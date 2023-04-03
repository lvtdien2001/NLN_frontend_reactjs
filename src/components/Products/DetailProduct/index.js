import React from 'react'

import { Card } from 'react-bootstrap'
import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';


const cx = classNames.bind(styles)

const DetailProduct = ({currentDetail}) => {
    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }
    const body = (
        <Card >
            <Card.Img variant="top" src={currentDetail?.image} />
            <Card.Body>
                <div>
                    {currentDetail?.size && <><span className={cx('detail-value')}>Size:</span> {currentDetail?.size}</> } 
                </div>
                <div>
                    <span className={cx('detail-value')}> Số lượng hiện tại :</span>  {currentDetail?.quantity}
                </div>
                <div>
                    <span className={cx('detail-value')}>  Giá hiện tại:</span> 
                    <span className={cx('detail-price')}>{formatPrice(currentDetail?.price.toString())} ₫</span>
                </div>
                <div>
                    <span className={cx('detail-value')}>Màu :</span>  {currentDetail?.color}
                </div>
            </Card.Body>
        </Card>
    )
  return (
    <div>
        
        {body}
    </div>
  )
}

export default DetailProduct
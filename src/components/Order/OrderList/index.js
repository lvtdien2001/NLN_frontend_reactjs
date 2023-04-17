import { useState } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './OrderList.module.scss';

const cx = classNames.bind(styles);

const OrderList = ({ data }) => {
    const [orders] = useState(data);
    const [title, setTitle] = useState({
        id: 1,
        content: 'Tất cả',
        quantity: 0
    });

    const titleList = [
        {
            id: 1,
            content: 'Tất cả',
            quantity: orders.length
        },
        {
            id: 2,
            content: 'Chờ xác nhận',
            quantity: orders.filter(order => order.status==='Chờ xác nhận').length
        },
        {
            id: 3,
            content: 'Chờ lấy hàng',
            quantity: orders.filter(order => order.status==='Chờ lấy hàng').length
        },
        {
            id: 4,
            content: 'Đang vận chuyển',
            quantity: orders.filter(order => order.status==='Đang vận chuyển').length
        },
        {
            id: 5,
            content: 'Đã nhận',
            quantity: orders.filter(order => order.status==='Đã nhận').length
        },
        {
            id: 6,
            content: 'Trả hàng',
            quantity: orders.filter(order => order.status==='Trả hàng').length
        },
        
    ]


    // Format price - Ex: 1000000 --> 1.000.000
    const formatPrice = price => {
    if (price.length <= 3)
        return price;

    let priceFormat = [];
    for (let i=price.length; i>0; i-=3)
        priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }

    const Heading = () => {
        return (
            <Row className={`align-items-center ${cx('title')}`}>
                {titleList.map(element => {
                    return (
                        <Col 
                            key={element.id} 
                            className={`
                                text-center 
                                ${cx('title-content')} 
                                ${title.id===element.id && cx('selected')}
                            `}
                            onClick={() => setTitle(element)}
                        >
                            {element.content} ({element.quantity})
                        </Col>
                    )
                })}
              
            </Row>
        )
    }

    const ListItems = () => {
        return (
            <>
                {orders.map((order) => {
                    const { totalAmount, createdAt, status, products } = order;
                    return (
                        <span key={order._id}>
                            {
                                (title.content === status || title.id===1) && 
                                <ListGroup.Item>
                                    {formatPrice(totalAmount.toString())}
                                    {createdAt.substring(0,10)}
                                    {status}
                                    {products.map((product, index) => {
                                        return <div key={index}>
                                            {product.name}({product.detail.color})
                                        </div>
                                    })}
                                </ListGroup.Item> 
                            }
                        </span>
                    )
                })}
            </>
        )
    }


    return (
        <div>
            <Heading />
            <ListGroup>
                <ListItems />
            </ListGroup>
        </div>
    )
}

export default OrderList

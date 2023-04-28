import { useState, useContext } from 'react';
import { ListGroup, Row, Col, Button, Tooltip, OverlayTrigger, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import TooltipDetail from '../TooltipDetail';
import RateModal from '../RateModal';
import ProductReturnModal from '../ProductReturnModal';
import styles from './OrderList.module.scss';
import request from '../../../utils/request';

import { MessageContext } from "../../../context/MessageContext";

const cx = classNames.bind(styles);

const OrderList = ({ data }) => {
    const [orders, setOrders] = useState(data);
    const [title, setTitle] = useState({
        id: 1,
        content: 'Tất cả',
        quantity: 0
    });

    const { setShowToast, setInforMessage} = useContext(MessageContext);

    const navigate = useNavigate();

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

    const handleClickOrder = (id) => {
        navigate(`/order/${id}`)
    }

    const handleClickRecieved = async (id) => {
        await request
            .put(`/order/${id}`, {
                status: 'Đã nhận'
            })
            .then(res => {
                if (res.data.success) {
                    setOrders(res.data.orders);
                    setShowToast(true);
                    setInforMessage({
                        type: 'success',
                        title: 'Cập nhật trạng thái đơn hàng thành công',
                        description: 'Cảm ơn quý khách đã ủng hộ'
                    })
                }
            })
    }

    const Heading = () => {
        return (
            <Row className={`align-items-center justify-content-center ${cx('title')}`}>
                <Col xl={10}>
                    <Row>
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
                </Col>
              
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
                                    <Row>
                                        <Col 
                                            className={`text-end ${cx('pointer', 'image')}`} 
                                            xl={2}
                                            onClick={() => handleClickOrder(order._id)}
                                        >
                                            <img width='120px' height='100px' src={products[0].detail.image} alt='Hinh anh' />
                                        </Col>
                                        <Col 
                                            xl={7}
                                        >
                                            <b className='text-primary'>{products[0].name}</b><br/>
                                            Ngày đặt hàng: {createdAt.substring(0,10)}<br/>
                                            Trạng thái đơn hàng: <b>{status}</b><br/>
                                            <b className='text-danger'>Tổng tiền: {formatPrice(totalAmount.toString())} đ</b>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center'>
                                        <Col 
                                            className={`text-secondary text-center ${cx('pointer')}`} 
                                            xl={2}
                                            onClick={() => handleClickOrder(order._id)}
                                        >
                                            {products.length} sản phẩm
                                        </Col>
                                        <Col
                                            xl={3}
                                            className={`text-secondary ${cx('pointer', 'detailOrder')}`}
                                            onClick={() => handleClickOrder(order._id)}
                                        >
                                            <TooltipDetail order={order} />     
                                        </Col>
                                        <Col className={`text-end`} >
                                            {status==='Đã nhận' || status==='Trả hàng' ? 
                                            <>
                                                <ProductReturnModal orders={orders} status={status} orderId={order._id} setOrders={setOrders} />
                                                <RateModal products={order.products} status={status} /> 
                                            </> : 
                                            <Button 
                                                onClick={() => handleClickRecieved(order._id)}
                                                disabled={status!=='Đang vận chuyển'}
                                            >
                                                Đã nhận được hàng
                                            </Button>}
                                        </Col>
                                    </Row>
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
            <ListGroup className={cx('wrapper')} >
                <Row className='justify-content-center'>
                    <Col xl={10}>
                        <ListItems />
                    </Col>
                </Row>
            </ListGroup>
        </div>
    )
}

export default OrderList

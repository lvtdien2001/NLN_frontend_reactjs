import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './OrderInfor.module.scss';

const cx=classNames.bind(styles)

const OrderInfor = ({ order }) => {
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
            <>

                <Row><b>THIẾT BỊ LINH KIỆN CÔNG NGHỆ DKT</b></Row>
                <Row style={{padding: '0px 12px'}}>Số 116, 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</Row>
                <Row style={{padding: '0px 12px'}}>Hotline: 0912 923 022</Row>
                <h3 className={cx('title')}>ĐƠN HÀNG</h3>
        
            
                <b>Mã đơn hàng:</b> {order._id}<br/>
                <b>Thời gian đặt hàng:</b> {order.createdAt}<br/>
                {order.isPayment && <><b>Thời gian thanh toán:</b> {order.createdAt}</>}<br/>
                <b>Khách hàng:</b> {order.fullName}<br/>
                <b>Số điện thoại:</b> {order.phoneNumber}<br/>
                <b>Địa chỉ giao hàng:</b> {`${order.description}, ${order.ward}, ${order.district}, ${order.province}`} 
                
            </>
        )
    }

    const Body = () => {
        return (
            <div className={cx('body')}>
                <Row className='text-center'>
                    <Col xl={1}><b>TT</b></Col>
                    <Col xl={4}><b>Tên sản phẩm</b></Col>
                    <Col xl={2}><b>Màu sắc</b></Col>
                    <Col xl={1}><b>SL</b></Col>
                    <Col xl={2}><b>Đơn giá</b></Col>
                    <Col xl={2}><b>Thành tiền</b></Col>
                </Row>
                {order.products.map((product, index) => {
                    const { price, quantity, detail, name } = product;
                    const { color } = detail;
                    const amount = price*quantity;
                    return (
                        <Row className={`${cx('rowBody')} align-items-center`} key={index} >
                            <Col className='text-center' xl={1}>{index+1}</Col>
                            <Col xl={4}>{name}</Col>
                            <Col className='text-center' xl={2}>{color}</Col>
                            <Col className='text-center' xl={1}>{quantity}</Col>
                            <Col className='text-center' xl={2}>{formatPrice(price.toString())} đ</Col>
                            <Col className='text-center' xl={2}>{formatPrice(amount.toString())} đ</Col>
                        </Row>
                    )
                })}
                <p className={`text-end ${cx('totalAmount')}`}>
                    <b>Tổng thanh toán ({order.products.length} sản phẩm): </b> 
                    {formatPrice(order.totalAmount.toString())} đ 
                    <i>{order.isPayment ? <> (Đã thanh toán)</> : <> (Thanh toán khi nhận hàng)</>}</i>
                </p>
                
            </div>
        )
    }

    return (
        order && 
        <Row className={`justify-content-center`}>  
            <Col className={`${cx('wrapper')}`} xl={9}>
                <Heading />
                <Body />
            </Col>
        </Row>
    )
}

export default OrderInfor


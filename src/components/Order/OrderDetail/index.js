import { useContext } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { OrderContext } from '../../../context/OrderContext';
import styles from './OrderDetail.module.scss';

const cx=classNames.bind(styles)

const OrderDetail = ({ totalAmount, products, inforUser }) => {
    const { payMethod, setPayMethod } = useContext(OrderContext);

    const date = new Date();

    // Format price - Ex: 1000000 --> 1.000.000
    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }

    return (
        <>
            <div>
                <b>THIẾT BỊ LINH KIỆN CÔNG NGHỆ DKT</b>
                <br/>Số 116, 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
                <br/>Hotline: 0912 923 022
                <div className={cx('title')} >
                    <h4>ĐƠN HÀNG</h4>
                    Thời gian: {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${date.toLocaleTimeString()}`}
                </div>
            </div>
            <div>
                <p>Khách hàng: {inforUser.fullName} </p>
                <p>Địa chỉ: {`${inforUser.description}, ${inforUser.ward}, ${inforUser.district}, ${inforUser.province}`} </p>
                <p>Số điện thoại: {inforUser.phoneNumber}</p>
            </div>
            <div className={cx('body')}>
                <Row className='text-center'>
                    <Col xl={1}>TT</Col>
                    <Col xl={4}>Tên sản phẩm</Col>
                    <Col xl={2}>Màu sắc</Col>
                    <Col xl={1}>SL</Col>
                    <Col xl={2}>Đơn giá</Col>
                    <Col xl={2}>Thành tiền</Col>
                </Row>
                {products.map((product, index) => {
                    const { name, price, quantity, color } = product;
                    const amout = price*quantity;
                    return (
                        <Row className={`${cx('rowBody')} align-items-center`} key={index} >
                            <Col className='text-center' xl={1}>{index+1}</Col>
                            <Col xl={4}>{name}</Col>
                            <Col className='text-center' xl={2}>{color}</Col>
                            <Col className='text-center' xl={1}>{quantity}</Col>
                            <Col className='text-center' xl={2}>{formatPrice(price.toString())} đ</Col>
                            <Col className='text-center' xl={2}>{formatPrice(amout.toString())}đ</Col>
                        </Row>
                    )
                })}
                <p className={`text-end ${cx('totalAmount')}`}><b>Tổng số tiền:</b> {formatPrice(totalAmount.toString())} đ</p>
                <div className={`text-start ${cx('totalAmount')}`}>
                    <Row className='align-items-center'>
                        <Col className='text-end'><b>Phương thức thanh toán: </b></Col>
                        <Col>
                            <Form.Select 
                                value={payMethod} 
                                className={cx('select')}
                                onChange={(e) => setPayMethod(e.target.value)}
                            >
                                <option value='Thanh toán trực tuyến'>Thanh toán trực tuyến</option>
                                <option value='Thanh toán khi nhận hàng'>Thanh toán khi nhận hàng</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default OrderDetail

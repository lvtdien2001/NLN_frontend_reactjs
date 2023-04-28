
import { Table, Row, Col } from 'react-bootstrap';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import classNames from 'classnames/bind';
import moment from 'moment';
import 'moment/locale/vi';

import styles from './OrderDetailInfor.module.scss';

const cx=classNames.bind(styles);

const OrderDetailInfor = ({order}) => {

    // Format price - Ex: 1000000 --> 1.000.000
    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }

    const OrderStatus = () => {
        return (
            <div className={`${cx('status')} justify-content-center`}>
                <div className='d-flex justify-content-center'>
                    <div className='align-items-center d-flex'>
                        <AiFillCheckCircle />
                    </div>

                    <div className='d-flex align-items-center'>
                        <div className={`${cx('statusLine')} ${order?.status!=='Chờ xác nhận' ? 'bg-primary' : 'bg-secondary'}`}></div>
                        {order?.status!=='Chờ xác nhận' ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                    </div>

                    <div className='d-flex align-items-center'>
                        <div className={`${cx('statusLine')} ${(order?.status!=='Chờ xác nhận'&&order?.status!=='Chờ lấy hàng') ? 'bg-primary' : 'bg-secondary'}`}></div>
                        {(order?.status!=='Chờ xác nhận'&&order?.status!=='Chờ lấy hàng') ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                    </div>

                    <div className={`d-flex align-items-center`}>
                        <div className={`${cx('statusLine')} ${(order?.status==='Đã nhận'||order?.status==='Trả hàng') ? 'bg-primary' : 'bg-secondary'}`}></div>
                        {(order?.status==='Đã nhận'||order?.status==='Trả hàng') ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                    </div>

                    <div className='d-flex align-items-center'>
                        <div className={`${cx('statusLine')} ${order?.status==='Trả hàng' ? 'bg-primary' : 'bg-secondary'}`}></div>
                        {order?.status==='Trả hàng' ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                    </div>
                </div>
                <div className='text-dark d-flex'>
                    <div style={{width: '130px'}} ></div>
                    <div>
                        <b>Chờ xác nhận</b> 
                    </div>
                    <div style={{width: '80px'}} ></div>
                    <div>
                        <b>Chờ lấy hàng</b> 
                    </div>
                    <div style={{width: '70px'}} ></div>
                    <div>
                        <b>Đang vận chuyển</b> 
                    </div>
                    <div style={{width: '80px'}} ></div>
                    <div>
                        <b>Đã nhận</b> 
                    </div>
                    <div style={{width: '115px'}} ></div>
                    <div>
                        <b>Trả hàng</b> 
                    </div>
                </div>
            </div>
        )
    }

    const Information = () => {
        return (
            <div>
                <p><b>Khách hàng: </b>{order?.fullName}</p>
                <p><b>Điện thoại: </b>{order?.phoneNumber}</p>
                <p><b>Thời gian đặt hàng: </b>{moment(order?.createdAt).format('llll')}</p>
                <p>
                    <b>Trạng thái đơn hàng: </b>
                    {order?.status==='Trả hàng' ? 
                        (!(order?.returnOrder.isChecked) ?
                        <span className='text-danger'>Yêu cầu trả hàng (đang chờ duyệt)</span> :
                        <span className='text-danger'>Yêu cầu trả hàng (đã duyệt)</span>) :
                    order?.status
                    }
                </p>
                <p><b>Địa chỉ nhận hàng: </b>{`${order?.description}, ${order?.ward}, ${order?.district}, ${order?.province}`}</p>
            </div>
        )
    }

    const Body = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th>SL</th>
                        <th>Đơn Giá</th>
                        <th>Thành Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.products.map((product, index) => {
                        // const {detail, name, quantity} = product;
                        const detail = product?.detail;
                        const name = product?.name;
                        const quantity = product?.quantity;
                        const price = product?.price;

                        // const {color, price, image} = detail;
                        const color = detail?.color;
                        const image = detail?.image;

                        const amount = price*quantity;

                        return (
                            <tr key={product._id}>
                                <td className='text-center'><b>{index + 1}</b></td>
                                <td>
                                    <Row style={{width: '700px'}}>
                                        <Col xl={2}><img src={image} alt='Hinh anh' width='100px' height='70px' /></Col>
                                        <Col className='text-primary'>
                                            <b>{name}</b>
                                            <p className='text-secondary'>Màu: {color}</p>
                                        </Col>
                                    </Row>
                                </td>
                                <td className='text-center'>{quantity}</td>
                                <td className='text-center'>
                                    {price && formatPrice(price?.toString())} đ
                                </td>
                                <td className='text-center'>
                                    <b>{amount && formatPrice(amount?.toString())} đ</b>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    const ReturnOrder = () => {
        return (
            <Row className={`${cx('wrapperReturn')} justify-content-center`}>
                <h3 className='text-danger text-center'>Yêu cầu trả hàng </h3>
                <Col xl={8}>
                    <Table bordered responsive hover striped>
                        <thead>
                            <tr className='text-center'>
                                <th>Lý do trả hàng</th>
                                <th>Hình ảnh minh họa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <b>{order.returnOrder.reason}</b>
                                </td>
                                <td className='text-center'>
                                    <img className={cx('imageReturn')} src={order.returnOrder.image} alt='Hinh anh' />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
        )
    }

    return (
        <>
            <h4 className={`text-center text-primary`}>CHI TIẾT ĐƠN HÀNG</h4>
            <OrderStatus />
            <Information />
            <Body />
            <p className='text-end'>
                <b>Phương thức thanh toán: </b>
                {order?.paymentMethod}<br/>
                <b className='text-danger'>
                    Tổng thanh toán: {order && formatPrice(order.totalAmount.toString())} đ
                </b>
                {order?.isPayment && <>&nbsp;(Đã thanh toán)</>}
            </p>
            {order?.status === 'Trả hàng' && <ReturnOrder />}
        </>    
            
    )
}

export default OrderDetailInfor

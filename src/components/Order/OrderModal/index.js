import { useState, useContext } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import request from '../../../utils/request';
import { MessageContext } from "../../../context/MessageContext";
import { AuthContext } from '../../../context/AuthContext';
import styles from './OrderModal.module.scss';

const cx = classNames.bind(styles);

const OrderModal = ({totalAmount, paymentUrl, products}) => {
    const [payMethod, setPayMethod] = useState('');
    const [show, setShow] = useState(false);
    const { setShowToast, setInforMessage} = useContext(MessageContext);
    const { authState: {user} } = useContext(AuthContext);

    const navigate = useNavigate();

    // const { phoneNumber, fullName, province, district, ward, description } = user.address
    const phoneNumber = user.address?.phoneNumber;
    const fullName = user.address?.fullName;
    const province = user.address?.province;
    const district = user.address?.district;
    const ward = user.address?.ward;
    const description = user.address?.description;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkOrder = () => {
        if (totalAmount===0){
            setShowToast(true);
            setInforMessage({
                type:'danger', 
                title: 'Mua hàng không thành công', 
                description:'Bạn chưa chọn sản phẩm'
            });
            setShow(false)
        }
    }

    const handlePayment = async () => {
        if (payMethod==='Thanh toán trực tuyến' && user.address!==undefined){
            // let details = [];
            // products.forEach(product => {
            //     const { detailProduct, quantity } = product;
            //     details.push({
            //         detail: detailProduct._id,
            //         price: detailProduct.price,
            //         quantity
            //     })
            // })
            // await request
            //     .post('/order', {
            //         products: details,
            //         totalAmount,
            //         paymentMethod: payMethod,
            //         phoneNumber,
            //         fullName,
            //         province,
            //         district,
            //         ward,
            //         description
            //     })
            //     .then(res => {
            //         if (res.data.success){
            //             localStorage.setItem('orderId', res.data.bill._id);
            //             
            //         }
            //     })

            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('totalAmount', totalAmount);
            localStorage.setItem('paymentMethod', payMethod);
            localStorage.setItem('phoneNumber', phoneNumber);
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('province', province);
            localStorage.setItem('district', district);
            localStorage.setItem('ward', ward);
            localStorage.setItem('description', description);

            window.location.href = paymentUrl;
        }
        else if (payMethod==='Thanh toán khi nhận hàng' && user.address!==undefined){
            let details = [];
            let orderId;
            products.forEach(product => {
                const { detailProduct, quantity } = product;
                details.push({
                    detail: detailProduct._id,
                    price: detailProduct.price,
                    quantity
                })
            })
            await request
                .post('/order', {
                    products: details,
                    totalAmount,
                    paymentMethod: payMethod,
                    phoneNumber,
                    fullName,
                    province,
                    district,
                    ward,
                    description
                })
                .then(res => {
                    orderId = res.data.bill._id
                })
            for (let i=0; i<products.length; i++){
                await request.delete(`/cart/${products[i]._id}`)
            }
            navigate(`/order/${orderId}`);
        }
        else if (user.address===undefined){
            setShowToast(true);
            setInforMessage({
                type:'danger', 
                title: 'Lỗi rồi!!', 
                description:'Bạn chưa cập nhật địa chỉ nhận hàng'
            });
        }
        else{
            setShowToast(true);
            setInforMessage({
                type:'danger', 
                title: 'Lỗi rồi!!', 
                description:'Bạn chưa chọn phương thức thanh toán'
            });
        }
    }

    const ModalPaymentMethod = () => {
        return (
            <>
                <Button
                    className={`${cx('btnOrder')}`}
                    variant='light'
                    size='lg'
                    onClick={handleShow}
                >
                    Mua hàng
                </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    fullscreen='sm-down'
                    scrollable
                    onEnter={checkOrder}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Chọn phương thức thanh toán</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onChange={(e) =>setPayMethod(e.target.value)} >
                            <Row>
                                <Col>
                                    <Form.Check type='radio' id='inline-radio-1'>
                                        <Form.Check.Input
                                            defaultChecked={payMethod==='Thanh toán trực tuyến'}
                                            value='Thanh toán trực tuyến'
                                            name='payMethod'
                                            type='radio'
                                        />
                                        <Form.Check.Label>Thanh toán trực tuyến</Form.Check.Label>
                                    </Form.Check>
                                </Col>
                                <Col>
                                    <Form.Check type='radio' id='inline-radio-2'>
                                        <Form.Check.Input
                                            defaultChecked={payMethod==='Thanh toán khi nhận hàng'}
                                            value='Thanh toán khi nhận hàng'
                                            name='payMethod'
                                            type='radio'
                                        />
                                        <Form.Check.Label>Thanh toán khi nhận hàng</Form.Check.Label>
                                    </Form.Check>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className='justify-content-center'>
                        <Button
                            className={`${cx('btnOrder')}`}
                            variant="light"
                            onClick={handlePayment}
                            size='lg'
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return (
        <>
            <ModalPaymentMethod />
        </>
    );
}

export default  OrderModal

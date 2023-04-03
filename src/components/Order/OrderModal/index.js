import { useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import request from '../../../utils/request';
import { MessageContext } from "../../../context/MessageContext";
import { OrderContext } from '../../../context/OrderContext';
import { AuthContext } from '../../../context/AuthContext';
import OrderDetail from '../OrderDetail'
import styles from './OrderModal.module.scss';

const cx = classNames.bind(styles);

const OrderModal = ({totalAmount, products}) => {
    
    const [show, setShow] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const { setShowToast, setInforMessage} = useContext(MessageContext);
    const { authState: {user} } = useContext(AuthContext);
    const { payMethod, password, setPassword } = useContext(OrderContext);

    const { phoneNumber, fullName, province, district, ward, description } = user.address

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

    const handleOrder = async () => {
        if (payMethod==='Thanh toán trực tuyến'){
            setShow(false);
            setShowPayment(true);
            setPassword('');
        }
        else if (payMethod==='Thanh toán khi nhận hàng'){
            let details = [];
            products.forEach(product => {
                const { detailProductId, quantity, price } = product;
                details.push({
                    detail: detailProductId,
                    price,
                    quantity
                })
            })
            
            await request
                .post('/order', {
                    payMethod,
                    products: details,
                    phoneNumber,
                    fullName,
                    province,
                    district,
                    ward,
                    description
                })
                .then((res) => {
                    console.log(res.data);
                })
            setShowToast(true);
            setInforMessage({
                type:'success', 
                title: 'Thông báo', 
                description:'Đặt hàng thành công'
            });
            setShow(false);
        }
        else console.log(payMethod)
    }

    const handlePayment = async () => {
        let details = [];
        products.forEach(product => {
            const { detailProductId, quantity, price } = product;
            details.push({
                detail: detailProductId,
                price,
                quantity
            })
        })

        let successPayment = false;
        await request
            .put('/payment/money', {
                money: totalAmount,
                password
            })
            .then((res) => {
                
                    setShowToast(true);
                    setInforMessage({
                        type:'danger', 
                        title: 'Thanh toán thất bại', 
                        description:'Mậu khẩu ví không chính xác'
                    });
                
                successPayment = res.data.success
            })

        if (successPayment){
            await request
                .post('/order', {
                    payMethod,
                    isPayment: true,
                    products: details,
                    phoneNumber,
                    fullName,
                    province,
                    district,
                    ward,
                    description
                })
                .then((res) => {
                    console.log(res.data);
                })
            setShowToast(true);
            setInforMessage({
                type:'success', 
                title: 'Thông báo', 
                description:'Đặt hàng thành công'
            });
            setShowPayment(false);
        }
        await request
            .post('/order', {
                payMethod,
                isPayment: true,
                products: details,
                phoneNumber,
                fullName,
                province,
                district,
                ward,
                description
            })
            .then((res) => {
                console.log(res.data);
            })
            setShowToast(true);
            setInforMessage({
                type:'success', 
                title: 'Thông báo', 
                description:'Đặt hàng thành công'
            });
            setShow(false);
    }

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
                scrollable size='lg' 
                onEnter={checkOrder}
            >
                <Modal.Body>
                    <OrderDetail inforUser={user.address} totalAmount={totalAmount} products={products} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className={`${cx('btnOrder')}`} variant="light" onClick={handleOrder}>
                        Đặt hàng
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={showPayment} 
                onHide={() => setShowPayment(false)} 
                fullscreen='sm-down' 
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Nhập mật khẩu ví của bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control autoFocus value={password} onChange={(e) => setPassword(e.target.value)} type="password"></Form.Control>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handlePayment}>
                        Gửi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default  OrderModal

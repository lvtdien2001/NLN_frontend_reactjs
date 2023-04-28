import { useState, useRef, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import ReactToPrint from 'react-to-print';

import CustomSpinner from '../../CustomSpinner';
import { MessageContext } from '../../../context/MessageContext';
import { OrderContext } from '../../../context/OrderContext';
import request from '../../../utils/request';
import OrderPrintPDF from '../../Order/OrderPrintPDF';
import OrderDetailInfor from '../../Order/OrderDetailInfor';
import styles from './OrderDetail.module.scss';

const cx=classNames.bind(styles);

function OrderDetail({ order }) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setShowToast, setInforMessage } = useContext(MessageContext);
    const { setAllOrders, allOrders } = useContext(OrderContext);

    const orderInforRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCheckOrder = () => {
        const fetchApi = async () => {
            setLoading(true);
            await request
                .put(`/order/${order._id}`, {
                    status: 'Chờ lấy hàng'
                })
                .then(res => {
                    if (res.data.success) {
                        setShowToast(true);
                        setInforMessage({
                            type: 'success',
                            title: 'Thông báo',
                            description: 'Duyệt thành công'
                        })
                        setAllOrders(allOrders.map(element => order._id === element._id ? res.data.updateOrder : element));
                        setLoading(false);
                    }
                })
        }
        fetchApi();
    }

    const handleReturnOrder = () => {
        const fetchApi = async () => {
            setLoading(true);
            await request
                .put(`/order/return/${order._id}`)
                .then(res => {
                    if (res.data.success) {
                        setShowToast(true);
                        setInforMessage({
                            type: 'success',
                            title: 'Thông báo',
                            description: 'Duyệt thành công'
                        })
                        setAllOrders(allOrders.map(element => order._id === element._id ? res.data.order : element));
                        setLoading(false);
                    }
                })
        }
        fetchApi();
    }

    return (
        <>
            <div 
                className={cx('detailBtn')}
                variant='primary'
                onClick={handleShow}
            >
                Xem chi tiết
            </div>

            <div className={!show ? cx('printHide') : ''} ref={orderInforRef} >
                <OrderPrintPDF order={order} />
            </div>

            <Modal 
                show={show} 
                onHide={handleClose} 
                size='xl'
                scrollable
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <OrderDetailInfor order={order} />
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    {order.status==='Chờ xác nhận' && 
                        (loading ? <CustomSpinner /> :
                        <Button onClick={handleCheckOrder} variant='outline-success' size='lg'>
                            Duyệt
                        </Button>)
                    }
                    {order.status === 'Trả hàng' && !(order.returnOrder.isChecked) &&
                        (loading ? <CustomSpinner /> : 
                        <Button onClick={handleReturnOrder} variant='outline-success' size='lg'>
                            Duyệt
                        </Button>)
                    }
                    <ReactToPrint
                        trigger={() => 
                            <Button variant='outline-success' size='lg'>
                                In hóa đơn
                            </Button>
                        }
                        content={() => orderInforRef.current}
                    />
                    <Button variant="outline-danger" size='lg' onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrderDetail

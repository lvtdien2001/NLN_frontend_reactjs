import { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Figure } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { productsList } from '../productsList';
import styles from './OrderDetail.module.scss';

const cx=classNames.bind(styles);

function OrderDetail({ statusOrder, orderProducts, orderID }) {
    const [show, setShow] = useState(false);
    const [hidden, setHidden] = useState(true);

    const productDetails = productsList.filter(product => {
        const ids = orderProducts.map(orderProduct => orderProduct.id);
        return ids.includes(product.id);
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (statusOrder===3 || statusOrder===4){
            setHidden(false);
        }
        else {
            setHidden(true);
        }
    }, [statusOrder]);

    return (
        <>
            <div 
                className={cx('detailBtn')}
                variant='primary'
                onClick={handleShow}
            >
                Xem chi tiết
            </div>

            <Modal 
                show={show} 
                onHide={handleClose} 
                size='md'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <b>Mã đơn hàng:</b> {orderID}
                        <br/><b>Trạng thái:</b> Yêu cầu trả hàng
                        <br/><b>Khách hàng:</b> user1
                        <br/><b>Địa chỉ:</b> số 18, Trần Hưng Đạo, Ninh Kiều, Cần Thơ
                        <br/><b>Thời gian đặt hàng:</b> 01-01-2023 10:03
                        <br/><b>Thời gian nhận hàng:</b> 03-01-2023 14:09
                        <br/><b>Thời gian yêu cầu trả hàng:</b> 03-01-2023 19:09
                        <br/><b>Lý do:</b> Màu sản phẩm không giống với hình ảnh quảng cáo 
                    </div>
                    <div>
                        <b>Nội dung:</b><br/>
                        <ListGroup>
                            {productDetails.map(product => {
                                return (
                                    <ListGroup.Item key={product.id} className='d-flex'>
                                        <div>
                                            <Figure.Image
                                                width={100}
                                                height={100}
                                                alt="171x180"
                                                src={product.images[0].image}
                                            />
                                        </div>
                                        <div className={cx('content')}>
                                            {product.name}
                                            <div className={`row justify-content-end`}>{/*error*/}
                                                <div className={`${cx('price')} col`}>
                                                    <br/>{product.price}.000 đ
                                                    <br/>x1
                                                    <br/>Màu sắc: xanh
                                                </div>
                                            </div> 
                                        </div>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                        <div className={`${cx('totalAmount')} text-end`}>Thành tiền: 1.000.000 đ</div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer hidden={hidden}>
                    <Button variant="primary" onClick={handleClose}>
                        Duyệt
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Không Duyệt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrderDetail

import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ModalCart.module.scss';
import request from '../../../utils/request';
import { MessageContext } from '../../../context/MessageContext';

const cx=classNames.bind(styles);
function ModalCart({allDetail}){
    const {setShowToast, setInforMessage} = useContext(MessageContext)
    const [show, setShow] = useState(false);
    const [currentDetail, setCurrentDetail] = useState(allDetail[0]);
    const [data, setData] = useState({
        quantity: 1
    })
    const {quantity} = data;
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeCurrentDetail = (detail) => {
        setCurrentDetail(detail)
    }

    const detail = allDetail.map(detail => (
        <div key={detail._id} className={detail._id !== currentDetail._id ? cx('layout-detail') : cx('layout-active') }  onClick={() => handleChangeCurrentDetail(detail)}>
            <img className={cx('detail-image')} src={detail.image} alt='avatar'/>
            <div>{detail.color}</div>
            <div>{detail.size}</div>
        </div>
    ))

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.quantity > currentDetail.quantity){
            setShowToast(true);
            setInforMessage({
                type:'danger',
                title:'Lỗi rồi!!!',
                description: `Sản phẩm này chỉ còn lại ${currentDetail.quantity}`
            });
            return;
        }

        try {
           await request.post(`/cart/${currentDetail._id}`, data)
                    .then((res) => {
                        if(res.data.success) {
                            setShowToast(true);
                            setInforMessage({
                                type:'success',
                                title:'Thông báo',
                                description:'Thêm vào giỏ hàng thành công'
                            });
                            handleClose();
                            setData({
                                quantity:1
                            })
                        }
                    })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button variant="outline-success" size='lg' onClick={handleShow}>
                Đặt hàng
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm vào giỏ hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className={cx('detail')}>

                            {detail}
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label><b>Số lượng:</b></Form.Label>
                            <Form.Control 
                                type="number" 
                                name='quantity'
                                value={quantity}
                                onChange={(e) => setData({quantity: parseInt(e.target.value)})} 
                            /> 
                        </Form.Group>
                        <Form.Group className='text-center'>
                            <Button variant="outline-success" type='submit' size='lg'>
                                Xác nhận
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                
            </Modal>
        </>
    )
}

export default ModalCart

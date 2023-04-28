import { useContext, useState } from 'react';
import { Button, Modal, Form, Row, Col, Figure } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './EditDetail.module.scss';

import { MessageContext } from '../../../context/MessageContext';
import { DetailContext } from '../../../context/DetailContext';
import { ProductContext } from '../../../context/ProductContext';

const cx = classNames.bind(styles);

function EditDetail({ data }) {
    const {setCall, call} = useContext(ProductContext)
    const {updateDetail} = useContext(DetailContext)
    const {setShowToast, setInforMessage} = useContext(MessageContext)
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState(data.price);
    const [quantity, setQuantity] = useState(1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdate = async (data, id) => {
        const res = await updateDetail(data, id)
        if(res.success) {
            setShowToast(true)
            setInforMessage({
                type: 'success',
                description: 'thành công !',
                title: 'Thêm chi tiết sản phẩm'
            })
            setShow(false)
            setCall(!call)
        }
    }
    // console.log(call)
    return (
        <>
            <FaPen className={cx('editIcon')} onClick={handleShow} />
            
            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá sản phẩm:</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Nhập Giá sản phẩm"
                            min={1}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Thêm số lượng sản phẩm"
                            min={0}
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                    </Form.Group>
                  
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate({price, quantity}, data._id)}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditDetail

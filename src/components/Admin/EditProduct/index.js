import { useContext, useState } from 'react';
import { Button, Modal, Form, Row, Col, Figure } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './EditProduct.module.scss';
import { ProductContext } from '../../../context/ProductContext';
import { MessageContext } from '../../../context/MessageContext';

const cx = classNames.bind(styles);

function EditProduct({ data }) {
    const {updateProduct, setCall, call} = useContext(ProductContext)
    const {setShowToast, setInforMessage} = useContext(MessageContext)
    const [show, setShow] = useState(false);
    const [name, setName] = useState(data.name);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdate = async (data, id) => {
        const res = await updateProduct(data, id)
        if(res.success) {
            setShowToast(true)
            setInforMessage({
                type: 'success',
                description: 'thành công !',
                title: 'Cập nhật sản phẩm !'
            })
            setShow(false)
            setCall(!call)
        }
    }
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
                        <Form.Label>Tên sản phẩm:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập tên sản phẩm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                  
                  
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate({name}, data._id)}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProduct

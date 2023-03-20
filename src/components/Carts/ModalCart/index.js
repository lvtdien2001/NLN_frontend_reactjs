import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ModalCart({product}){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Đặt hàng
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm vào giỏ hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" defaultValue={product.name} disabled /> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control type="number" defaultValue={1} min={1} /> 
                    </Form.Group>
                    
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Thêm
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCart

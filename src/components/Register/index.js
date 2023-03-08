import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function Register(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div variant="primary" onClick={handleShow}>
                Tạo tài khoản mới?
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Tạo Tài Khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ và tên" /> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên tài khoản</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên tài khoản" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Nhập mật khẩu" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Nhập lại mật khẩu" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Chọn giới tính</option>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Đăng Ký
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Register

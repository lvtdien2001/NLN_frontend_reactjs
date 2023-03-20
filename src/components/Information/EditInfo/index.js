import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { userInformation } from '../user';

function EditInfo() {
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
return (
    <>
        <Button variant="primary" onClick={handleShow}>
        Sửa
        </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Sửa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control type="text" placeholder="Nhập họ và tên" autoFocus value={userInformation.fullName} />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                <Form.Control type="text" placeholder="Giới tính" autoFocus value={userInformation.gender ? 'Nam':'Nữ'} />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="text" placeholder="Số điện thoại" autoFocus value={userInformation.numberPhone}/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control type="date" placeholder="Ngày sinh" autoFocus value={userInformation.yearOfBirth}/>
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

export default EditInfo

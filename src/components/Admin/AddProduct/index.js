import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

function AddProduct() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm sản phẩm mới
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên sản phẩm:</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên sản phẩm" autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại sản phẩm</Form.Label>
                        <Form.Select>
                            <option>Chọn loại sản phẩm</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh:</Form.Label>
                        <Form.Control type="file" placeholder="Nhập tên sản phẩm" multiple />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Số lượng:</Form.Label>
                                <Form.Control type="number" placeholder="0" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Đơn giá:</Form.Label>
                                <Form.Control type="number" placeholder="Đơn vị tính: ngàn đồng" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={3} />
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

export default AddProduct

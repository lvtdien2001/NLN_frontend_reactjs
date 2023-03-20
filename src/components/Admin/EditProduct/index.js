import { useState } from 'react';
import { Button, Modal, Form, Row, Col, Figure } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './EditProduct.module.scss';

const cx = classNames.bind(styles);

function EditProduct({ data }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(data.name);
    const [images, setImages] = useState(data.images);
    const [quantity, setQuantity] = useState(data.quantity);
    const [price, setPrice] = useState(data.price);
    const [description, setDescription] = useState(data.description);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <FaPen className={cx('editIcon')} onClick={handleShow} />
            
            <Modal show={show} onHide={handleClose} centered>
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
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh:</Form.Label>
                        <div>
                            {images.map(image => {
                                return (
                                    <Figure key={image.id}>
                                        <Figure.Image
                                        width={171}
                                        height={180}
                                        alt="171x180"
                                        src={image.image}
                                        />
                                        <Figure.Caption className='text-center'>
                                            <Button variant="danger">
                                                <FaTrash />
                                                Delete
                                            </Button>
                                        </Figure.Caption>
                                    </Figure>
                                )
                            })}
                        </div>
                        <Form.Label>Thêm hình ảnh:</Form.Label>
                        <Form.Control 
                            type="file" 
                            placeholder="Nhập tên sản phẩm"
                            multiple
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Số lượng:</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="0"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Đơn giá:</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Đơn vị tính: ngàn đồng"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProduct

import { useState } from 'react';
import { Button, Modal, ListGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RateModal = ({ products, status }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    
    // Format name
    // @desc Format name has length > 30 character
    // Ex: Dien thoai Samsung Galaxy S23 -> Dien thoai Samsung Gala...
    const formatName = name => {
        if (name.length <= 30)
            return name;
        return name.substring(0, 28) + '...'
    }

    return (
        <>
        <Button style={{marginLeft: '5px'}} disabled={status !== 'Đã nhận'} variant="primary" onClick={handleShow}>
            Đánh giá
        </Button>

        <Modal scrollable show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-danger'>Đánh giá sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {products.map(product => {
                        return (
                            <ListGroup.Item key={product._id}>
                                <Row>
                                    <Col xs={4} sm={3}>
                                        <img width='100px' height='100px' src={product.detail.image} alt='Hinh anh' />
                                    </Col>
                                    <Col className='text-primary'>
                                        <Row style={{height: '48px', paddingLeft: '10px'}}><b>{formatName(product.name)}</b></Row>
                                        <Row style={{paddingLeft: '20px'}} className='text-secondary'>
                                            SL: {product.quantity} - Màu: {product.detail.color}
                                        </Row>
                                        <Row style={{paddingLeft: '20px', paddingRight: '20px'}}>
                                            <Button onClick={() => navigate(`/product/${product.detail.product}`)} >Đánh giá</Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default RateModal

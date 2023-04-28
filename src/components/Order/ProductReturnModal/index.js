import { useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import CustomSpinner from '../../CustomSpinner';
import { MessageContext } from '../../../context/MessageContext';
import request from '../../../utils/request';

const ProductReturnModal = ({status, orderId, setOrders, orders}) => {
    const [show, setShow] = useState(false);
    const [reason, setReason] = useState('');
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    const { setShowToast, setInforMessage } = useContext(MessageContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Format name
    // @desc Format name has length > 30 character
    // Ex: Dien thoai Samsung Galaxy S23 -> Dien thoai Samsung Gala...
    const formatName = name => {
        if (name.length <= 30)
            return name;
        return name.substring(0, 28) + '...'
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image',file);
        formData.append('reason', reason);

        const fetchApi = async () => {
            setLoading(true);
            await request
                .post(`/order/return/${orderId}`, formData)
                .then(res => {
                    if (res.data.success){
                        setOrders(orders.map(order => order._id === orderId ? res.data.order : order))
                        setShowToast(true);
                        setInforMessage({
                            type: 'success',
                            title: 'Thông báo',
                            description: 'Gửi yêu cầu trả hàng thành công'
                        });
                        
                        setLoading(false);
                        setShow(false);
                    }
                })
        }

        fetchApi();
    }

    return (
        <>
        <Button disabled={status==='Trả hàng'} variant="primary" onClick={handleShow}>
            Yêu cầu trả hàng
        </Button>

        <Modal scrollable show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-danger'>Gửi yêu cầu trả hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Lý do</b></Form.Label>
                        <Form.Control 
                            as='textarea' 
                            row={3} 
                            placeholder="Lý do trả hàng"
                            value={reason}
                            name='reason'
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label><b>Hình ảnh minh họa</b></Form.Label>
                        <Form.Control 
                            type='file'
                            name='image'
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Form.Group>
                    <Form.Group>
                        {loading ? <CustomSpinner /> :
                            <Button type='submit' onClick={(e) => handleSubmit(e)} variant='outline-success' size='lg'>
                                Gửi
                            </Button>
                        }
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default ProductReturnModal

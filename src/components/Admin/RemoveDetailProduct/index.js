import { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './RemoveDetailProduct.module.scss';

import { MessageContext } from '../../../context/MessageContext';
import { DetailContext } from '../../../context/DetailContext';

const cx = classNames.bind(styles);

function RemoveDetailProduct({id}) {
    
    const {deleteDetail} = useContext(DetailContext)
    const {setShowToast, setInforMessage} = useContext(MessageContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDeleteDetail = async (id) => {
        const res = await deleteDetail(id)
        if(res.success) {
            setShowToast(true)
            setInforMessage({
                type: 'success',
                description: 'ok',
                title: 'ok'
            })
            setShow(false)
        }
    }
    return (
        <>
            <FaTrash className={cx('removeIcon')} onClick={handleShow} />
            
            <Modal 
                show={show} 
                onHide={handleClose}
                centered
            >
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi hệ thống?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDeleteDetail(id)}>
                        Có
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RemoveDetailProduct

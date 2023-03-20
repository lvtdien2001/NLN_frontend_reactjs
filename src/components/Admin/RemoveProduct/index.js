import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './RemoveProduct.module.scss';

const cx = classNames.bind(styles);

function RemoveProduct() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                    <Button variant="danger" onClick={handleClose}>
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

export default RemoveProduct

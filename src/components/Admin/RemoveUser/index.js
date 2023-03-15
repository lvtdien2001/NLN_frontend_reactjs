import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './RemoveUser.module.scss';

const cx = classNames.bind(styles);

function RemoveUser() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <FaLock className={cx('removeIcon')} onClick={handleShow} />
            
            <Modal 
                show={show} 
                onHide={handleClose}
                centered
            >
                <Modal.Body>
                    Bạn có chắc chắn muốn khóa tài khoản nguời dùng này?
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

export default RemoveUser

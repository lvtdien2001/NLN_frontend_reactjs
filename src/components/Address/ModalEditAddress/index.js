import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import classNames from "classnames/bind";
import styles from './ModalEditAddress.module.scss';


const cx = classNames.bind(styles);
const ModalEditAddress = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <div className="d-grid gap-2">
            <div className={cx('btn-edit')} onClick={handleShow}>
                Cập nhật
            </div>
        </div>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật địa chỉ :</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="success" onClick={handleClose}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalEditAddress
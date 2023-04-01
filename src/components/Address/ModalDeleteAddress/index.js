import React, { useState, useContext } from 'react';
import {Button, Modal} from 'react-bootstrap';
import classNames from "classnames/bind";
import styles from './ModalDefaultAddress.module.scss';

import {AiOutlineDelete} from 'react-icons/ai'
import { AuthContext } from '../../../context/AuthContext';


const cx = classNames.bind(styles);
const ModalDeleteAddress = ({address}) => {
    const {deleteAddress, setInforMessage, setShowToast} = useContext(AuthContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleDeleteAddress = async (e) => {
        e.preventDefault();
        try {
            const res = await deleteAddress(address._id);
            if(res.success) {
                handleClose();
                setShowToast(true);
                setInforMessage({
                    type: 'success',
                    description: res.message,
                    title: 'Xóa thành công'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <>
        <div className="d-grid gap-2">
            <div className={cx('btn-delete')} onClick={handleShow}>
                Xóa
            </div>
        </div>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bạn có muốn xóa địa chỉ này không ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx('layout-information')}>
                <div>
                    {address.fullName} 
                </div>
                <div className={cx('phoneNumber')}>
                    {address.phoneNumber}
                </div>
            </div>
            <div className={cx('description')}><span className={cx('description-value')}>{address.description}</span> </div>
            <div className={cx('address')}>{address.ward}, {address.district}, {address.province}</div>
                      
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleClose}>
                Hủy
            </Button>
            <Button variant="danger" onClick={(e) => handleDeleteAddress(e)}>
              <AiOutlineDelete />
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalDeleteAddress
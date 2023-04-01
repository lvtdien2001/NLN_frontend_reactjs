import React, { useState, useContext } from 'react';
import {Button, Modal} from 'react-bootstrap';
import classNames from "classnames/bind";
import styles from './ModalDefaultAddress.module.scss';

import { AuthContext } from '../../../context/AuthContext';


const cx = classNames.bind(styles);
const ModalDefaultAddress = ({address}) => {
    const {updateAddressDefault, setShowToast, setInforMessage} = useContext(AuthContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdateAddressDefault =  async (e) => {
        e.preventDefault();
        try {
          const res = await updateAddressDefault(address._id);
          if(res.success) {
            handleClose();
            setShowToast(true);
            setInforMessage({
              type:'success',
              description:'Thành công !!',
              title: 'Cập nhật địa chỉ'
            })
          }
          
        } catch (error) {
          console.log(error)
        }
    }
    return (
      <>
        
            <Button variant="outline-primary" onClick={handleShow}>
            Thiết lập mặc định
            </Button>
        
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bạn muốn thay đổi địa chỉ mặc định ?</Modal.Title>
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
            <Button variant="primary" onClick={(e) => handleUpdateAddressDefault(e)}>
              Có, tôi muốn
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalDefaultAddress
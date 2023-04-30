import React, { useContext } from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap'

import { AuthContext } from '../../../context/AuthContext'
import classNames from "classnames/bind";
import styles from './AllAddresses.module.scss';

import ModalDefaultAddress from '../ModalDefaultAddress';

import ModalEditAddress from '../ModalEditAddress';
import ModalDeleteAddress from '../ModalDeleteAddress';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const AllAddresses = () => {
    const {authState: {allAddresses, user}} = useContext(AuthContext);
  
    let body = '';
   
    if( allAddresses.length >= 1) {
        body =  (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={10} className={cx('col')}>
                    <div className={cx('layout-top')}>
                        <div className={cx('title-address')}>Địa chỉ của tôi</div>
                        <Link to='/address/create'>
                            <Button variant='primary'>
                                    Tạo địa chỉ mới 
                            </Button>
                        </Link>
                    </div>
                       
                    </Col>
                    {
                        user?.address &&
                    <Col md={10} className={cx('col')}>
                     
                            <div className={(cx('layout'))}>
                               
                                <div className={cx('layout-information')}>
                                    <div>
                                        <span className={cx('fullname')}>{user?.address?.fullName}</span> <span className={cx('phoneNumber')}>{user?.address?.phoneNumber}</span>
                                    </div>
                                    {/* <div >
                                    <ModalEditAddress />
                                   
                                    </div> */}
                                    
                                </div>
                                <div className={cx('description')}><span className={cx('description-value')}>{user?.address?.description}</span> </div>
                                <div className={cx('address')}>{user?.address?.ward}, {user?.address?.district}, {user?.address?.province}</div>
                                <div>
                                        <Button variant='outline-danger'>Mặc định</Button>
                                </div>
                                <div className={cx('layout-btn-default')}>
                                    <Button variant="outline-primary" disabled>
                                        Thiết lập mặc định
                                    </Button>
                                </div>
                            </div>
                           
                      
                        
                    </Col> }
                    {allAddresses.map(address => 
                    address._id !== user?.address?._id &&
                    <Col md={10}  key={address._id} className={cx('col')}>
                        <div className={(cx('layout'))}>
    
                            <div className={cx('layout-information')}>
                                    <div>
                                        <span className={cx('fullname')}>{address?.fullName}</span> <span className={cx('phoneNumber')}>{address?.phoneNumber}</span>
                                    </div>
                                    <div className={cx('layout-handle')}>
                                        {/* <div>
                                            <ModalEditAddress />
                                          
                                        </div> */}
                                        <div className={cx('btn-delete')}>
                                            {address._id !== user?.address?._id && <ModalDeleteAddress address={address} />}
                                        </div>     

                                    </div>
                                    
                                </div>
                            <div className={cx('description')}><span className={cx('description-value')}>{address.description}</span> </div>
                            <div className={cx('address')}>{address.ward}, {address.district}, {address.province}</div>
                            <div className={cx('layout-btn-default')}>
                                {address._id !== user?.address?._id && <ModalDefaultAddress address={address} />}
                            </div>
                        </div>
                    </Col>    
                    )}
                </Row>
            </Container>
        )
    } else {
        body = (<div>
            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                    <h1>Bạn chưa có địa chỉ</h1>
                    <Link to='/address/create'>
                            <Button variant='primary'>
                                    Tạo địa chỉ mới 
                            </Button>
                    </Link>
                    </Col>
                </Row>
            </Container>

        </div>)
    }
   
  return (
    <div>
         
        {body}
       
       
    </div>
  )
}

export default AllAddresses
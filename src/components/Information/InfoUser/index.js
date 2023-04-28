import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from '../InfoUser/Information.module.scss';

import { AuthContext } from '../../../context/AuthContext';

import EditInfo from '../EditInfo';
import { Container, Row, Col } from 'react-bootstrap';




const cx = classNames.bind(styles);

function InfoUser() {
    const {authState: {user}} = useContext(AuthContext)
 
    const body = (
        <Container>
            <Row>
                <Col>
                    <div>
                        <div className={cx('title')}>
                            THÔNG TIN CÁ NHÂN
                        </div>
                        <div className={cx('user-item')}>
                            <div>
                                Họ và tên:
                            </div>
                            <div className={cx('user-value')}>
                                {user.fullName}
                            </div>
                        </div>
                        <div className={cx('user-item')}>
                            <div>
                                Giới tính:
                            </div>
                            <div className={cx('user-value')}>
                                {user.gender ?'Nam' : 'Nữ'}
                            </div>
                        </div>
                        <div className={cx('user-item')}>
                            <div>
                                Số điện thoại:
                            </div>
                            <div className={cx('user-value')}>
                                {user.phoneNumber ? user.phoneNumber : 'Chua co sdt'}
                            </div>
                        </div>
                        {/* <div className={cx('user-item')}>
                            <div>
                                Tiền hiện có:
                            </div>
                            <div className={cx('user-value')}>
                                {user.cash ? user.cash : 'Không có đồng nào bạn ơi. haha !!'}
                            </div>
                        </div> */}
                        <div className={cx('btn-edit')}>
                            <EditInfo />
                        </div>
                        
                    </div>
                </Col>

            </Row>
      </Container>
    )
    return (
        <div>{body}</div>
    )
}


export default InfoUser


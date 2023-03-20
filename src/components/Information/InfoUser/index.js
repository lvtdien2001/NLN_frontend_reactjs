//import { Table, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from '../InfoUser/Information.module.scss';
import moment from 'moment';
import 'moment/locale/vi';
//import { productsList, usersList } from '../Admin/usersList';
import { userInformation } from '../user';
import EditInfo from '../EditInfo';
import { Container, Row, Col } from 'react-bootstrap';
const cx = classNames.bind(styles);

function InfoUser() {
    console.log(userInformation)
    const body = (
        <Container>
            <Row>
                <Col>
                    <div>
                        <div className={cx('title')}>
                            TITLE
                        </div>
                        <div className={cx('user-item')}>
                            <div>
                                Họ và tên:
                            </div>
                            <div className={cx('user-value')}>
                                {userInformation.fullName}
                            </div>
                        </div>
                        <div className={cx('user-item')}>
                            <div>
                                Giới tính:
                            </div>
                            <div className={cx('user-value')}>
                                {userInformation.gender ?'Nam' : 'Nữ'}
                            </div>
                        </div>
                        <div className={cx('user-item')}>
                            <div>
                                Số điện thoại:
                            </div>
                            <div className={cx('user-value')}>
                                {userInformation.numberPhone}
                            </div>
                        </div>
                        <div className={cx('user-item')}>
                            <div>
                                Ngày sinh:
                            </div>
                            <div className={cx('user-value')}>
                                {moment(userInformation.yearOfBirth).format('ll')}
                            </div>
                        </div>
                        <EditInfo />
                    </div>
                </Col>
                <Col>
                <div className={cx('title')}>Avatar</div>
                <div className={cx('layout-avatar')}>
                    <img src={userInformation.avatar} alt='avatar' />
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


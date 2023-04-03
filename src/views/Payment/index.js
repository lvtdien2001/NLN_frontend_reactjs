import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';

const cx=classNames.bind(styles);

const Payment = () => {
    return (
        <Row className='justify-content-center'>
            <Col xl={10}>
                <h3>Tài khoản thanh toán</h3>
            </Col>
        </Row>
    )
}

export default Payment

import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className='container'>
            <Row className={`${cx('wrapper')} align-items-center`} >
                <Col xl={6} xs={12} className={`text-center `}>
                    <Row><Link to='#'>Điều khoản và dịch vụ</Link></Row>
                    <Row className='justify-content-center'>Liên hệ: 0782 978 121 - 0989 123 121</Row>
                    <Row className='justify-content-center'>Copyright 2023 Niên Luận Ngành KTPM Nhóm 03</Row>
                </Col>
                <Col xl={6} xs={12} className={cx('right')}>
                    <Row>Chi nhánh 1: Số 123, Lý Thái Tổ, Ninh Kiều, Cần Thơ</Row>
                    <Row>Chi nhánh 2: Số 123, Lý Thái Tổ, Đống Đa, Hà Nội</Row>
                    <Row>Chi nhánh 3: Số 123, Lý Thái Tổ, Quận Tân Bình, TP.HCM</Row>
                    <Row>Chi nhánh 4: Số 123, Lý Thái Tổ, Thanh Khê, Đà Nẵng</Row>
                </Col>
            </Row>
        </footer>
    )
}

export default Footer

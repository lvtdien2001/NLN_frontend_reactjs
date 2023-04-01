import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import classNames from 'classnames/bind';
import styles from './UserInfor.module.scss';


import Avatar from '../../components/Information/Avatar'
import InfoUser from '../../components/Information/InfoUser'

const cx = classNames.bind(styles)
const UserInfor = () => {
  return (
    <div className={cx('layout')}>
        <Container>
          <Row>
            <Col sm={12} md={6} lg={6} className={cx('layout-info')}> <InfoUser /></Col>
            <Col sm={12} md={6} lg={6} className={cx('layout-avatar')}><Avatar /></Col>
          </Row>
        </Container>
    </div>
  )
}

export default UserInfor
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './OrderDetail.module.scss';
import Nav from '../../components/Nav';
import ProductSuggest from '../../components/ProductSuggest';
import CustomSpinner from '../../components/CustomSpinner';
import OrderDetailInfor from '../../components/Order/OrderDetailInfor';
import request from '../../utils/request';

    const cx=classNames.bind(styles);

const OrderDetail = () => {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState();

    const {id} = useParams();

    const contentNav = [
        {
            id: 1,
            name: 'Lịch sử giao dịch',
            url: '/orders'
        },
        {
            id: 2,
            name: 'Đơn hàng',
            url: '#'
        }
    ]

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            await request
                .get(`/order/${id}`)
                .then(res => {
                    if (res.data.success){
                        setOrder(res.data.bill);
                        setLoading(false);
                    }
                })
        }

        fetchApi();
        
    }, [])


    return (
        <>
            <Nav content={contentNav} />
            {loading ? <CustomSpinner /> : 
                <Row className={`justify-content-center`}>
                    <Col className={cx('wrapperBody')} xl={10}>
                        <OrderDetailInfor order={order} />
                    </Col>
                </Row>
            }
            <ProductSuggest />
        </>
    )
}

export default OrderDetail

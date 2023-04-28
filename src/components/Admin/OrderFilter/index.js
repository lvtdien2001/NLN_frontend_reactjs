import { useState, useContext, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';
import classNames from 'classnames/bind';

import { OrderContext } from '../../../context/OrderContext';
import styles from './OrderFilter.module.scss';

const cx = classNames.bind(styles);

const OrderFilter = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('all');
    const [status, setStatus] = useState('Tất cả');

    const {allOrders ,setOrders} = useContext(OrderContext);

    useEffect(() => {
        handleSubmit();
    }, [allOrders])

    const handleSubmit = (e) => {
        e?.preventDefault();

        if (name==='' && status==='Tất cả' && amount==='all')
            return setOrders(allOrders);

        const filterAmount = (orders) => {
            switch(amount){
                case 'all':
                    return orders;
                case '<1':
                    return orders.filter(order => order.totalAmount<1000000);
                case '1-3':
                    return orders.filter(order => order.totalAmount>=1000000 && order.totalAmount<3000000);
                case '3-5':
                    return orders.filter(order => order.totalAmount>=3000000 && order.totalAmount<5000000);
                case '5-10':
                    return orders.filter(order => order.totalAmount>=5000000 && order.totalAmount<10000000);
                case '10-20':
                    return orders.filter(order => order.totalAmount>=10000000 && order.totalAmount<20000000);
                case '>20':
                    return orders.filter(order => order.totalAmount>20000000);
                default:
                    return [];
            }

        }

        const filterName = (orders) => {
            if (name === '')
                return orders;
            else {
                return orders.filter(order => {
                    const fullName = order.fullName.toUpperCase();
                    const inputName = name.toUpperCase();
                    return fullName.includes(inputName);
                })
            }
        }

        const filterStatus = (orders) => {
            if (status === 'Tất cả')
                return orders;
            return orders.filter(order => order.status===status);
        }

        const ordersFilterAmount = filterAmount(allOrders);
        const ordersFilterName = filterName(ordersFilterAmount);
        const ordersFilterStatus = filterStatus(ordersFilterName);

        return setOrders(ordersFilterStatus);
    }

    return (
        <Row className='justify-content-center'>
            <Col className={`bg-light ${cx('wrapper')}`} xl={10}>
                <Row>
                    <Col xl={10}>
                        <Row>
                            <Col xl={4} className='d-flex align-items-center'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <label>
                                        <b>Bộ lọc</b>
                                        <FiFilter />:&nbsp;
                                    </label>
                                    <input
                                        className={cx('name')}
                                        id='filterName'
                                        name='filterName'
                                        type="search"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Nhập tên khách hàng"
                                    />
                                </form>
                            </Col>
                            <Col xl={3}>
                                <label><b className='text-danger'>Số tiền:</b>&nbsp;</label>
                                <select
                                    id="amount"
                                    name="amount"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    className={cx('amount')}
                                >
                                    <option value="all">Tất cả</option>
                                    <option value="<1">Dưới 1 triệu</option>
                                    <option value="1-3">Từ 1 - 3 triệu</option>
                                    <option value="3-5">Từ 3 - 5 triệu</option>
                                    <option value="5-10">Từ 5 - 10 triệu</option>
                                    <option value="10-20">Từ 10 - 20 triệu</option>
                                    <option value=">20">Trên 20 triệu</option>
                                </select>
                            </Col>
                            <Col>
                                <label>
                                    <b className='text-danger'>Trạng thái đơn hàng:</b>&nbsp;
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                    className={cx('status')}
                                >
                                    <option value="Tất cả">Tất cả</option>
                                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                                    <option value="Chờ lấy hàng">Chờ lấy hàng</option>
                                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                                    <option value="Đã nhận">Đã nhận</option>
                                    <option value="Trả hàng">Trả hàng</option>
                                </select>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={2}>
                        <Button onClick={handleSubmit} variant='outline-success' >Tìm kiếm</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default OrderFilter

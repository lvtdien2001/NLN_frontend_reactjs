import { useState, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';
import classNames from 'classnames/bind';

import { UserContext } from '../../../context/UserContext';
import styles from './UserFilter.module.scss';

const cx = classNames.bind(styles);

const UserFilter = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('all');

    const {setUsers, orders, allUsers} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name==='' && amount==='all')
            return setUsers(allUsers);


        const filterAmount = (users) => {
            switch(amount){
                case 'all':
                    return users;
                case '<1':
                    return users.filter(user => {
                        let totalAmount = 0;
                        orders.map(order => {
                            if (user._id === order.user){
                                totalAmount += order.totalAmount;
                            }
                        })
                        return totalAmount<1000000
                    });
                case '1-10':
                    return users.filter(user => {
                        let totalAmount = 0;
                        orders.map(order => {
                            if (user._id === order.user){
                                totalAmount += order.totalAmount;
                            }
                        })
                        return totalAmount>=1000000 && totalAmount<10000000
                    });
                case '10-20':
                    return users.filter(user => {
                        let totalAmount = 0;
                        orders.map(order => {
                            if (user._id === order.user){
                                totalAmount += order.totalAmount;
                            }
                        })
                        return totalAmount>=10000000 && totalAmount<20000000
                    });
                case '20-50':
                    return users.filter(user => {
                        let totalAmount = 0;
                        orders.map(order => {
                            if (user._id === order.user){
                                totalAmount += order.totalAmount;
                            }
                        })
                        return totalAmount>=20000000 && totalAmount<50000000
                    });
                case '50-100':
                    return users.filter(user => {
                        let totalAmount = 0;
                        orders.map(order => {
                            if (user._id === order.user){
                                totalAmount += order.totalAmount;
                            }
                        })
                        return totalAmount>=50000000 && totalAmount<100000000
                    });
                case '>100':
                    return users.filter(user => {
                        let totalAmount = 0;
                        orders.map(order => {
                            if (user._id === order.user){
                                totalAmount += order.totalAmount;
                            }
                        })
                        return totalAmount>100000000
                    });
                default:
                    return [];
            }

        }

        const filterName = (users) => {
            if (name === '')
                return users;
            else {
                return users.filter(user => {
                    const fullName = (user.address?.fullName || user.fullName).toUpperCase();
                    const username = user.username.toUpperCase();
                    const inputName = name.toUpperCase();
                    
                    return fullName.includes(inputName) || username.includes(inputName);
                })
            }
        }

        const usersFilterAmount = filterAmount(allUsers);
        const usersFilterName = filterName(usersFilterAmount);

        return setUsers(usersFilterName);
    }

    return (
        <Row className='justify-content-center'>
            <Col className={`bg-light ${cx('wrapper')}`} xl={10}>
                <Row>
                    <Col xl={5} className='d-flex align-items-center'>
                        <form className={cx('form')} onSubmit={e => handleSubmit(e)}>
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
                                placeholder="Nhập tên khách hàng, tên tài khoản"
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
                            <option value="1-10">Từ 1 - 10 triệu</option>
                            <option value="10-20">Từ 10 - 20 triệu</option>
                            <option value="20-50">Từ 20 - 50 triệu</option>
                            <option value="50-100">Từ 50 - 100 triệu</option>
                            <option value=">100">Trên 100 triệu</option>
                        </select>
                    </Col>
                    <Col className='align-items-center' xl={2}>
                        <Button onClick={handleSubmit} variant='outline-success' >Lọc</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default UserFilter

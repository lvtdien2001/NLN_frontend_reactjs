import { useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { UserContext } from '../../../context/UserContext';
import UserFilter from '../UserFilter';
import styles from './UsersTable.module.scss';

const cx=classNames.bind(styles);

function UsersTable() {
    const { allUsers, setUsers, users, orders } = useContext(UserContext);

    useEffect(() => {
        setUsers(allUsers);
    }, [])

    // Format price - Ex: 1000000 --> 1.000.000
    const formatPrice = price => {
        if (price.length <= 3)
            return price;
    
        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));
    
            return priceFormat.reverse().join('.');
    }

    const Body = () => {
        return (
            <div className={`row justify-content-center ${cx('wrapper')}`}>
                <div className={`col-sm-10 bg-light`}>
                    <Table responsive bordered striped  hover>
                        <thead>
                            <tr className="text-center">
                                <th>STT</th>
                                <th>Tên tài khoản</th>
                                <th>Tên Khách Hàng</th>
                                <th>Giới tính</th>
                                <th>Đơn Hàng Đã Mua</th>
                                <th>Tổng Số Tiền</th>
                            </tr>
                        </thead>
                        <tbody className={cx('tableBody')}>
                            {users.map((user, index) => {
                                let totalOrder = 0;
                                let totalAmount = 0;
                                {orders.map(order => {
                                    if (order.user === user._id){
                                        totalOrder += 1;
                                        totalAmount+=order.totalAmount
                                    }
                                })}
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{index+1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.fullName}</td>
                                        <td className="text-center">{user.gender ? 'Nam' : 'Nữ'}</td>
                                        <td className="text-center">{totalOrder}</td>
                                        <td className={`text-center ${cx('totalAmount')}`}>{formatPrice(totalAmount.toString())} đ</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

    return (
        <>
            <UserFilter />
            <Body />
        </>
    )
}

export default UsersTable

import { Table, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './UsersTable.module.scss';
import { usersList } from '../usersList';
import RemoveUser from '../RemoveUser';

const cx = classNames.bind(styles);

function UsersTable() {

    return (
        <>
            <div className={`row justify-content-center`}>
                <div className='col-sm-10 '>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>STT</th>
                                <th>Tên Tài Khoản</th>
                                <th>Họ Tên</th>
                                <th>Giới Tính</th>
                                <th>Địa Chỉ</th>
                                <th>Đơn Hàng Đã Đặt</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td className="text-center">{user.id}</td>
                                        <td className="text-center">{user.userName}</td>
                                        <td className="text-center">{user.fullName}</td>
                                        <td className="text-center">
                                            {user.gender ? 'Nam' : 'Nữ'}
                                        </td>
                                        <td>
                                            {user.address}
                                        </td>
                                        <td className="text-center">
                                            {user.ordersNumber}
                                        </td>
                                        <td className="text-center">
                                            <RemoveUser />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default UsersTable

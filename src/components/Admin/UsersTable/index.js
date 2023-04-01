import { Table } from 'react-bootstrap';

import { usersList } from '../usersList';
import RemoveUser from '../RemoveUser';

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

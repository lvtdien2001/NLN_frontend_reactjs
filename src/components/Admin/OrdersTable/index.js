import { Table } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './OrdersTable.module.scss';
import { ordersList } from '../ordersList';

const cx = classNames.bind(styles);

function OrdersTable() {

    return (
        <>
            <div className={`row justify-content-center`}>
                <div className='col-sm-10 '>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>STT</th>
                                <th>Khách Hàng</th>
                                <th>Ngày Đặt Hàng</th>
                                <th>Tổng Tiền</th>
                                <th>Trạng Thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList.map(order => {
                                return (
                                    <tr key={order.id}>
                                        <td className="text-center">{order.id}</td>
                                        <td className="text-center">{order.userName}</td>
                                        <td className="text-center">{order.createAt}</td>
                                        <td className="text-center">{order.totalAmount}.000 đ</td>
                                        <td>
                                            {order.status}
                                        </td>
                                        <td className={`text-center`}>
                                            <div className={cx('detailBtn')}>Xem chi tiết</div>
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

export default OrdersTable

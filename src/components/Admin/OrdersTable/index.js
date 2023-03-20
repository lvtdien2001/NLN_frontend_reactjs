import { Table, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './OrdersTable.module.scss';
import { ordersList } from '../ordersList';
import OrderDetail from '../OrderDetail';

const cx = classNames.bind(styles);

function OrdersTable() {

    return (
        <>
            <div className='row justify-content-center' >
                <div className='col-sm-10'>
                    <div className='row justify-content-end'>
                        <div className={`${cx('filterBtn')} col-sm-3`}>
                            <span>Lọc đơn hàng: </span>
                            <Form.Select className={cx('selectFilter')} size='sm'>
                                <option value='all'>Tất cả</option>
                                <option value="phone">Đã hoàn thành</option>
                                <option value="laptop">Đang chờ duyệt</option>
                                <option value="3">Đang giao</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>
            </div>
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
                            {ordersList.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{index+1}</td>
                                        <td className="text-center">{order.userName}</td>
                                        <td className="text-center">{order.createAt}</td>
                                        <td className="text-center">{order.totalAmount}.000 đ</td>
                                        <td>
                                            {order.status}
                                        </td>
                                        <td className={`text-center`}>
                                            <OrderDetail 
                                                statusOrder={order.statusId} 
                                                orderProducts={order.products} 
                                                orderID={order.id}
                                            />
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

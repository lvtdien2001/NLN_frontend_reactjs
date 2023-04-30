import { useContext, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import moment from 'moment';
import 'moment/locale/vi';

import styles from './OrdersTable.module.scss';
import OrderFilter from '../OrderFilter';
import OrderDetail from '../OrderDetail';
import request from '../../../utils/request';
import { MessageContext } from '../../../context/MessageContext';
import { OrderContext } from '../../../context/OrderContext';

const cx = classNames.bind(styles);

function OrdersTable({data}) {
    const {orders, setOrders, setAllOrders, allOrders} = useContext(OrderContext);
    const { setShowToast, setInforMessage} = useContext(MessageContext);

    useEffect(() => {
        setAllOrders(data)
        setOrders(data);
    }, [data])

    // Format price - Ex: 1000000 --> 1.000.000
    const formatPrice = price => {
        if (price.length <= 3)
            return price;
    
        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));
    
            return priceFormat.reverse().join('.');
    }

    const handleEditStatus = async (status, id) => {

        await request
            .put(`/order/${id}`, {
                isPayment: status==='Đã nhận' ? true : undefined,
                status
            })
            .then(res => {
                if (res.data.success){
                    setAllOrders(allOrders.map(order => order._id === id ? res.data.updateOrder : order));
                    setShowToast(true);
                    setInforMessage({
                        type: 'success',
                        title: 'Thông báo',
                        description: 'Cập nhật trạng thái đơn hàng thành công'
                    })
                }
            })
    }

    const Body = () => {
        return (
            <div className={`row justify-content-center ${cx('wrapper')}`}>
                <div className={`col-sm-10 bg-light`}>
                    <Table bordered responsive striped  hover>
                        <thead>
                            <tr className="text-center">
                                <th>STT</th>
                                <th>Khách Hàng</th>
                                <th>Người nhận hàng</th>
                                <th>Ngày Đặt Hàng</th>
                                <th>SL Sản Phẩm</th>
                                <th>Tổng Tiền</th>
                                <th>Trạng Thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={cx('tableBody')}>
                            {orders?.map((order, index) => {
                                const { fullName, createdAt, totalAmount, status, user } = order;
                                const customerName = user?.fullName;
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{index+1}</td>
                                        <td>{customerName}</td>
                                        <td>{fullName}</td>
                                        <td className="text-center">{moment(createdAt).format('llll')}</td>
                                        <td className='text-center'>{order.products.length}</td>
                                        <td className="text-center">{formatPrice(totalAmount.toString())} đ</td>
                                        <td >
                                            <Form.Select 
                                                // disabled={status==='Trả hàng'} 
                                                defaultValue={status}
                                                onChange={(e) => handleEditStatus(e.target.value, order._id)}
                                            >
                                                <option 
                                                    // disabled 
                                                    value="Chờ xác nhận"
                                                >
                                                    Chờ xác nhận
                                                </option>
                                                <option 
                                                    // disabled={status!=='Chờ xác nhận'} 
                                                    value="Chờ lấy hàng"
                                                >
                                                    Chờ lấy hàng
                                                </option>
                                                <option 
                                                    // disabled={status!=='Chờ xác nhận' && status!=='Chờ lấy hàng'}
                                                    value="Đang vận chuyển"
                                                >
                                                    Đang vận chuyển
                                                </option>
                                                <option
                                                    // disabled={status==='Đã nhận'}
                                                    value="Đã nhận"
                                                >
                                                    Đã nhận
                                                </option>
                                                <option value="Trả hàng">Trả hàng</option>
                                            </Form.Select>
                                        </td>
                                        <td className={`text-center`}>
                                            <OrderDetail order={order} />
                                        </td>
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
            <OrderFilter />
            <Body />
            
        </>
    )
}

export default OrdersTable

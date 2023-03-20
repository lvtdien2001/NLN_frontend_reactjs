import { Table, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './ProductsTable.module.scss';
import { productsList } from '../productsList';
import AddProduct from '../AddProduct';
import RemoveProduct from '../RemoveProduct';
import EditProduct from '../EditProduct';

const cx = classNames.bind(styles);

function ProductsTable() {

    return (
        <>
            <div className={`${cx('addBtn')} row justify-content-center`}>
                <div className='col-sm-10'>
                    <div className='row justify-content-between'>
                        <div className='col-sm-3'>
                            <AddProduct />
                        </div>
                        <div className={`${cx('filterBtn')} col-sm-3`}>
                            <span>Lọc sản phẩm: </span>
                            <Form.Select className={cx('selectFilter')} size='sm'>
                                <option value='all'>Tất cả</option>
                                <option value="phone">Điện thoại</option>
                                <option value="laptop">Laptop</option>
                                <option value="3">Phụ kiện</option>
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
                                <th className={`${cx('stt')}`}>STT</th>
                                <th className={cx('name')}>Tên sản phẩm</th>
                                <th className={cx('quantity')}>Số lượng tồn kho</th>
                                <th className={cx('price')}>Đơn giá</th>
                                <th className={cx('detail')}></th>
                                <th className={cx('icon')}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map(product => {
                                return (
                                    <tr key={product.id}>
                                        <td className="text-center">{product.id}</td>
                                        <td>{product.name}</td>
                                        <td className="text-center">{product.quantity}</td>
                                        <td className="text-center">{product.price}.000 đ</td>
                                        <td className="text-center">
                                            <div className={cx('detailContent')}>
                                                Xem chi tiết
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <EditProduct data={product} />
                                            <RemoveProduct />
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

export default ProductsTable

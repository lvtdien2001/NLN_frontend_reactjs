import { Table, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ProductsTable.module.scss';

import AddProduct from '../AddProduct';
import RemoveProduct from '../RemoveProduct';
import EditProduct from '../EditProduct';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../context/ProductContext';
import PaginationPage from '../../Pagination';
import InfoDetail from '../InfoDetail';
import { DetailContext } from '../../../context/DetailContext';

const cx = classNames.bind(styles);

function ProductsTable() {
    const {getProducts, pageNumber, productState: {products}} = useContext(ProductContext);
    const {getDetail,detailState: {detailProducts, detailsLoading}} = useContext(DetailContext)
    const [id, setId] = useState();
    
    // const [detailProduct, setDetailProduct] = useState([]);
    // const [loading, setLoading] = useState(false)
    useEffect(() => {
        getProducts(pageNumber)
    },[pageNumber]);
    useEffect(() => {
        // const getDetail = async () => {
        //     setLoading(true);
        //     await request
        //             .get(`/product/detail/${id}`)
        //             .then((res) => {
        //                 if(res.data.success) {
        //                     setDetailProduct(res.data.detailProduct);
        //                     setLoading(false)
        //                 }
                        
        //             })
        // }
        // getDetail()
      
            getDetail(id)
                
            

    }, [id]);
    // console.log(products)
    const handleChangeId = (ID) => {
            setId(ID);
    }
    const body =  products.map((product, index) => 
        (
            <tr key={product?._id}>
                <td className="text-center">{pageNumber <= 1 ? index + 1 : (pageNumber - 1)*12 + index + 1}</td>
                <td>{product?.name}</td>
               
                
                <td className="text-center">
                    <div className={cx('detailContent')} onClick={() => handleChangeId(product?._id)}>
                        <InfoDetail detailProduct={detailProducts} product={product} />
                    </div>
                </td>
                <td className="text-center">
                    {/* <EditProduct data={product} />
                    <RemoveProduct /> */}
                </td>
            </tr>
        )
    )
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
                               
                                
                                <th className={cx('detail')}></th>
                                <th className={cx('icon')}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {body}

                        </tbody>
                    </Table>
                    <PaginationPage />
                </div>
            </div>
        </>
    )
}

export default ProductsTable

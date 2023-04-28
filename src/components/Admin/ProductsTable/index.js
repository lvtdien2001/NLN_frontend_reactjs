import { Table, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ProductsTable.module.scss';

import AddProduct from '../AddProduct';

import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../context/ProductContext';

import InfoDetail from '../InfoDetail';
import { DetailContext } from '../../../context/DetailContext';
import RemoveProduct from '../RemoveProduct';
import EditProduct from '../EditProduct';

const cx = classNames.bind(styles);

function ProductsTable() {
    const {getProducts, dispatch, productState: {products}, call} = useContext(ProductContext);
    const {getDetail,detailState: {detailProducts, detailsLoading}} = useContext(DetailContext)
    const [id, setId] = useState();
    const [category, setCategory] = useState('all')
    const [productor, setProductor] = useState('all')
    useEffect(() => {
        getProducts()
    },[call]);

   

    useEffect(() => {
     
      
            getDetail(id)
                
            

    }, [id]);
    // console.log(products)
    const handleChangeId = (ID) => {
            setId(ID);
    }
    
    const categoryLists = products.map((product) => product?.category[0]?.category );
    const myCategories = Array.from(new Set(categoryLists));
    const productorLists = products.map((product) => product?.productor[0]?.name );
    const myProductors = Array.from(new Set(productorLists));
    
    const optionCategories = myCategories.map(category => 
        <option key={category} value={category}>{category}</option>
        )
    const optionProductors = myProductors.map(productor => 
        <option key={productor} value={productor}>{productor}</option>
        )
    const body =  products.map((product, index) => 
        (( ( (category === 'all' || product?.category[0]?.category === category) && productor ==='all') 
        || (category === 'all' && (productor ==='all' || product?.productor[0]?.name === productor ) || 
        (product?.category[0]?.category === category && product?.productor[0]?.name === productor ) )  ) 
        &&
            <tr key={product?._id} className={ product?.detailProduct?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity,0) <= 15 ? cx('tr') : ''}>
                {/* <td className="text-center">{pageNumber <= 1 ? index + 1 : (pageNumber - 1)*12 + index + 1}</td> */}
                <td className="text-center">{index + 1}</td>
                <td>{product?.name}</td>
                <td>{product?.detailProduct ? product?.detailProduct.reduce((accumulator, currentValue) => accumulator + currentValue.quantity,0) : 0}</td>
                
                <td className="text-center">
                    <span className={cx('detailContent')} onClick={() => handleChangeId(product?._id)}>
                        <InfoDetail detailProduct={detailProducts} product={product} />
                    </span>
                </td>
                <td className="text-center">
                    <EditProduct data={product} />
                    <RemoveProduct id={product._id} />
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
                            <span>Lọc theo loại : </span>
                            <Form.Select className={cx('selectFilter')} size='sm' onChange={(e) => setCategory(e.target.value)}>
                                <option value='all'>Tất cả</option>
                                {optionCategories}
                            </Form.Select>
                        </div>
                        <div className={`${cx('filterBtn')} col-sm-3`}>
                            <span>Lọc theo nhà cung cấp : </span>
                            <Form.Select className={cx('selectFilter')} size='sm' onChange={(e) => setProductor(e.target.value)}>
                                <option value='all'>Tất cả</option>
                                    {optionProductors}
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
                                <th className={cx('name')}>Số lượng</th>
                                
                                <th className={cx('detail')}></th>
                                <th className={cx('icon')}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {body}

                        </tbody>
                    </Table>
                    {/* <PaginationPage /> */}
                </div>
            </div>
        </>
    )
}

export default ProductsTable

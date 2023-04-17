import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import GetAllProducts from '../../components/Products/GetAllProducts';
import request from '../../utils/request';
import CustomSpinner from '../../components/CustomSpinner';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     getProducts(pageNumber)
    // },[pageNumber])

    const {category} = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            await request
                .get(`/product/detail/category/${category}`)
                .then(res => {
                    if (res.data.success){
                        setProducts(res.data.result);
                        setLoading(false);
                    }
                })
        }
        fetchApi()
    }, [category])

  return (
    <div className={cx('')}>
        {loading ? <CustomSpinner /> : <GetAllProducts listProducts={products} />}
 
    </div>
  )
}

export default Products
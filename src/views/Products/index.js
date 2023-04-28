import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import styles from './Products.module.scss';
import request from '../../utils/request';
import CustomSpinner from '../../components/CustomSpinner';
import ProductSuggest from '../../components/ProductSuggest';
import Filter from '../../components/Filter';

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
        {loading ? <CustomSpinner /> :  <Filter data={products}/>} 
        <ProductSuggest />
    </div>
  )
}

export default Products
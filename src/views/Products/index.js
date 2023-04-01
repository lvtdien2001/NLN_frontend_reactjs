import React, { useContext, useEffect } from 'react'

import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import GetAllProducts from '../../components/Products/GetAllProducts';
import { ProductContext } from '../../context/ProductContext';

import { Col, Container, Row } from 'react-bootstrap';
import PaginationPage from '../../components/Pagination';
import CustomSpinner from '../../components/CustomSpinner';

const cx = classNames.bind(styles)

function Products() {
   const {getProducts, pageNumber, productState: {products, productsLoading}} = useContext(ProductContext)

    useEffect(() => {
        getProducts(pageNumber)
    },[pageNumber])
  return (
    <div className={cx('')}>
        <div>
            layout danh muc san pham
        </div>
        {productsLoading ? <CustomSpinner /> : <GetAllProducts listProducts={products} />}
        
        <Container>
            <Row className="justify-content-md-center">
                <Col md={{ span: 6, offset: 3 }}>

                    <PaginationPage />
                </Col>
                   
            </Row>
        </Container>
 
    </div>
  )
}

export default Products
import React from 'react'

import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import GetAllProducts from '../../components/Products/GetAllProducts';

const cx = classNames.bind(styles)
function Products() {
   

  return (
    <div className={cx('')}>
        <div>
            layout danh muc san pham
        </div>
        <GetAllProducts />
      
    </div>
  )
}

export default Products
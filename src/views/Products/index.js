import React from 'react'
import hinh from '../../assets/images/hinh1.jpg';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import GetAllProducts from '../../components/Products/GetAllProducts';
const listProducts = [
  {
      id: 1,
      name: 'San pham 1',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 2,
      name: 'San pham 2',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 3,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 4,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 5,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 6,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 7,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 8,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 9,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
  {
      id: 10,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },{
      id: 11,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },{
      id: 12,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },{
      id: 13,
      name: 'San pham 3',
      images: [
          {
              id: 1,
              image: hinh
          },
          {
              id: 2,
              image: hinh,
          },
      ],
      price: 500,
      description: 'abc xyz',
      quantity: 100
  },
]
const cx = classNames.bind(styles)
function Products() {
   

  return (
    <div className={cx('')}>
        <div>
            layout danh muc san pham
        </div>
        <GetAllProducts listProducts={listProducts} />
      
    </div>
  )
}

export default Products
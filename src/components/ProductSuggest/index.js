import { Card } from 'react-bootstrap';
import { MdOutlineStar } from 'react-icons/md';
import classNames from 'classnames/bind';

import styles from './ProductSuggest.module.scss';

const cx = classNames.bind(styles);

function ProductSuggest() {
    const products = [
        {
            id: 1,
            name: 'San pham 1',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 2,
            name: 'San pham 2',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 3,
            name: 'San pham 3',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 4,
            name: 'San pham 4',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 5,
            name: 'San pham 5',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 6,
            name: 'San pham 6',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 7,
            name: 'San pham 7',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 8,
            name: 'San pham 8',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 9,
            name: 'San pham 9',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 10,
            name: 'San pham 10',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 11,
            name: 'San pham 11',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
        {
            id: 12,
            name: 'San pham 12',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/289804/apple-watch-s8-41mm-trang-kem-thumb-1-600x600.jpeg',
            price: 500,
            star: 5,
            cmtNumber: 66
        },
    ]

    return (
        <div className={`${cx('wrapper')}`}>
            <b className={cx('title')}>GỢI Ý</b>
            <div className={`row justify-content-around ${cx('content')}`}>
                {products.map(product => {
                    return (
                        <Card key={product.id} className={cx('card')}>
                            <Card.Img variant="top" src={product.imgUrl} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <b className='text-danger'>{product.price}.000 đ</b><br/>
                                    <b className='text-warning'>
                                        {product.star}&#160;
                                        <MdOutlineStar style={{ height: '24px', top: '-10px' }} />&#160;
                                        <span className='text-secondary'>({product.cmtNumber})</span>
                                    </b>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductSuggest

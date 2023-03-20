import classNames from 'classnames/bind';

import styles from './ProductCategories.module.scss';

const cx = classNames.bind(styles);

function ProductCategories() {
    const categoryList = [
        {
            id: 1,
            name: 'Laptop',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Laptop-129x129.png'
        },
        {
            id: 2,
            name: 'Tablet',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Tablet-128x129.png'
        },
        {
            id: 3,
            name: 'Đồng hồ',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Donghothoitrang-128x129.png'
        },
        {
            id: 4,
            name: 'Máy cũ giá rẻ',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-may-cu-60x60.png'
        },
        {
            id: 5,
            name: 'Ốp lưng',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Oplung-128x128.png'
        },
        {
            id: 6,
            name: 'Chuột máy tính',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/chuot-128x129.png'
        },
        {
            id: 7,
            name: 'Bàn phím',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/ban-phim-128x129.png'
        },
        {
            id: 8,
            name: 'Loa',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Loa-128x128.png'
        },
        {
            id: 9,
            name: 'Tai nghe',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Tainghe-128x129.png'
        },
        {
            id: 10,
            name: 'Sạc dự phòng',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Sacduphong-128x129.png'
        },
        {
            id: 11,
            name: 'Màn hình máy tính',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Manhinhmaytinh-128x129.png'
        },
        {
            id: 12,
            name: 'Camera',
            imgUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-camera-128x129.png'
        }
    ]
    const categoryLists = categoryList.map((category) => (
        <div key={category.id} className={cx('category-item')}>
                        <img src={category.imgUrl} alt="img" width='80px' height='80px' />
                        <div >{category.name}</div>
        </div>
    ))
    return (
        // <div className={`${cx('wrapper')}`}>
        //     <b className={cx('title')}>DANH MỤC SẢN PHẨM</b>
        //     <div className={`row justify-content-around ${cx('content')}`}>
        //         {categoryList.map(category => {
        //             return (
        //                 <div key={category.id} className={`col-sm-1 align-items-center ${cx('items')}`}>
        //                     <img src={category.imgUrl} alt="img" width='80px' height='80px' />
        //                     <div className='text-center'>{category.name}</div>
        //                 </div>
        //             )
        //         })}
        //     </div>
        // </div>
        <div className={cx('layout-category')}>
            {categoryLists}
        </div>
    )
}

export default ProductCategories

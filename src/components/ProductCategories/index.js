import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { API } from '../../context/constanst';

import styles from './ProductCategories.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductCategories() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
            const getCategory = async () => {
                const res = await axios.get(`${API}/api/category`);
                if (res.data.success) {
                    setCategory(res.data.allCategory)
                }
            }
            getCategory()
    }, [])


    
    const categoryLists = category.map((category) => (
        <Link  key={category._id} className={cx('link')} to={`/${category.category}`}>
            <div className={cx('category-item')}>
                <img className={cx('category-image')} src={category.image} alt="img" width='80px' height='80px' />
                <div className={cx('category-name')}>{category.category}</div>
            </div>
        </Link>
    ))
    return (
        
        <div className={`justify-content-center ${cx('layout-category')}`}>
            {categoryLists}
        </div>
    )
}

export default ProductCategories

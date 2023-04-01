import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { API } from '../../context/constanst';

import styles from './ProductCategories.module.scss';

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
        <div key={category._id} className={cx('category-item')}>
                        {/* <img src={category.imgUrl} alt="img" width='80px' height='80px' /> */}
                        <div >{category.category}</div>
        </div>
    ))
    return (
        
        <div className={cx('layout-category')}>
            {categoryLists}
        </div>
    )
}

export default ProductCategories

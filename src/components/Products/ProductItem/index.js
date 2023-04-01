
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import {API} from '../../../context/constanst';
import ModalCart from '../../Carts/ModalCart';
import CarouselImages from '../../CarouselImages';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Detail from '../Detail';

const cx = classNames.bind(styles)
// import CommentForm from '../../Comments/CommentForm';
function ProductItem({product, show = true}) {
    const navigate = useNavigate();
    const [detailProduct, setDetailProduct] = useState([])
    const handleClickProductDetails = (id) => {
        return navigate(`/product/${id}`)
    }
    
    useEffect(() => {
        const getDetailProduct = async () => {
            const res = await axios.get(`${API}/api/product/detail/${product._id}`)
            if (res.data.success) {
                setDetailProduct(res.data.detailProduct)
            }
        } 
        
        getDetailProduct()
    }, [])
    
    return (
        
            <Card>
                
                    <div className={cx('carousel')}>
                        <CarouselImages images={detailProduct} />
                    </div>

               
                <Card.Body>
                    <Card.Title className={cx('product-name')}>{product?.name}</Card.Title>
                    <Detail detail={detailProduct} />
                    {show && <Card.Text>
                        <Button onClick={() => handleClickProductDetails(product._id)}>Xem chi tiet</Button>
                    </Card.Text>}
                    
                    
                    <ModalCart product={product} />
                </Card.Body>
               
            </Card>
       
    )   
}

export default ProductItem
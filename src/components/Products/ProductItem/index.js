
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

// import ModalCart from '../../Carts/ModalCart';




const cx = classNames.bind(styles)
// import CommentForm from '../../Comments/CommentForm';
function ProductItem({product}) {
    const navigate = useNavigate();
    const handleClickProductDetails = (id) => {
        return navigate(`/product/${id}`)
    }
    
   
    
    return (
        
            <Card className={cx('card')}>
                
                <Card.Img className={cx('card-image')} variant="top" src={product?.image} />

               
                <Card.Body>
                    <Card.Title className={cx('product-name')}>{product?.name}</Card.Title>
                    <div className={cx('layout-btn')}>
                        <div className={cx('btn-detail')}>
                            <Card.Text>
                                <Button onClick={() => handleClickProductDetails(product._id)}>Xem chi tiết</Button>
                            </Card.Text>
                
                        </div>
                        {/* <div>
                            <ModalCart product={product} />
                        </div> */}
                    </div>
                    
                </Card.Body>
               
            </Card>
       
    )   
}

export default ProductItem
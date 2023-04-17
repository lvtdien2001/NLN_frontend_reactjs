import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles)

function ProductItem({product}) {
    const navigate = useNavigate();

    // Format name
    // @desc Format name has length > 30 character
    // Ex: Dien thoai Samsung Galaxy S23 -> Dien thoai Samsung Gala...
    const formatName = name => {
        if (name.length <= 30)
            return name;
        return name.substring(0, 31) + '...'
    }

    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }

    const handleClickProductDetails = (id) => {
        return navigate(`/product/${id}`)
    }
    
    return (
        
            <Card className={cx('card')}>
                
                <Card.Img 
                    className={cx('card-image')} 
                    variant="top" 
                    src={product?.image} 
                    onClick={() => handleClickProductDetails(product.product._id)}
                />
                <Card.Body onClick={() => handleClickProductDetails(product.product._id)} >
                    <Card.Title className={`text-primary ${cx('product-name')}`}>{formatName(product?.product.name)}</Card.Title>
                    <Card.Text>
                        <b className='text-danger'>{formatPrice(product?.price.toString())} đ</b><br/>
                    </Card.Text>
                </Card.Body>
               
            </Card>
       
    )   
}

export default ProductItem
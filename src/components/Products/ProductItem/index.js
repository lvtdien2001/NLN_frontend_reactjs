import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import ModalCart from '../../Carts/ModalCart';
function ProductItem({product}) {
    const navigate = useNavigate();
    const handleClickProductDetails = (id) => {
        return navigate(`/product/${id}`)
    }
    return (
        <div className='col-sm-12 col-md-6 col-lg-3'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.images[0].image} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Card.Text>
                        <Button onClick={() => handleClickProductDetails(product.id)}>Xem chi tiet</Button>
                    </Card.Text>
                    <ModalCart product={product} />
                </Card.Body>
            </Card>
        </div>
    )   
}

export default ProductItem
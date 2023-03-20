import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import ModalCart from '../../Carts/ModalCart';
import CommentForm from '../../Comments/CommentForm';
function ProductItem({product}) {
    const navigate = useNavigate();
    const handleClickProductDetails = (id) => {
        return navigate(`/product/${id}`)
    }
    return (
        
            <Card>
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
                <CommentForm />
            </Card>
       
    )   
}

export default ProductItem
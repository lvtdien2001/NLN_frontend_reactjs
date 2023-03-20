import { useParams } from "react-router-dom"
import hinh from '../../assets/images/hinh1.jpg';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import ProductItem from "../../components/Products/ProductItem";
const cx = classNames.bind(styles)
function ProductDetail() {
    const {id} = useParams();
    const product = 
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
        }
    
    return (
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <ProductItem product={product} />
                </Col> 
            </Row>
           
            
        </Container>
          
        
       
    )
}

export default ProductDetail
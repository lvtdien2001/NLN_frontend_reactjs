import { useParams } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API } from "../../context/constanst";

import ProductItem from "../../components/Products/ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomSpinner from "../../components/CustomSpinner";


function ProductDetail() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const res = await axios.get(`${API}/api/product/${id}`)
                if(res.data.success) {
                    setLoading(false);
                    setProduct(res.data.product)
                    
                }
            } catch (error) {
                console.log(error)
            }
            
        }

        getProductById()
    }, [id])


    console.log(product)
    
    return (
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                   {loading ? <CustomSpinner /> :  <ProductItem product={product} show={false} />}
                </Col> 
            </Row>
           
            
        </Container>
          
        
       
    )
}

export default ProductDetail
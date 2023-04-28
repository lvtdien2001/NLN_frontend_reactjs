import { useParams } from "react-router-dom"
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';


import Nav from '../../components/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API } from "../../context/constanst";


import { useEffect, useState } from "react";
import axios from "axios";
import CustomSpinner from "../../components/CustomSpinner";
import DetailProduct from "../../components/Products/DetailProduct";



const cx = classNames.bind(styles)
function ProductDetail() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [allDetail, setAllDetail] = useState([]);
    const [currentDetail, setCurrentDetail] = useState({});
    const {id} = useParams();

    const contentNav = [
        {
            id: 1,
            name: product?.category?.category,
            url: `/products/${product?.category?._id}`
        },
        {
            id: 2,
            name: product?.name,
            url: '#'
        }
    ]

    useEffect(() => {
        const getProductById = async () => {
            try {
                const res = await axios.get(`${API}/api/product/${id}`)
                if(res.data.success) {
                    setLoading(false);
                    setProduct(res.data.product)
                    setAllDetail(res.data.detailProduct)
                    setCurrentDetail(res.data.detailProduct[0])
                }
            } catch (error) {
                console.log(error)
            }
            
        }

        getProductById()
    }, [id])

    const handleChangeCurrentDetail = (detail) => {
        setCurrentDetail(detail)
    }

    // console.log(product)
    const detail = allDetail.map(detail => (
        <div key={detail._id} className={detail._id !== currentDetail._id ? cx('layout-detail') : cx('layout-active') }  onClick={() => handleChangeCurrentDetail(detail)}>
            <img className={cx('detail-image')} src={detail.image} alt='avatar'/>
            <div>{detail.color}</div>
            <div>{detail.size}</div>
        </div>
    ))
    return (
        <Container>
            <Nav content={contentNav} />
            <Row>
                <Col className={cx('layout')}>
                    <div className={cx('product-name')}>{product.name}</div>
                   {loading ? <CustomSpinner /> :  <DetailProduct currentDetail={currentDetail} allDetail={allDetail} />}
                  <div className={cx('detail')}>{detail}</div> 
                  {/* <ModalCart allDetail={allDetail} /> */}
                  {/* <Comment productId={id} /> */}
                </Col> 
            </Row>
            
        </Container>
          
        
       
    )
}

export default ProductDetail
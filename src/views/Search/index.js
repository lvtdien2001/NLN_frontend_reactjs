import { useEffect, useState } from 'react';
import request from '../../utils/request';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import GetAllProducts from '../../components/Products/GetAllProducts';
import Feedback from 'react-bootstrap/esm/Feedback';

const cx = classNames.bind(styles);

function Search({data}) {
  const [filterProductor,setFilterProductor]= useState('All');
  const [filterCategogy,setFilterCategogy]= useState('All');
  const [products, setProducts] = useState([]);
  const { query } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClickProductDetails = (id) => {
    return navigate(`/product/${id}`);
  };
  console.log(products);
  const newArray = products.map((data)=>data.category.category)
  const myArray = [...new Set(newArray)]
  const newArrays = products.map((data)=>data.productor.name)
  const myArrays = [...new Set(newArrays)]
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await request.get(`/search?q=${query}`);
        if (response.data.success) {
          setProducts(response.data.searchResult);
          console.log(response.data)
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

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
 return (
  <div className={cx('container')}>
      <Row>
       <Col>
        <h2>Kết quả tìm kiếm cho "{query}"</h2>
       </Col>
      </Row>
      <Row>
       <Col md={2}>
  <div className={cx('filter')}>
      <h4>Lọc theo danh mục</h4>
      </div>
      <Row>
      <Col>
      <label htmlFor="brand-select" className={cx('titles')}><h5>Loại:</h5></label>
          <select id="brand-select" defaultValue="All" value={filterCategogy} onChange={(e)=>setFilterCategogy(e.target.value)}>
            <option value="All">Tất cả</option>
            {myArrays?.map((product)=> <option key={product} value={product}>{product}</option>)}
          </select>
      </Col>
      <Col>
      <label htmlFor="brand-select" className={cx('titles')}><h5>Hãng:</h5></label>
          <select id="brand-select" defaultValue="All" value={filterProductor} onChange={(e)=>setFilterProductor(e.target.value)}>
            <option value="All">Tất cả</option>
                 {myArray?.map((product)=> <option key={product} value={product}>{product}</option>)}
          </select>
      </Col>
      </Row>
      </Col>
      <Col md={10}>
      <Row>
      {isLoading ? (
      <Col>
          <p>Loading...</p>
      </Col>
      ) : error ? (
      <Col>
        <Feedback variant="danger">{error}</Feedback>
      </Col>
      ) : (
        products.map((product) => (
      <>
        {((filterProductor==='All' && filterCategogy==='All') || (filterProductor===product?.category.category && filterCategogy==='All' ) 
        || (filterProductor==='All' && filterCategogy===product?.productor?.name) || (filterProductor===product?.category?.category && filterCategogy===product?.productor?.name )) &&
       <Col key={product._id} md={3} sm={6} className={cx('product')}>
          {console.log(product)}
               <Card className={cx('card')}>    
                <Card.Img 
                    className={cx('card-image')} 
                    variant="top" 
                    src={product?.image} 
                    onClick={() => handleClickProductDetails(product._id)}
                />
                <Card.Body onClick={() => handleClickProductDetails(product.product._id)} >
                    <Card.Title className={`text-primary ${cx('product-name')}`}>{formatName(product.name)}</Card.Title>
                    <Card.Text>
                        {/* <b className='text-danger'>{formatPrice(product?.price.toString())} đ</b><br/> */}
                    </Card.Text>
                </Card.Body>
               
            </Card>
        </Col>}
      </>
      ))
      )}
      </Row>
      </Col>
      </Row>
      </div>
      );
      }
      
      export default Search;
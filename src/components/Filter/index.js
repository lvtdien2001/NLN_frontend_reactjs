import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import Feedback from 'react-bootstrap/esm/Feedback';
import { useNavigate } from 'react-router-dom';
import { all } from 'axios';
import request from '../../utils/request';

const cx = classNames.bind(styles);

function Filter({data}) {
  const [products, setProducts] = useState([]);
  const [filterProductor,setFilterProductor]= useState('All');
  const [filterPrice,setFilterPrice]=useState('All')
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClickProductDetails = (id) => {
    return navigate(`/product/${id}`)
}

  const handleFilter = () => {

  };
console.log(data)
  const handleFilterPrice = (price,filter) => {
    switch (filter) {
        case '<3':
            if( price < 3000000 ) return true 
            else return false;
        case '3-5':
            if( price >= 3000000 && price < 5000000 ) return true 
            else return false;
        case '5-10':
            if(price >= 5000000 && price < 10000000 ) return true 
            else return false;
        case '10-20':
            if( price >= 10000000 && price <= 20000000 ) return true 
            else return false;
        case '>20':
            if( price > 20000000 ) return true 
            else return false;
        default:
            return false;
  };}
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
const newArray = data.map((data)=>data.product.productor.name)
const myArray = [...new Set(newArray)]
  return (
    <div>
        <Row >
          <Col xs={6} md={4} className={cx('title')} >
           <h4> Lọc sản phẩm </h4>
            </Col>
            <Col xs={6} md={4}>
          <label htmlFor="brand-select" className={cx('titles')}><h5>Hãng:</h5></label>
          <select id="brand-select" defaultValue="All" value={filterProductor} onChange={(e)=>setFilterProductor(e.target.value)}>
            <option value="All">Tất cả</option>
                 {myArray?.map((product)=> <option key={product} value={product}>{product}</option>)}
          </select>
          <label htmlFor="price-range-select" className={cx('titles')}><h5>Giá tiền:</h5></label>
          <select id="price-range-select" defaultValue="All" value={filterPrice} onChange={(e)=>setFilterPrice(e.target.value)}>
            <option value="All">Tất cả</option>
            <option value="<3">Dưới 3 triệu</option>
            <option value="3-5">Từ 3 triệu - 5 triệu</option>
            <option value="5-10">Từ 5 triệu - 10 triệu</option>
            <option value="10-20">Từ 10 triệu - 20 triệu</option>
            <option value=">20">Trên 20 triệu</option>
          </select>
            </Col>
        </Row>
     <Col >
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
        data.map((product) => (
      <>
        {((filterProductor==='All' && filterPrice ==='All')||(filterProductor===product.product.productor.name && filterPrice ==='All' )||
          (filterProductor==='All'&& handleFilterPrice(product.price,filterPrice)) || (filterProductor===product.product.productor.name && handleFilterPrice(product.price,filterPrice)) ) &&
        <Col key={product._id} className={`col-sm-12 col-md-6 col-lg-3 ${cx('layout')}`}>
               <Card className={cx('card')}>
                
                <Card.Img 
                    className={cx('card-image')} 
                    variant="top" 
                    src={product?.image} 
                     onClick={() => handleClickProductDetails(product.product._id)}
                />
                <Card.Body onClick={() => handleClickProductDetails(product.product._id)} >
                    <Card.Title className={`text-primary ${cx('product-name')}`}>{formatName(product.product.name)}</Card.Title>
                    <Card.Text>
                        <b className='text-danger'>{formatPrice(product?.price.toString())} đ</b><br/>
                    </Card.Text>
                </Card.Body>
               
            </Card>
        </Col>}
      </>
      ))
      )}
      </Row>
      </Col>
     </div>
     )
}
export default Filter

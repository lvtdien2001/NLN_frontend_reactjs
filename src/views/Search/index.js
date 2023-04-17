import { useEffect, useState } from 'react';
import request from '../../utils/request'
import  {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import  {Row,Col,Card,Button} from 'react-bootstrap'
import classNames from "classnames/bind";
import styles from './Search.module.scss'

const cx = classNames.bind(styles)
function Search(valueSearch) {
  const [products, setProducts] = useState([]);
  const {query} = useParams()
  const navigate = useNavigate();
  const handleClickProductDetails = (id) => {
      return navigate(`/product/${id}`)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await request.get(`/search?q=${query}`);
        if (response.data.success) {
          setProducts(response.data.searchResult);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div>
      <h2 className='text-center'>Kết quả tìm kiếm: '{query}'</h2>
      <Row>
        {products.map((product) => {
          const { _id, name, image } = product;
          return (
            <Col key={_id} className = {`col-sm-12 col-md-4 col-lg-3 ${cx('layout')}`}>
              <Card className={cx('card')}>
                <Card.Img className={cx('card-image')} variant="top" src={image} />
                <Card.Body>
                  <Card.Title className={cx('product-name')}>{name}</Card.Title>
                  <div className={cx('layout-btn')}>
                    <div className={cx('btn-detail')}>
                      <Card.Text>
                        <Button onClick={() => handleClickProductDetails(_id)}>Xem chi tiết</Button>
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
export default Search;

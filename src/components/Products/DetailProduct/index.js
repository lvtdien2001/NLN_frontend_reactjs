import { Card, Row, Col } from 'react-bootstrap'
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';


import styles from './DetailProduct.module.scss';
import ModalCart from "../../Carts/ModalCart";
import Comment from "../../Comments/CommentForm";

const cx = classNames.bind(styles)

const DetailProduct = ({currentDetail, allDetail}) => {
    const {id} = useParams();


    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }

    const body = (
        <Row>
            <Col>
                <Card >
                    <Card.Img height='440px' variant="top" src={currentDetail?.image} />
                    <Card.Body>
                        
                            <div>
                              <span className={cx('detail-value')}>  Giá hiện tại: </span>
                              <span className={cx('detail-price')}>{formatPrice(currentDetail?.price.toString())} ₫</span>
                            </div>
                            <div>
                               {currentDetail?.size && <><span className={cx('detail-value')}>Dung lượng:</span> {currentDetail?.size}</> }
                            </div>
                            <div>
                             <span className={cx('detail-value')}> Số lượng hiện tại :</span>  {currentDetail?.quantity}
                            </div>
                            <div>
                              <span className={cx('detail-value')}>Màu :</span>  {currentDetail?.color}
                            </div>
                            <ModalCart allDetail={allDetail} />
                        
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Comment productId={id} />
            </Col>
        </Row>
    )

  return (
    <div>
        
        {body}
    </div>
  )
}

export default DetailProduct
import { useReducer, useEffect, useContext, useState } from 'react';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';

import { AuthContext } from '../../../context/AuthContext';
import { MessageContext } from "../../../context/MessageContext";

import request from '../../../utils/request';
import cartReducer, { initCartState } from '../../../reducers/cartReducer';
import OrderModal from '../../Order/OrderModal';
import { 
    ADD_PRODUCT, REMOVE_PRODUCT, ADD_ALL_PRODUCT, REMOVE_ALL_PRODUCT, SET_TOTAL_AMOUNT, SET_PRODUCT_UPDATE
} from '../../../context/constanst';

import styles from './CartDetailInfo.module.scss';

const cx=classNames.bind(styles);

const CartDetailInfo = ({ data, names }) =>{
    const [cartState, dispatch] = useReducer(cartReducer, initCartState);
    const [paymentUrl, setPaymentUrl] = useState('');

    const { setShowToast, setInforMessage} = useContext(MessageContext);
    const { authState: {user} } = useContext(AuthContext);

    const { totalAmount, products, productUpdate } = cartState;

    useEffect(() => {
        const fetchApiUpdate = async () => {
            const { _id, quantity } = productUpdate;
            await request
                .put(`/cart/${_id}`, { quantity })
        }

        productUpdate && fetchApiUpdate();

    }, [productUpdate])

    useEffect(() => {
        const fetchApiPayment = async () => {
            await request
                .post('/payment', { amount: totalAmount })
                .then(res => {
                    if (res.data.success) {
                        setPaymentUrl(res.data.url);
                    }
                })
        }

        if (totalAmount!==0)
            fetchApiPayment();
        else if (totalAmount===0)
            setPaymentUrl('');

    }, [totalAmount]);

    // Format name
    // @desc Format name has length > 28 character
    // Ex: Dien thoai Samsung Galaxy S23 -> Dien thoai Samsung Gala...
    const formatName = name => {
        if (name.length <= 28)
            return name;
        return name.substring(0, 28) + '...'
    }

    // Format price - Ex: 1000000 --> 1.000.000
    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }

    const handleChecked = (e, product) => {

        if (e.target.checked){
            dispatch({
                type: ADD_PRODUCT,
                payload: product
            });
            dispatch({
                type: SET_TOTAL_AMOUNT,
                payload: null
            })
        }
        else {
            const index = products.findIndex(element => element.detailProduct._id === product.detailProduct._id)
            dispatch({
                type: REMOVE_PRODUCT,
                payload: index
            });
            dispatch({
                type: SET_TOTAL_AMOUNT,
                payload: null
            })
        }
    }

    const handleCheckedAll = (e) => {
        if (e.target.checked){
            dispatch({
                type: ADD_ALL_PRODUCT,
                payload: data
            });
            dispatch({
                type: SET_TOTAL_AMOUNT,
                payload: null
            })
        }
        else {
            dispatch({
                type: REMOVE_ALL_PRODUCT,
                payload: []
            });
            dispatch({
                type: SET_TOTAL_AMOUNT,
                payload: null
            })
        }
    }

    const handleUpdateQuantity = (operator, product) => {
        const { quantity } = product;

        if (operator==='-'){
            if (quantity===1){
                setShowToast(true);
                setInforMessage({
                    type:'danger', 
                    title: 'Giảm số lượng không thành công', 
                    description:'Số lượng tối thiểu là 1'
                });
                return;
            }

            dispatch({
                type: SET_PRODUCT_UPDATE,
                payload: {
                    ...product,
                    quantity: quantity-1
                }
            })
            dispatch({
                type: SET_TOTAL_AMOUNT,
                payload: null
            })
        }
        else if (operator==='+'){
            const inventoryQuantity = product.detailProduct.quantity;
            if ( quantity === inventoryQuantity ) {
                setShowToast(true);
                setInforMessage({
                    type:'danger', 
                    title: 'Cập nhật không thành công', 
                    description: `Số lượng sản phẩm trong kho chỉ còn ${inventoryQuantity}`
                });
                return;
            }
            dispatch({
                type: SET_PRODUCT_UPDATE,
                payload: {
                    ...product,
                    quantity: quantity+1
                }
            })
            dispatch({
                type: SET_TOTAL_AMOUNT,
                payload: null
            })
        }
    }   

    const handleRemoveProduct = (cartId) => {
        const fetchApiRemove = async () => {
            await request
                .delete(`/cart/${cartId}`)
                .then((res) => {
                    if (res.data.success) {

                        // Config information of message toast
                        setShowToast(true);
                        setInforMessage({
                            type:'success', 
                            title: 'Thông báo', 
                            description:'Xóa sản phẩm khỏi giỏ hàng thành công'
                        });

                        // Remove product in cart
                        const index = data.findIndex(element => cartId === element._id);
                        data.splice(index, 1);

                    }
                })
        }

        fetchApiRemove();
    }

    return (
        <div className={cx('wrapper')}>
            <h3 className={`text-center text-primary ${cx('heading')}`}>GIỎ HÀNG CỦA BẠN</h3>
            {user.address===undefined && 
            <h6 className='text-danger text-center'>
                Lưu ý: Bạn chưa cập nhật địa chỉ nhận hàng. Để cập nhật địa chỉ hãy&nbsp;
                <Link to='/address/create'>nhấn vào đây</Link>
            </h6>}
            <Row className={`align-items-center ${cx('title')}`}>
                <Col xl={1}></Col>
                <Col xl={4}>
                    Sản phẩm
                </Col>
                <Col xl={7}>
                    <Row className='text-center align-items-center'>
                        <Col xl={4}></Col>
                        <Col xl={7}>
                            <Row>
                                <Col xl={4}>Đơn giá</Col>
                                <Col xl={4}>Số lượng</Col>
                                <Col xl={4}>Số tiền</Col>
                            </Row>
                            
                        </Col>

                    </Row>
                </Col>
                
            </Row>
    
            <div className={data.length === 0 ? cx('emptyCart') : ''}>
                {
                    data.length === 0 && 
                    <h4>
                        Chưa có sản phẩm
                    </h4>
                }
                {data.map((product, index) => {
                    // Set quantity updated, if any
                    if (productUpdate && product._id === productUpdate._id){
                        product.quantity = productUpdate.quantity
                    }
                    // const { cartId, name } = product;
                    const { quantity, detailProduct } = product;
                    const { price, color, size, image } = detailProduct;
                    const amount = quantity*price;
                    return (
                        <Row key={index} className={`align-items-center ${cx('items')}`}>
                            <Col xl={5}>
                                <Row className={`align-items-center ${cx('product')}`}>
                                    <Col xl={1}>
                                        <input
                                            className={cx('checkbox')}
                                            type="checkbox"
                                            onChange={(e) => handleChecked(e, product)}
                                            checked={products.includes(product)}
                                        />
                                    </Col>
                                    <Col xl={5}>
                                        <Link className={cx('link')} to={`/product/${detailProduct.product}`} >
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{names[index]}</Tooltip>}>
                                                <span className="d-inline-block">
                                                    <img className={cx('images')} src={image} alt={names[index]} />
                                                </span>
                                            </OverlayTrigger>
                                        </Link>
                                    </Col>
                                    <Col xl={6} >
                                        <Link to={`/product/${detailProduct.product}`} >
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{names[index]}</Tooltip>}>
                                                <span className={`d-inline-block ${cx('name')}`}>
                                                    {formatName(names[index])}
                                                </span>
                                            </OverlayTrigger>
                                        </Link>
                                    </Col>
                
                                </Row>
                            </Col>
                            <Col xl={7}>
                                <Row className={`align-items-center text-center`}>
                                    <Col xl={2}>
                                        { color && <>Màu sắc: {color}</> }
                                    </Col>
                                    <Col xl={2}>
                                        { size }
                                    </Col>
                                    <Col xl={7}>
                                        <Row>
                                            <Col xl={4}>
                                                {formatPrice(price.toString())} đ
                                            </Col>
                                            <Col xl={4}>
                                                <Row className={`align-items-center text-center ${cx('quantity')}`}>
                                                    <Col
                                                        className={`${cx('btn')}`}
                                                        onClick={() => handleUpdateQuantity('-', product)}
                                                    >
                                                        -
                                                    </Col>
                                                    <Col>{quantity}</Col>
                                                    <Col
                                                        className={`text-center ${cx('btn')}`}
                                                        onClick={() => handleUpdateQuantity('+', product)}
                                                    >
                                                        +
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xl={4} >
                                                {formatPrice(amount.toString())} đ
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col
                                        className={`text-center ${cx('btnRemove')}`}
                                        xl={1}
                                        onClick={() => handleRemoveProduct(product._id)}
                                    >
                                        <FaTrash/>
                                        Xóa
                                    </Col>
                                </Row>
                            </Col>
                
                        </Row>
                    )
                })}
            </div>

            <Row className={`align-items-center ${cx('order')}`}>
                <Col xl={2}>
                    <Row className={`align-items-center`}>
                        <Col xl={3}>
                            <input 
                                className={cx('checkbox')} 
                                type="checkbox" 
                                onChange={(e) => handleCheckedAll(e)}
                            />
                        </Col>
                        <Col>Chọn tất cả</Col>
                    </Row>
                </Col>
                <Col className='text-end'>
                    Tổng thanh toán ({products.length} sản phẩm): {formatPrice(totalAmount.toString())} đ
                    &nbsp;
                    {/* <Button 
                        className={`${cx('btnOrder')}`} 
                        variant='light' 
                        size='lg'
                    >
                        <a className={cx('hrefUnderline')} href={`${paymentUrl}`}>Mua hàng</a>
                    </Button> */}
                    <OrderModal paymentUrl={paymentUrl} totalAmount={totalAmount} products={products} ></OrderModal>
                </Col>
            </Row>
        </div>
    )
}

export default CartDetailInfo
import { useReducer, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';

import { MessageContext } from "../../../context/MessageContext";
import request from '../../../utils/request';
import cartReducer, { initCartState } from '../../../reducers/cartReducer';
import OrderModal from '../../Order/OrderModal';
import { 
    ADD_PRODUCT, REMOVE_PRODUCT, ADD_ALL_PRODUCT, REMOVE_ALL_PRODUCT, SET_TOTAL_AMOUNT, SET_PRODUCT_UPDATE
} from '../../../context/constanst';

import styles from './CartDetailInfo.module.scss';

const cx=classNames.bind(styles);

const CartDetailInfo = ({ data }) =>{
    const [cartState, dispatch] = useReducer(cartReducer, initCartState);
    const { setShowToast, setInforMessage} = useContext(MessageContext);
    const { totalAmount, products, productUpdate } = cartState;

    useEffect(() => {
        const fetchApiUpdate = async () => {
            const { cartId, quantity } = productUpdate;
            await request
                .put(`/cart/${cartId}`, { quantity })
        }

        productUpdate && fetchApiUpdate();
    }, [productUpdate])

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
            const index = products.findIndex(element => {
                const { cartId } = element;
                return cartId === product.cartId;
            })
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
        }
        else if (operator==='+'){
            dispatch({
                type: SET_PRODUCT_UPDATE,
                payload: {
                    ...product,
                    quantity: quantity+1
                }
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
                        const index = data.findIndex(element => cartId === element.cartId);
                        data.splice(index, 1);

                    }
                })
        }

        fetchApiRemove();
    }

    return (
        <div>
            <h3 className={`text-center text-primary ${cx('heading')}`}>GIỎ HÀNG CỦA BẠN</h3>

            <Row className={`align-items-center ${cx('title')}`}>
                <Col xl={1}></Col>
                <Col xl={4}>
                    Sản phẩm
                </Col>
                <Col xl={6}>
                    <Row className='text-center'>
                        <Col xl={4}></Col>
                        <Col xl={3}>
                            Đơn giá
                        </Col>
                        <Col xl={2}>
                            Số lượng
                        </Col>
                        <Col xl={3}>
                            Số tiền
                        </Col>
                    </Row>
                </Col>
                <Col className='text-center' xl={1}>Thao tác</Col>
            </Row>
    
            {data.map(product => {
                // Set quantity updated, if any
                if (productUpdate && product.cartId === productUpdate.cartId){
                    product.quantity = productUpdate.quantity
                }
                
                const { cartId, price, color, size, image, name, quantity } = product;

                const amount = quantity*price;

                return (
                    <Row key={cartId} className={`align-items-center ${cx('items')}`}>

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
                                <Col xl={5}><img className={cx('images')} src={image} alt={name} /></Col>
                                <Col xl={6} className={cx('name')} >
                                    {formatName(name)}
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={6}>
                            <Row className={`align-items-center text-center`}>
                                <Col xl={2}>
                                    { color && <>Màu sắc: {color}</> } 
                                </Col>
                                <Col xl={2}>
                                    { size }
                                </Col>
                                <Col xl={3}>
                                    {formatPrice(price.toString())} đ
                                </Col>
                                <Col xl={2}>
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
                                <Col xl={3} >
                                    {formatPrice(amount.toString())} đ
                                </Col>
                            </Row>
                        </Col>
                        <Col 
                            className={`text-center ${cx('btnRemove')}`} 
                            xl={1}
                            onClick={() => handleRemoveProduct(cartId)}
                        >
                                <FaTrash/> 
                            Xóa
                        </Col>
                    </Row>
                )
            })}

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
                    <OrderModal totalAmount={totalAmount} products={products} />
                </Col>
            </Row>
        </div>
    )
}

export default CartDetailInfo

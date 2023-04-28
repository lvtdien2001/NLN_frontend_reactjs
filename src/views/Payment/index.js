import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

// import { MessageContext } from '../../context/MessageContext';
import OrderDetailInfor from '../../components/Order/OrderDetailInfor';
import ProductSuggest from '../../components/ProductSuggest';
import CustomSpinner from '../../components/CustomSpinner';
import request from '../../utils/request';
import Nav from '../../components/Nav';
import styles from './Payment.module.scss';

const cx=classNames.bind(styles);

const Payment = () => {
    const [paymentStatus, setPaymentStatus] = useState('-1');
    const [paymentMessage, setPaymentMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [bill, setBill] = useState({});
    
    // const { setShowToast, setInforMessage} = useContext(MessageContext);

    const products = (localStorage['products']!==undefined ? JSON.parse(localStorage['products']) : []);
    const totalAmount = localStorage['totalAmount'];
    const paymentMethod = localStorage['paymentMethod'];
    const phoneNumber = localStorage['phoneNumber'];
    const fullName = localStorage['fullName'];
    const province = localStorage['province'];
    const district = localStorage['district'];
    const ward = localStorage['ward'];
    const description = localStorage['description'];

    const contentNav = [
        {
            id: 1,
            name: 'Giỏ hàng',
            url: '/cart'
        },
        {
            id: 2,
            name: 'Đơn hàng',
            url: '#'
        }
    ]

    const location = useLocation();
    const vnp_Params = location.search;

     // Format price - Ex: 1000000 --> 1.000.000
     const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            await request
                .get(`/payment/vnpay_ipn${vnp_Params}`)
                .then(res => {
                    setPaymentStatus(res.data.RspCode);
                    setPaymentMessage(res.data.Message);
                    
                    // Thanh toán thành công
                    if (res.data.RspCode === '00'){
                        const updateOrder = async () => {
                            
                            // Xóa sản phẩm trong giỏ hàng
                            for (let i=0; i<products.length; i++){
                                await request
                                    .delete(`/cart/${products[i]._id}`)
                            } 

                            // Tạo đơn hàng
                            let details = [];
                            products.forEach(product => {
                                const { detailProduct, quantity } = product;
                                details.push({
                                    detail: detailProduct._id,
                                    price: detailProduct.price,
                                    quantity
                                })
                            })
                            await request
                                .post('/order', {
                                    products: details,
                                    totalAmount,
                                    paymentMethod,
                                    phoneNumber,
                                    fullName,
                                    province,
                                    district,
                                    ward,
                                    description,
                                    status: 'Chờ lấy hàng',
                                    isPayment: true
                                })
                                .then(res => {
                                    if (res.data.success){
                                        setBill(res.data.bill);
                                        setLoading(false);
                                    }
                                })

                            localStorage.removeItem('products');
                            localStorage.removeItem('totalAmount');
                            localStorage.removeItem('paymentMethod');
                            localStorage.removeItem('phoneNumber');
                            localStorage.removeItem('fullName');
                            localStorage.removeItem('province');
                            localStorage.removeItem('district');
                            localStorage.removeItem('ward');
                            localStorage.removeItem('description');
                        }
                        updateOrder();
                    }

                    // Thanh toán thất bại
                    if (res.data.RspCode !== '00'){
                        setLoading(false);
                        localStorage.removeItem('products');
                        localStorage.removeItem('totalAmount');
                        localStorage.removeItem('paymentMethod');
                        localStorage.removeItem('phoneNumber');
                        localStorage.removeItem('fullName');
                        localStorage.removeItem('province');
                        localStorage.removeItem('district');
                        localStorage.removeItem('ward');
                        localStorage.removeItem('description');
                    }

                })
        }

        fetchApi();
    }, [])
    
    const Success = () => {

        return (
            <div>
                <Row className='justify-content-center'>
                    <Col xl={10}>
                        <h2 className='text-center'>
                            <i className='text-danger'>Thanh toán thành công {formatPrice(bill.totalAmount.toString())} đ</i>
                        </h2>
                    </Col>
                </Row>
                <Row className={`justify-content-center`}>
                    <Col className={cx('wrapperBody')} xl={10}>
                        <OrderDetailInfor order={bill} />
                    </Col>
                </Row>
            </div>
        )
    }

    const Failure = () => {
        return (
            <Row className='justify-content-center align-items-center'>
                <Col className={`align-items-center text-center ${cx('wrapperFailure')}`}>
                    {/* <h1 className='text-center text-danger'>Thông tin không hợp lệ !!</h1> */}
                    <h5 className='text-center text-danger'>{paymentMessage}</h5>
                    <Link to='/cart'>Trở về giỏ hàng</Link>
                </Col>
            </Row>
        )
    }

    return (
        <>
            <Nav content={contentNav} />
            {loading ? <div className='text-center'><CustomSpinner /></div>
            : paymentStatus === '00' ? <Success /> : <Failure />}
            <ProductSuggest />
        </>
    )
}

export default Payment

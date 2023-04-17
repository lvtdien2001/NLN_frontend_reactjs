import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import classNames from 'classnames/bind';

// import { MessageContext } from '../../context/MessageContext';
import OrderInfor from '../../components/Order/OrderInfor';
import CustomSpinner from '../../components/CustomSpinner';
import request from '../../utils/request';
// import styles from './Payment.module.scss';

// const cx=classNames.bind(styles);

const Payment = () => {
    const [paymentStatus, setPaymentStatus] = useState('-1');
    const [loading, setLoading] = useState(false);
    const [bill, setBill] = useState({});
    
    // const { setShowToast, setInforMessage} = useContext(MessageContext);

    const location = useLocation();
    const vnp_Params = location.search;
    const orderId = localStorage['orderId'];

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
                    if (res.data.RspCode==='00'){
                        setPaymentStatus(res.data.RspCode);
                        const updateIsPayment = async () => {
                            await request.put(`/order/${orderId}`, { isPayment: true, status: 'Đang vận chuyển' })
                        }
                        updateIsPayment();
                    }
                })

            await request
                .get(`/order/${orderId}`)
                .then(res => {
                    setBill(res.data.bill);
                    setLoading(false);
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
                <OrderInfor order={bill} />
            </div>
        )
    }

    const Failure = () => {
        return (
            <Row className='justify-content-center'>
                <Col xl={10}>
                    <h1 className='text-center text-danger'>Thông tin không hợp lệ !!</h1>
                </Col>
            </Row>
        )
    }

    return (
        <>
            {loading ? <div className='text-center'><CustomSpinner /></div>
            : paymentStatus === '00' ? <Success /> : <Failure />}
        </>
    )
}

export default Payment

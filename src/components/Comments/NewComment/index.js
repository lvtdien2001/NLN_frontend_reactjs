import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import classNames from 'classnames/bind';
import moment from 'moment';
import 'moment/locale/vi'

import styles from './NewComment.module.scss';
import request from '../../../utils/request';
import { MessageContext } from '../../../context/MessageContext';

const cx=classNames.bind(styles);

function NewComment({productId,setComments, setCommentUser}) {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [order, setOrder] = useState();
    const { setShowToast, setInforMessage} = useContext(MessageContext);

    useEffect(() => {
        const getOrdersByUser = async () => {
            await request
                .get('/order')
                .then(res => {
                    const orders = res.data.orders.find(order => {
                        let flag = false;
                        for (let i=0; i<order.products.length; i++){
                            if (order.products[i].detail.product === productId)
                                flag = true;
                        }
                        return flag && order.status==='Đã nhận';
                    })
                    setOrder(orders);
                })
        }

        getOrdersByUser()
    }, [productId])

    const handleFormSubmit = async (e) =>{

        e.preventDefault();

        if(rating===0 || content===''){
            setShowToast(true)
            setInforMessage({
                type : 'danger',
                title : 'Bình luận lỗi!!!',
                description: 'Bình luận hoặc đánh giá không hợp lệ'
            })
            return;
        }

        try {
            await request
                .post(`/comment?productId=${productId}`,{
                    rate:rating,
                    content
                })
                .then(res => {
                    if(res.data.success){
                        setComments(prev=>[...prev,res.data.comment])
                        setRating(0)
                        setContent('')
                        setShowToast(true)
                        setInforMessage({
                            type : 'success',
                            title : 'Bình luận !',
                            description: 'Bình luận thành công :))'
                        })
                        setCommentUser(res.data.comment)
                    }
                })
        } catch (error) {
            
        }
        
    }

    const Title = () => {
        return (
            <>
                {order ? 
                    <h6 className='text-danger'>Bạn đã mua sản phẩm này {moment(order.createdAt).fromNow()}</h6> :
                    <h6 className='text-danger'>Bạn chưa mua sản phẩm này, không thể đánh giá</h6>
                }
                <h5 className={!order ? 'text-secondary' : ''}>Đánh giá sản phẩm này</h5>
            </>
        )
    }

    const Rate = () => {
        const stars = [];
        for (let i=1; i<=5; i++){
            i<=rating ? 
            stars.push(<AiFillStar onClick={() => setRating(i)} key={i} />) : 
            stars.push(<AiOutlineStar onClick={() => setRating(i)} key={i} />)
        }

        let starsDisable = [];
        for (let i=1; i<=5; i++){ 
            starsDisable.push(<AiOutlineStar key={i} />)
        }

        return (
            <span className={!order ? cx('iconDisable') : cx('icon')}>
                {
                    !order ? starsDisable.map(star => star) : stars.map(star => star)
                }
            </span>
        )
    }

    return (
        <div className={`${cx('wrapper')}`}>
            <Title />
            <Rate />
            <Form onSubmit={(e) => handleFormSubmit(e)} className='d-flex'>
                <Form.Control
                    placeholder="Nhập bình luận"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={!order}
                />
                <Button
                    disabled={content==='' || rating===0}
                    type='submit'
                    variant="outline-primary"
                >
                    <RiSendPlaneFill />
                </Button>
            </Form>
        </div>
    );
}

export default NewComment;

import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import classNames from 'classnames/bind';
import moment from 'moment';
import 'moment/locale/vi'

import styles from './EditComment.module.scss';
import request from '../../../utils/request';
import { MessageContext } from '../../../context/MessageContext';

const cx=classNames.bind(styles);

function EditComment({commentUser, setCommentUser}) {
    const [rating, setRating] = useState(commentUser.rate);
    const [content, setContent] = useState(commentUser.content);
    const { setShowToast, setInforMessage} = useContext(MessageContext);

    const Title = () => {
        return (
            <>
                <h5 className='text-primary'>Bình luận của bạn</h5>
            </>
        )
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        
        const updateComment = async () => {
            await request 
                .put(`/comment/${commentUser._id}`, {
                    rate: rating,
                    content
                })
                .then(res => {
                    if (res.data.success) {
                        setShowToast(true);
                        setInforMessage({
                            type: 'success',
                            title: 'Thông báo',
                            description: 'Cập nhật bình luận thành công'
                        });
                        setCommentUser(res.data.updateComment);
                    }   
                })
        }

        updateComment();
    }

    const Rate = () => {
        const stars = [];
        for (let i=1; i<=5; i++){
            i<=rating ? 
            stars.push(<AiFillStar onClick={() => setRating(i)} key={i} />) : 
            stars.push(<AiOutlineStar onClick={() => setRating(i)} key={i} />)
        }

        return (
            <span className={cx('icon')}>
                {
                    stars.map(star => star)
                }
            </span>
        )
    }

    return (
        <div className={`${cx('wrapper')}`}>
            <Title />
            <Rate />
            <Form onSubmit={(e) => handleFormSubmit(e)}>
                <Row>
                    <Col xl={9}>
                        <Form.Control
                            placeholder="Nhập bình luận"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button
                            disabled={content==='' || rating===0}
                            type='submit'
                            variant="outline-success"
                        >
                            Cập nhật
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default EditComment;

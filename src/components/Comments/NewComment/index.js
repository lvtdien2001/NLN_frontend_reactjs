import React, { useState, useEffect,useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import request from '../../../utils/request';
import { MessageContext } from '../../../context/MessageContext';


function NewComment({productId,setComments}) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const { setShowToast, setInforMessage} = useContext(MessageContext);


 
  
  
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
                content,
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
            
            }})
    } catch (error) {
        
    }
    
 }

  return (
    <>
        <Modal.Header >
          <Modal.Title>Tạo Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label>Noi dung Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Danh gia san pham</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option>Danh gia</option>
                <option value={1}>1-Sao</option>
                <option value={2}>2-Sao</option>
                <option value={3}>3-Sao</option>
                <option value={4}>4-Sao</option>
                <option value={5}>5-Sao</option>
              </Form.Select>
            </Form.Group>
            <Button type='submit' variant="secondary" onClick={(e) => handleFormSubmit(e)}  >
                Submit
            </Button>
          </Form>
              
        </Modal.Body>
    </>
  );
}

export default NewComment;

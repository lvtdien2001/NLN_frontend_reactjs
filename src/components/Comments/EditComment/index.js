import React, { useState, useEffect,useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import request from '../../../utils/request';
import { MessageContext } from '../../../context/MessageContext';


function EditComment({commentId,setComments,userId,contents,rates}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState('0');
  const [content, setContent] = useState('');
  const [putComment, setPutComment] = useState(null)
  const { setShowToast, setInforMessage} = useContext(MessageContext);
 

 const handleFormSubmit = async (e) =>{
  e.preventDefault()
    try {
      await request
        .put(`/comment/${commentId}`,{
          rate:rating,
          content,})
          .then(res => {
            if(res.data.success){
                setComments(prev=> prev.map(comment => comment._id === commentId ? res.data.updateComment : comment))
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
      <div variant="primary" onClick={handleShow}>
        <AiOutlineEdit />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Noi dung Comment</Form.Label>
              <Form.Control
                placeholder={contents}
                as="textarea"
                rows={5}
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
                <option>{rates}-sao</option>
                <option value="1">1-Sao</option>
                <option value="2">2-Sao</option>
                <option value="3">3-Sao</option>
                <option value="4">4-Sao</option>
                <option value="5">5-Sao</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Exit
          </Button>
          <Button variant="primary" type="submit" onClick={handleFormSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditComment;

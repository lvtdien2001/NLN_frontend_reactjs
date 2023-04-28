import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import styles from './AddDetail.module.scss';
import { Form } from 'react-bootstrap';
import { AiFillDelete, AiOutlineFileImage } from 'react-icons/ai';
import { MessageContext } from '../../../context/MessageContext';
import { DetailContext } from '../../../context/DetailContext';
import CustomSpinner from '../../CustomSpinner';
import { ProductContext } from '../../../context/ProductContext';





const cx = classNames.bind(styles);
function AddDetail({product}) {
  const {setShowToast, setInforMessage} = useContext(MessageContext);
  const {createNewDetail} = useContext(DetailContext)
  const {call, setCall} = useContext(ProductContext)
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    price: 0,
    size: '',
    quantiy:1,
    color:''
  })
  const {price, size, quantity, color} = data;
  const handleChangeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
   
    
  }
  const [ avatarDefault, setAvatarDefault] = useState(); 
  const [file, setFile] = useState(null)

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    file.preview = URL.createObjectURL(file);
    // console.log(file.preview)
    setAvatarDefault(file.preview);
    setFile(e.target.files[0])
  }
  useEffect(() => {
      
    
      return () => {
          avatarDefault &&  URL.revokeObjectURL(avatarDefault.preview)
        }
  }, [avatarDefault])
  const handleDeleteImage = () => {
    setAvatarDefault(null);
    setFile(null)
  }
  const handleAddDetail = async (e)=> {
    e.preventDefault();
    if(!file) {
      setShowToast(true);
      setInforMessage({
        type: 'warning',
        description: 'Không có ảnh !',
        title: 'Hình ảnh chi tiết'
      })
      return ;
    }
    const form = e.currentTarget;
            if (form.checkValidity() === false) {
                
                e.stopPropagation();
                setValidated(true);
                return;
            }
    try {
      const formData = new FormData();
      formData.append('image',file);
      formData.append('size',size);
      formData.append('price',price);
      formData.append('quantity', quantity);
      formData.append('color',color);
      setLoading(true)
      const res = await createNewDetail(formData, product._id);
      // console.log(res);
      if(res.success) {
        setShowToast(true);
        setInforMessage({
          type: 'success',
          description: 'thành công !',
          title: 'Thêm chi tiết sản phẩm'
        })
        setData({
          price: 0,
          size: '',
          quantiy:1,
          color:''
        })
        setAvatarDefault(null);
        setFile(null);
        setLoading(false)
        setCall(!call)
        handleClose();
      }

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm chi tiết sản phẩm
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleAddDetail}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Giá tiền:</Form.Label>
                        <Form.Control 
                            type="number" 
                            name='price'
                            min={1}
                            placeholder='Nhập Giá tiền'
                            value={price}
                            onChange={handleChangeData}
                            required
                        /> 
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Màu sắc:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập màu sắc"
                            name='color'
                            value={color}
                            onChange={handleChangeData}
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control 
                            type='number'
                            min={1} 
                            placeholder="Nhập Số lượng"
                            name='quantity'
                            value={quantity}
                            onChange={handleChangeData}
                           
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Size:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập kích cỡ"
                            name='size'
                            value={size}
                            onChange={handleChangeData}
                           
                        />
                        
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label className={cx('label-image')} >Chọn hình ảnh: <AiOutlineFileImage className={cx('image-icon')} /></Form.Label>
                        <Form.Control 
                            className={cx('input-image')} 
                            type="file" 
                            placeholder="Nhập tên sản phẩm"
                            onChange={handleChangeAvatar}
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        
                    </Form.Group>
                    <Form.Group>
                      
                    {avatarDefault && <div>
                      <img style={{width:'200px',height:'200px'}} src={avatarDefault} alt='detail' />
                      <Button onClick={handleDeleteImage} variant='outline-danger'><AiFillDelete /></Button>
                    </div> }
                    
                    </Form.Group>
                    <Form.Group style={{textAlign:'right'}}>

                        <Button style={{marginRight: '10px'}} variant="outline-secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        {loading ? <CustomSpinner /> : 
                        <Button variant="primary" type='submit'>
                            Thêm
                        </Button>
                        }
                    </Form.Group>
                    
                </Form>
                </Modal.Body>
        
      </Modal>
    </>
  );
}

export default AddDetail
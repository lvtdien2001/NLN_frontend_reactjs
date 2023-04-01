import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { MessageContext } from '../../context/MessageContext';

function Register(){
    const {registerUser} = useContext(AuthContext);
    const {setInforMessage, setShowToast} = useContext(MessageContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',  
        gender: '', 
        fullName: '',
        confirmPassword: ''
    })
    
    const {username, password, gender, fullName, confirmPassword} = formData
   
    const handleChangeData = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
       
        
      }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
            if (form.checkValidity() === false) {
                
                e.stopPropagation();
                setValidated(true);
                return;
            }

            if(formData.password !== formData.confirmPassword) {
                setShowToast(true);
                setInforMessage({type: 'warning', title:'Xác nhận mật khẩu', description: 'Xác nhận mật khẩu sai !!'});
                return;
            }
        
        try {
            const res = await registerUser(formData);
            if(res.success) {
                setShowToast(true);
                setInforMessage({type: 'success', title:'Đăng ký', description: 'Chúc mừng bạn đã đăng ký thành công !!'});
                return navigate('/');
            } else {
                setShowToast(false);
                setInforMessage({type: 'danger', title:'Đăng ký', description: res.message })
            }
        } catch (error) {
            setShowToast(true);
            setInforMessage({type: 'danger', title:'Lỗi hệ thống', description: 'Vui lòng đăng ký lại !!'})
        }
    }
    return (
        <>
            <div variant="primary" onClick={handleShow}>
                Tạo tài khoản mới?
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Tạo Tài Khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='fullName'
                            value={fullName}
                            onChange={handleChangeData}
                            placeholder="Nhập họ và tên"
                            required
                        /> 
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Tên tài khoản</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập tên tài khoản"
                            name='username'
                            value={username}
                            onChange={handleChangeData} 
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Nhập mật khẩu"
                            name='password'
                            value={password}
                            onChange={handleChangeData} 
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Nhập lại mật khẩu"
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleChangeData} 
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select 
                            aria-label="Default select example"
                            name='gender'
                            value={gender}
                            onChange={handleChangeData}
                            required
                        >
                            <option value=''>Chọn giới tính</option>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </Form.Select>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{textAlign:'right'}}>

                        <Button style={{marginRight: '10px'}} variant="outline-secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" type='submit'>
                            Đăng Ký
                        </Button>
                    </Form.Group>
                </Form>
                </Modal.Body>
               
            </Modal>
        </>
    )
}

export default Register

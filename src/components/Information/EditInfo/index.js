import { useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';

import CustomToast from '../../CustomToast';
function EditInfo() {
    const {authState: {user}, updateUser, setShowToast} = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type:'',
        description:'',
        title:''
    })
    const {type, description, title} = message;
    const [info, setInfo] = useState({
        fullName: user.fullName,
        gender: user.gender,
        phoneNumber: user.phoneNumber
    })

    const {fullName, gender, phoneNumber} = info;

    const handleChangeData = (e) => {
        setInfo({
          ...info,
          [e.target.name]: e.target.value
        })
        console.log(e.target.value)
        
      }
    
    const handleClose = () => {
        setShow(false)
        setInfo({
            fullName: user.fullName,
            gender: user.gender,
            phoneNumber: user.phoneNumber
        })
    };
    const handleShow = () => setShow(true);

    const handleSubmitUpdateInformation = async (e) => {
        e.preventDefault();
        if (!fullName || !phoneNumber) {
            setShowToast(true);
            setMessage({type:'Danger', title:'Lỗi cập nhật',description:'Bạn điền thiếu thông tin rồi !'});
            handleShow();
            return;
        }
        if (user.fullName === fullName && user.gender === gender && user.phoneNumber === phoneNumber) {
            setShowToast(true);
            setMessage({type:'Info', title:'Trạng thái',description:'Không có gì để cập nhật !'});
            handleClose();
            return;
        }
        try {
            const regPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
            if (!regPhone.test(phoneNumber)) {
                
                setShowToast(true);
                setMessage({type:'Danger', title:'Số điện thoại',description:'Số điện thoại không đúng !'});
                handleShow();
               
                return;
            }

            const res = await updateUser(info);
            console.log(res)
            if(res.success) {
                setShowToast(true);
                setMessage({type:'Success', title:'cập nhật thành công',description:res.message});
                setShow(false)
            }

        } catch (error) {
            
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Sửa
            </Button>
        <CustomToast title={title} description={description} type={type} />
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sửa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập họ và tên" 
                                autoFocus 
                                name='fullName'
                                onChange={handleChangeData}
                                value={fullName} 
                            />
                        </Form.Group>
                        <Form.Group 
                            className="mb-3" 
                            controlId="formBasicPassword"     
                        >
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select 
                                aria-label="Default select example"
                                name='gender'
                                onChange={handleChangeData} 
                                value={gender}

                            >
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </Form.Select>
                        </Form.Group>
                    
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Số điện thoại"
                                name="phoneNumber"
                                onChange={handleChangeData} 
                                value={phoneNumber}/>
                        </Form.Group>
                    
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSubmitUpdateInformation(e)}>
                        Thêm
                </Button>
                </Modal.Footer>
        </Modal>
    </>
)
}

export default EditInfo

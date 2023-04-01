
import classNames from "classnames/bind";
import { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

import Register from '../Register';
import styles from './Login.module.scss';
import { AuthContext } from "../../context/AuthContext";


const cx = classNames.bind(styles);

function Login(){
    const {loginUser, setShowToast, setInforMessage} = useContext(AuthContext)
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })

    const {username, password} = formData;
    const handleChangeData = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
        console.log(e.target.value)
        
      }

    const handleSubmitLogin = async (e) => {
            e.preventDefault();
        try {
            const response = await loginUser(formData)
            if(response.success) {
                setShowToast(true);
                setInforMessage({type:'success', title: 'Đăng nhập', description:'bạn đã đăng nhập thành công !!'})
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={`${cx('wrapper')} row justify-content-center`}>
            <div className={`col-sm-5 ${cx('layout')}`}>
                <div className={`text-center ${cx('title')}`}>ĐĂNG NHẬP</div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập tên tài khoản"
                            name="username"
                            value={username}
                            onChange={handleChangeData} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={handleChangeData} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                        <Form.Check className={`${cx('check-box')}`} type="checkbox" label="Nhớ mật khẩu" />
                        <Link to=''>Quên mật khẩu</Link>
                    </Form.Group>
                    <div className="text-end row justify-content-around">
                        <div className={`text-start col-sm-5 ${cx('txt-register')}`}>
                            <Register/>
                        </div>
                        <div className="col-sm-5">
                            <Button 
                                variant="primary" 
                                type="submit"
                                onClick={(e) => handleSubmitLogin(e)}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login

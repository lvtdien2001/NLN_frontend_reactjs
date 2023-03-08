
import classNames from "classnames/bind";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

import Register from '../Register';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login(){

    return (
        <div className={`${cx('wrapper')} row justify-content-center`}>
            <div className={`col-sm-5 ${cx('layout')}`}>
                <div className={`text-center ${cx('title')}`}>ĐĂNG NHẬP</div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control type="email" placeholder="Nhập tên tài khoản" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Nhập mật khẩu" />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                        <Form.Check className={`${cx('check-box')}`} type="checkbox" label="Nhớ mật khẩu" />
                        <Link to=''>Quên mật khẩu</Link>
                    </Form.Group>
                    <div className="text-end row justify-content-around">
                        <div
                            className={`text-start col-sm-5 ${cx('txt-register')}`}>
                                <Register/>
                            </div>
                        <div className="col-sm-5">
                            <Button variant="primary" type="submit">
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

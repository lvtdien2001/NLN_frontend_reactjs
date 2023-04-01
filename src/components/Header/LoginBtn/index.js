import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './LoginBtn.module.scss';

const cx=classNames.bind(styles);

const LoginBtn = () => {
    return (
        <Button className={`${cx('contentCenter')}`} variant='light'>
            <Link className={cx('hrefUnderline')} to='/auth'>
                Đăng nhập
            </Link>
        </Button>
    )
}

export default LoginBtn

import { useContext } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { AiOutlineUser, AiOutlineFileText, AiOutlineLogout } from 'react-icons/ai';
import { FaUsers, FaRegAddressCard } from 'react-icons/fa';
import { RiBillLine } from 'react-icons/ri';
import { MdDevicesOther, MdOutlinePayment } from 'react-icons/md';

import { AuthContext } from '../../../context/AuthContext';

import styles from './DropdownContent.module.scss';

const cx=classNames.bind(styles);

const DropdownContent = () => {
    const { logOutUser, authState } = useContext(AuthContext);
    const { isAdmin } = authState.user;

    const Admin = () => {
        return (
            <>
                <Dropdown.Item as='div'>
                    <Link className={cx('hrefUnderline')} to='/admin/users'>
                        <FaUsers /> Quản lý người dùng
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item as='div'>
                    <Link className={cx('hrefUnderline')} to='/admin/orders'>
                        <RiBillLine /> Quản lý đơn hàng
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item as='div'>
                    <Link className={cx('hrefUnderline')} to='/admin/products'>
                        <MdDevicesOther /> Quản lý sản phẩm
                    </Link>
                </Dropdown.Item>

                <Dropdown.Divider />
            </>

        )
    }

    return (
        <DropdownButton
            align="end"
            title={<AiOutlineUser />}
            id="dropdown-menu-align-end"
            variant='light' 
            className={cx('contentCenter', 'user')}
        >
            <Dropdown.Item as='div'>
                <Link className={cx('hrefUnderline')} to='/profile'>
                    <AiOutlineUser /> Thông tin cá nhân
                </Link>
            </Dropdown.Item>
            <Dropdown.Item as='div'>
                <Link className={cx('hrefUnderline')} to='/profile'>
                    <FaRegAddressCard /> Quản lý địa chỉ
                </Link>
            </Dropdown.Item>
            <Dropdown.Item as='div'>
                <Link className={cx('hrefUnderline')} to='#'>
                    <MdOutlinePayment /> Tài khoản thanh toán
                </Link>
            </Dropdown.Item>
            <Dropdown.Item as='div'>
                <Link className={cx('hrefUnderline')} to='#'>
                    <AiOutlineFileText /> Lịch sử giao dịch
                </Link>
            </Dropdown.Item>

            <Dropdown.Divider />
            
            {isAdmin && <Admin />}

            <Dropdown.Item as='div'  onClick={logOutUser}>
                <Link className={`${cx('hrefUnderline')} text-danger`} >
                    <AiOutlineLogout /> Đăng xuất
                </Link>
            </Dropdown.Item>
        </DropdownButton>
    )
}

export default DropdownContent

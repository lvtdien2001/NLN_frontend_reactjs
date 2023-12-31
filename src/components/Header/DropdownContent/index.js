import { useContext } from 'react';
import classNames from 'classnames/bind';
import { Link} from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { AiOutlineUser, AiOutlineFileText, AiOutlineLogout } from 'react-icons/ai';
import { FaUsers, FaRegAddressCard } from 'react-icons/fa';
import { RiBillLine } from 'react-icons/ri';
import { MdDevicesOther } from 'react-icons/md';

import { AuthContext } from '../../../context/AuthContext';

import styles from './DropdownContent.module.scss';

const cx=classNames.bind(styles);

const DropdownContent = () => {
    const { logOutUser, authState } = useContext(AuthContext);
    const { isAdmin } = authState.user;

    // const navigate = useNavigate();

    // const handleNavigation = (path) => {
    //     navigate(path);
    // }
    
    const Admin = () => {
        return (
            <>
                <Link className={cx('hrefUnderline')} to='/admin/users'>
                    <Dropdown.Item as='div'>
                        <FaUsers /> Quản lý người dùng
                    </Dropdown.Item>
                </Link>
                <Link className={cx('hrefUnderline')} to='/admin/orders'>
                    <Dropdown.Item as='div'>
                        <RiBillLine /> Quản lý đơn hàng
                    </Dropdown.Item>
                </Link>
                <Link className={cx('hrefUnderline')} to='/admin/products'>
                    <Dropdown.Item as='div'>
                        <MdDevicesOther /> Quản lý sản phẩm
                    </Dropdown.Item>
                </Link>
                <Link className={cx('hrefUnderline')} to='/admin/grossing'>
                    <Dropdown.Item as='div'>
                        <MdDevicesOther /> Quản lý doanh thu
                    </Dropdown.Item>
                </Link>

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
            
            <Link className={cx('hrefUnderline')} to='/profile'>
                <Dropdown.Item as='div' >
                    <AiOutlineUser /> Thông tin cá nhân
                </Dropdown.Item>
            </Link>
            
            <Link className={cx('hrefUnderline')} to='/address'>
                <Dropdown.Item as='div'>
                    <FaRegAddressCard /> Quản lý địa chỉ
                </Dropdown.Item>
            </Link>
            {/* <Link className={cx('hrefUnderline')} to='/profile/payment'>
                <Dropdown.Item as='div'>
                    <MdOutlinePayment /> Tài khoản thanh toán
                </Dropdown.Item>
            </Link> */}
            <Link className={cx('hrefUnderline')} to='/orders'>
                <Dropdown.Item as='div'>
                    <AiOutlineFileText /> Lịch sử mua hàng
                </Dropdown.Item>
            </Link>

            <Dropdown.Divider />
            
            {isAdmin && <Admin />}

            <Link className={`${cx('hrefUnderline')}`} >
                <Dropdown.Item className='text-danger' as='div'  onClick={logOutUser}>
                    <AiOutlineLogout /> Đăng xuất
                </Dropdown.Item>
            </Link>
        </DropdownButton>
    )
}

export default DropdownContent

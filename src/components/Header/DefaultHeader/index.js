import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

// bootstrap
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

// icons
import { BsFillPhoneFill, BsLaptop, BsSmartwatch, BsCart } from 'react-icons/bs';
import { FaTabletAlt } from 'react-icons/fa';
import { MdDevicesOther, MdOutlineContactSupport } from 'react-icons/md';

import { AuthContext } from '../../../context/AuthContext';
import InputSearch from '../../InputSearch';
import logo from '../../../public/images/logo.png';
import styles from './DefaultHeader.module.scss'
import DropdownContent from '../DropdownContent';
import LoginBtn from '../LoginBtn';

const cx = classNames.bind(styles);

function DefaultHeader () {
    const listCategorys = [
        {
            id: 1,
            title:'Điện thoại',
            icon: <BsFillPhoneFill />,
            link: '/products/64294f88114ebb28aba2be16'
        },
        {
            id: 2,
            title:'Laptop',
            icon: <BsLaptop />,
            link: '/products/64295042114ebb28aba2be29'
        },
        {
            id: 3,
            title:'Máy tính bảng',
            icon: <FaTabletAlt />,
            link: '/products/642950cf114ebb28aba2be30',
        },
        {
            id: 4,
            title:'Đồng hồ',
            icon: <BsSmartwatch />,
            link: '/products/64295108114ebb28aba2be37',
        },
        {
            id: 5,
            title:'Phụ kiện',
            icon: <MdDevicesOther />,
            link: '/products/64299a75b50fdf833156df9b',
        },

    ];
    const bodyCategorys = listCategorys.map((category) => (
        <Link key={category.id} to={category.link} className={cx('menuList')}>
            {category.icon}
            {category.title}
        </Link>
    ))
    
    const { authState } = useContext(AuthContext);
    // console.log(authState);
    return (
        <header className={`container ${cx('header')}`}>
            <div className='row d-flex justify-content-between'>
                <div className={`col-sm-6 col-xl-8 ${cx('leftHeader')}`}>
                    <Navbar expand="lg">
                        <Container className={cx('bg')} fluid>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Brand as='span'>
                                <Link to='/' className={cx('hrefUnderline')} >
                                    <img src={logo} width='60px' height='60px' alt='logo' />
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    navbarScroll
                                >
                                    {bodyCategorys}                  
                                </Nav>
                            </Navbar.Collapse>
                    
                        </Container>
                    </Navbar>
                </div>
                <div className={`col-sm-6 col-xl-4 ${cx('rightHeader')}`}>
                    <div className={`d-flex justify-content-end ${cx('alignCenter')}`} >
                        <Link to='/support' className={cx('hrefUnderline')}>
                            <Button className={cx('support', 'contentCenter')} variant='light'>
                                <MdOutlineContactSupport /> Hỗ trợ
                            </Button>
                        </Link>
                        <Link className={cx('hrefUnderline')} to='/cart'>
                            <Button className={cx('cart', 'contentCenter')} variant='light'>
                                <BsCart /> Giỏ hàng
                            </Button>
                        </Link>
                        {authState.isAuthenticated ? <DropdownContent /> : <LoginBtn />}
                        
                    </div>
                    <InputSearch />
                </div>
            </div>
        </header>
    )
}

export default DefaultHeader

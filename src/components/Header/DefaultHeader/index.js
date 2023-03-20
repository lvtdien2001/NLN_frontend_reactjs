import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

// bootstrap
import { Container, Nav, Navbar, Dropdown, DropdownButton, ListGroup, Button } from 'react-bootstrap';
import { BsFillPhoneFill, BsHeadphones, BsLaptop, BsSmartwatch, BsCart } from 'react-icons/bs';

// icons
import { GrMemory } from 'react-icons/gr';
import { MdDevicesOther, MdOutlineContactSupport } from 'react-icons/md';
import { AiOutlineUser, AiOutlineFileText, AiOutlineLogout } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { RiBillLine } from 'react-icons/ri';


import InputSearch from '../../InputSearch';
import logo from '../../../public/images/logo.png';
import styles from './DefaultHeader.module.scss'

const cx = classNames.bind(styles);

function DefaultHeader () {
    const listCategorys = [
        {
            id: 1,
            title:'Điện thoại',
            icon: <BsFillPhoneFill />,
            link: '/products'
        },
        {
            id: 2,
            title:'Laptop',
            icon: <BsLaptop />,
            link: '/products'
        },
        {
            id: 3,
            title:'Âm thanh',
            icon: <BsHeadphones />,
            link: '/products',
        },
        {
            id: 4,
            title:'Đồng hồ',
            icon: <BsSmartwatch />,
            link: '/products',
        },
        {
            id: 5,
            title:'Bộ nhớ',
            icon: <GrMemory />,
            link: '/products',
        },
        {
            id: 6,
            title:'Phụ kiện',
            icon: <MdDevicesOther />,
            link: '/products',
        },

    ];
    const bodyCategorys = listCategorys.map((category) => (
        <ListGroup horizontal key={category.id} >
            <ListGroup.Item className={cx('list-item')}>
                <Link className={cx('sideBar')} to={category.link}>
                    <div className={cx('contentCenter')}>
                       <div className={cx('item-icon')}>
                            {category.icon}
                        </div>
                    </div>
                </Link>
            </ListGroup.Item>
        </ListGroup>
    ))
    return (
        <header className={`container ${cx('header')}`}>
            <div className='row d-flex justify-content-between'>
                <div className={`col-sm-6 col-xl-8 ${cx('leftHeader')}`}>
                    <Navbar bg="light" expand="lg">
                        <Container fluid>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Brand as='span'>
                                <Link to='/' className={cx('hrefUnderline')} >
                                    <img src={logo} width='60px' height='60px' alt='logo' />
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Collapse id="navbarScroll">
                    
                                        <Nav
                                            className="me-auto my-2 my-lg-0"
                                            style={{ maxHeight: '100px' }}
                                            navbarScroll
                                        >
                                            <Nav.Link href="#action1">Home</Nav.Link>
                                            <Nav.Link href="#action2">Link</Nav.Link>
                                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action4">
                                                Another action
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action5">
                                                Something else here
                                            </NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link href="#" disabled>
                                            Link
                                            </Nav.Link>
                                        </Nav>
                    
                    
                    
                    
                            </Navbar.Collapse>
                    
                        </Container>
                    </Navbar>
                </div>
                <div className={`col-sm-6 col-xl-4 ${cx('rightHeader')}`}>
                    <div className='d-flex justify-content-end' >
                        <Button className={cx('support', 'contentCenter')} variant='light'>
                            <Link to='/support' className={cx('hrefUnderline')}>
                                <MdOutlineContactSupport /> Hỗ trợ
                            </Link>
                        </Button>
                        <Button className={cx('cart', 'contentCenter')} variant='light'>
                            <Link className={cx('hrefUnderline')} to='/cart'>
                                <BsCart /> Giỏ hàng
                            </Link>
                        </Button>
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
                                <Link className={cx('hrefUnderline')} to='#'>
                                    <AiOutlineFileText /> Lịch sử giao dịch
                                </Link>
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item as='div'>
                                Admin
                            </Dropdown.Item>
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

                            <Dropdown.Item as='div'>
                                <Link className={`${cx('hrefUnderline')} text-danger`} to='/profile'>
                                    <AiOutlineLogout /> Đăng xuất
                                </Link>
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <InputSearch />
                </div>
            </div>
        </header>
    )
}

export default DefaultHeader

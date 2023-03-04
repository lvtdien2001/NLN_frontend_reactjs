import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import InputSearch from '../../InputSearch';

import styles from './DefaultHeader.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultHeader () {
    
    return (
        <header className={`container ${cx('header')}`}>
            <div className='row d-flex'>
                <div className='col-6'>
                    <Navbar bg="light" expand="lg">
                        <Container fluid>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
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
                <div style={{margin: '10px 0px'}} className='col-6'>
                    <div className='d-flex justify-content-end' >
                        <Button style={{ marginRight: '5px', padding: '8px' }}>Đăng nhập</Button>
                        <Button style={{ marginLeft: '5px', padding: '8px' }}>Đăng ký</Button>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-6 col-md-6'>
                    <InputSearch />
                </div>
            </div>
        </header>
    )
}

export default DefaultHeader

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';

import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

const Nav = ({ content }) => {

    return (
            <div className={cx('wrapper')}>
                <Row className='justify-content-center'>
                    <Col xl={10}>
                        <Link className={`${cx('link')}`} to='/'>TRANG CHỦ</Link>
                        {content.map(element => {
                            return (
                                <span key={element.id} >
                                    &gt;
                                    <Link
                                        to={element.url}
                                        className={`${cx('link')}`}
                                    >
                                        {element.name}
                                    </Link>
                                </span>
                            )
                        })}
                    </Col>
                </Row>
            </div>
    )
}

export default Nav

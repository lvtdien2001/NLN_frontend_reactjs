import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './InputSearch.module.scss';

const cx = classNames.bind(styles);

function InputSearch() {
    const [valueSearch, setValueSearch] = useState('');

    const handleChange = (e) => {
        if (e.key === 'Enter'){
            console.log('Enter');
        }
        else {
            setValueSearch(e.target.value);
        }
    }

    const handleSubmit = () => {

    }

    return (
        <Form className={`d-flex ${cx('searchForm')}`} onSubmit={handleSubmit}>
            <Form.Control
            type="search"
            value={valueSearch}
            onChange={(e) => handleChange(e)}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
            <Button className={cx('btnSearch')} variant="outline-primary">
                <Link to='/search'>
                    <BsSearch />
                </Link>
            </Button>
        </Form>
    )
}

export default InputSearch

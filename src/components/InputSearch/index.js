import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './InputSearch.module.scss';

const cx = classNames.bind(styles);

function InputSearch() {
    const [valueSearch, setValueSearch] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valueSearch.length > 0){
            navigate(`/search/${valueSearch}`);
            setValueSearch('');
        }
    }

    return (
        <Form className={`d-flex ${cx('searchForm')}`} onSubmit={handleSubmit}>
            <Form.Control
            type="search"
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            required
            />
            <Button 
                className={cx('btnSearch')} 
                variant="outline-primary"
                onClick={handleSubmit}
            >
                <BsSearch />
            </Button>
        </Form>
    )
}

export default InputSearch

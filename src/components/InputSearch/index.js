import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';

function InputSearch() {
    const [valueSearch, setValueSearch] = useState('');

    return (
        <Form className="d-flex">
            <Form.Control
            type="search"
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
            <Button variant="outline-primary"><BsSearch /></Button>
        </Form>
    )
}

export default InputSearch

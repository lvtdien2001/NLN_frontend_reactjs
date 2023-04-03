import React, {useContext} from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { ProductContext } from '../../context/ProductContext';
const PaginationPage = () => {
    const {pageNumber, setPageNumber} = useContext(ProductContext)
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} onClick={() => setPageNumber(number)} active={number === pageNumber}>
            {number}
            </Pagination.Item>,
        );
    }
  return (
    <Pagination size="sm">{items}</Pagination>
  )
}

export default PaginationPage
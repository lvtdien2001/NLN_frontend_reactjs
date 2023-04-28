import React, {  useContext, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import CustomSpinner from '../../CustomSpinner';
import classNames from 'classnames/bind';
import styles from './InfoDetail.module.scss';
import AddDetail from '../AddDetail';
import { DetailContext } from '../../../context/DetailContext';
import RemoveDetailProduct from '../RemoveDetailProduct';
import EditDetail from '../EditDetail';





const cx = classNames.bind(styles);
const InfoDetail = ({detailProduct, product}) => {
    const {detailState: {detailLoading}} = useContext(DetailContext)
    const formatPrice = price => {
        if (price.length <= 3)
            return price;

        let priceFormat = [];
        for (let i=price.length; i>0; i-=3)
            priceFormat.push(price.substring(i-3, i));

        return priceFormat.reverse().join('.');
    }
    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    
    const bodyDetail = detailProduct.map((item, index) => (
        <tr key={item?._id} className={item?.quantity <= 10 ? cx('tr') : ''}>
            <td className="text-center">{index+1}</td>

            
            <td className="text-center">
                {item?.size}
            </td>
            <td className="text-center">
                {item?.color}
            </td>
            <td className="text-center">
                {formatPrice(item?.price.toString())} ₫
            </td>
            <td className="text-center">
                {item?.quantity}
            </td>
            <td className="text-center">
                <EditDetail data={item} />
                <RemoveDetailProduct id={item._id} />
            </td>
    </tr>
    ))
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Xem chi tiết
        </Button>
  
        <Modal  size='xl' show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body className={cx('modal')}>
            <AddDetail product={product} />
            <span className={`row justify-content-center`}>
                <span className='col-sm-10 '>
                    
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th className={`${cx('stt')}`}>STT</th>
                                <th className={cx('name')}>Size</th>
                               
                                
                                <th className={cx('detail')}>Màu sắc</th>
                                <th className={cx('icon')}>Giá tiền</th>
                                <th className={cx('icon')}>Số lượng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailLoading ? <CustomSpinner /> : bodyDetail }
                        </tbody>
                        
                    </Table>
                    
                </span>
            </span>
             
          </Modal.Body>
          
        </Modal>
      </>
    );
}

export default InfoDetail
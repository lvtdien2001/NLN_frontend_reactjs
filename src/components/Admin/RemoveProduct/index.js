import { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';

import styles from './RemoveProduct.module.scss';
import { ProductContext } from '../../../context/ProductContext';
import { MessageContext } from '../../../context/MessageContext';
import CustomSpinner from '../../CustomSpinner';

const cx = classNames.bind(styles);

function RemoveProduct({id}) {
    const {deleteProduct} = useContext(ProductContext)
    const {setShowToast, setInforMessage} = useContext(MessageContext)
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDeleteProduct = async (id) => {
        setLoading(true)
        const res = await deleteProduct(id)
        if(res.success) {
            setShowToast(true)
            setInforMessage({
                type: 'success',
                description: 'thành công',
                title: 'Xóa sản phẩm'
            })
            setShow(false)
            setLoading(false)
        }
    }
    return (
        <>
            <FaTrash className={cx('removeIcon')} onClick={handleShow} />
            
            <Modal 
                show={show} 
                onHide={handleClose}
                centered
            >
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi hệ thống?
                </Modal.Body>
                <Modal.Footer>
                    {loading ? <CustomSpinner /> :
                    <Button variant="danger" onClick={() => handleDeleteProduct(id)}>
                        Có
                    </Button>
                    }
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RemoveProduct

import { OverlayTrigger, Tooltip, Table, Col, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './TooltipDetail.module.scss';

const cx = classNames.bind(styles);

const TooltipDetail = ({order}) => {
    const formatName = name => {
        if (name?.length <= 40)
            return name;
        return name?.substring(0, 40) + '...'
    }

    const renderTooltip = (props) => (
        <Tooltip 
            id="span-tooltip" 
            className={cx('layout')}
            {...props}
        >
            <Table className='text-light' striped >
                <tbody>
                    {order?.products?.map((product, index) => {
                        const name = product?.name;
                        const color = product?.detail?.color;
                        const image = product?.detail?.image;
                        return (
                            <tr key={product._id}>
                                <td>
                                    <Row style={{width: '700px'}}>
                                        <Col xl={2}><img src={image} alt='Hinh anh' width='100px' height='70px' /></Col>
                                        <Col className='text-primary text-start'>
                                            <b>{formatName(name)}</b>
                                            <p className='text-secondary'>Màu: {color}</p>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Tooltip>
    );
    
    return (
        <OverlayTrigger
            placement="right"
            overlay={renderTooltip}
            
        >
            <span>Xem chi tiết đơn hàng</span>
        </OverlayTrigger>
    );
}

export default TooltipDetail

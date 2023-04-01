import React, { useContext } from 'react'
import {Toast} from 'react-bootstrap';
import { MessageContext } from '../../context/MessageContext';
import classNames from "classnames/bind";
import styles from './CustomToast.module.scss';



const cx = classNames.bind(styles);
const CustomToast = ({type, description,title}) => {
    const {showToast, setShowToast} = useContext(MessageContext)
  return (
    <div
      className={cx('position')}
    >
   

        <Toast
            
            bg={type.toLowerCase()}
            autohide
            delay={4000}
            show={showToast}
            onClose={() => setShowToast(false)}
            >
            <Toast.Header>
               
                <strong className="me-auto">{title}</strong>
            
            </Toast.Header>
            <Toast.Body className={'text-white'}>
                {description}
            </Toast.Body>
        </Toast>

    </div>
  )
}

export default CustomToast
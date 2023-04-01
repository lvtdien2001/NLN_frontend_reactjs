import React, {useContext} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import ModalDeleteAddress from '../../Address/ModalDeleteAddress';
import ModalEditAddress from '../../Address/ModalEditAddress';
import { AuthContext } from '../../../context/AuthContext';
const DropDownAddress = ({address}) => {
  const {authState: {user}} = useContext(AuthContext)
  return (
    <DropdownButton id="dropdown-basic-button" title="Tùy chọn">
      <Dropdown.Item ><ModalEditAddress /></Dropdown.Item>
      {address._id !== user?.address?._id && <Dropdown.Item ><ModalDeleteAddress address={address} /></Dropdown.Item>}
    </DropdownButton>
  )
}

export default DropDownAddress
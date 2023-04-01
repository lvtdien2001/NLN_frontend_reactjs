import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './AddressForm.module.scss';

import { useNavigate } from "react-router-dom";
import { addressApi } from './addressApi';
import { Button, Container, Row, Col } from 'react-bootstrap';


import { MessageContext } from '../../../context/MessageContext';
import { AuthContext } from '../../../context/AuthContext';
import CustomSpinner from '../../CustomSpinner';
import CustomToast from '../../CustomToast';



const cx = classNames.bind(styles);

function AddressForm() {
  const navigate = useNavigate();
  const { setShowToast, setInforMessage, inforMessage} = useContext(MessageContext);
  const {createAddress} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(0);
  const [formData, setFormData] = useState({
    fullName:'',
    phoneNumber:'',
    description:''
  })
  const [addressData, setAddressData] = useState({
    province:'',
    district:'',
    ward:''
  })
  const addressform = {
    provinceCode: parseInt(selectedProvince),
    districtCode: parseInt(selectedDistrict),
    wardCode: parseInt(selectedWard)
  }
  const form= {...formData, ...addressform, ...addressData}
  const {fullName, phoneNumber, description} = formData
  const handleChangeData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // console.log(e.target.value)
    
  }
  
    
    useEffect(() => {
        setProvinces(addressApi)
    },[])
    
  // useEffect(() => {
  //   axios.get('https://provinces.open-api.vn/api/?depth=3')
  //     .then(response => {
  //       setProvinces(response.data);
  //     });
  // }, []);
    const handleSubmitAddress = async (e) => {
      e.preventDefault();
      if (!form.fullName || !form.phoneNumber || !form.description ) {

        setShowToast(true);
        setInforMessage({
          type: 'danger',
          description: 'Thiếu thông tin rồi !!',
          title: 'Thông báo'
        })
        return;
      }
      if (form.provinceCode === 0 || form.districtCode === 0 || form.wardCode === 0) {
        setShowToast(true);
        setInforMessage({
          type: 'warning',
          description: 'Thiếu địa chỉ rồi !!',
          title: 'Thông báo'
        })
        return;
      }
      
      const regPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (!regPhone.test(form.phoneNumber)) {
        setShowToast(true);
        setInforMessage({
          type: 'warning',
          description: 'Số điện thoại không đúng định dạng !!',
          title: 'Thông báo'
        })
        
        return;
      }
      try {
          setLoading(true);
          console.log(form);
          const res = await createAddress(form);
          console.log(res)
          if(res.success) {
            setShowToast(true);
            setInforMessage({
              type: 'success',
              description: res.message,
              title: 'Thông báo'
            })
            setTimeout(() => {
                setLoading(false);
                return navigate('/address');
            },1000)
          }
          
      } catch (error) {
        console.log(error)
      }
    }
  const handleChangeProvince = (e) => {
    setSelectedProvince(parseInt(e.target.value))
    
  }
  const handleChangeDistrict = (e) => {
    setSelectedDistrict(parseInt(e.target.value))

  }
  useEffect(() => {
    const province = provinces.find(province => province.code === selectedProvince);
    if (province) {
      setDistricts(province.districts);
      setAddressData({
        ...addressData,
        province: province?.name || ''
      })
      console.log("province.districts",province.districts);
      setSelectedDistrict(0)
      setSelectedWard(0)
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  
  useEffect(() => {
    const district = districts.find(district => district.code === selectedDistrict);
    if (district) {
      setWards(district.wards);
      setAddressData({
        ...addressData,
        district: district?.name || ''
      })
      setSelectedWard(0)
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    const ward = wards.find(ward => ward.code === selectedWard);
    if (ward) {
  
      setAddressData({
        ...addressData,
        ward: ward?.name || ''
      })
      
    }
  }, [selectedWard])

  const address = (
    <div>
      <div className={cx('form-item')}>
        <label htmlFor="province" className={cx('title-input')}>Tỉnh:</label>
        <select 
          className={cx('value-input')}  
          id="province" 
          value={selectedProvince} 
          onChange={e => handleChangeProvince(e)}
        >
          <option value="" style={{textAlign:'center'}}>----  Chọn tỉnh  ----</option>
          {provinces.map(province => (
            <option key={province.code} value={province.code}>{province.name}</option>
          ))}
        </select>
      </div>

      <div className={cx('form-item')}>
        <label htmlFor="district" className={cx('title-input')}>Huyện:</label>
        <select 
          className={cx('value-input')} 
          id="district" value={selectedDistrict} 
          onChange={e => handleChangeDistrict(e)}

        >
          <option value="" style={{textAlign:'center'}}>---  Chọn huyện  ---</option>
          {districts.map(district => (
            <option key={district.code} value={district.code}>{district.name}</option>
          ))}
        </select>
      </div>
      <div className={cx('form-item')}>
        <label htmlFor="ward" className={cx('title-input')}>Xã:</label>
        <select 
          className={cx('value-input')}
          id="ward" 
          onChange={e =>  setSelectedWard(parseInt(e.target.value))}
        >
          <option value="" style={{textAlign:'center'}}>----  Chọn xã  ----</option>
          {wards.map(ward => (
            <option key={ward.code} value={ward.code}>{ward.name}</option>
          ))}
        </select>
      </div>
  </div>
  )
  return (
    <div className={cx('layout')}>
      <CustomToast 
        type={inforMessage.type} 
        description={inforMessage.description} 
        title={inforMessage.title} 
      />
      <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={cx('layout-col')}>
                <form className={cx('layout-form')}>
                  <div className={cx('title')}>Thêm địa chỉ mới</div>
                  <div className={cx('form-item')}>
                    <label htmlFor='fullName' className={cx('title-input')}>Họ và tên :</label>
                    <input
                      className={cx('value-input')} 
                      type='text' 
                      id='fullName' 
                      name='fullName'
                      value={fullName}
                      onChange={handleChangeData}
                    />
                  </div>
                  <div className={cx('form-item')}>
                    <label htmlFor='phoneNumber' className={cx('title-input')}>Số điện thoại :</label>
                    <input 
                      className={cx('value-input')} 
                      type='text' 
                      id='phoneNumber' 
                      name='phoneNumber'
                      value={phoneNumber}
                      onChange={handleChangeData}
                    />
                  </div>
                  {address}
                  <div className={cx('form-item')}>
                    <label htmlFor='description' className={cx('title-input')}>Địa chỉ:</label>
                    <input 
                      className={cx('value-input')} 
                      type='text' 
                      id='description' 
                      name='description'
                      value={description}
                      onChange={handleChangeData}
                      placeholder='Tên đường, số nhà, khu vực, ...'
                    />
                  </div>
                 
                  {loading ? <div style={{textAlign:'center'}}><CustomSpinner /></div>  : 
                  <Button 
                    type='submit' 
                    className={cx('btn-submit')}
                    onClick={(e) => handleSubmitAddress(e)}
                  >
                      Thêm
                  </Button>}
                  
                </form>
                </Col>
            </Row>
      </Container>
     
      
    </div>
  );
}

export default AddressForm
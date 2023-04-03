import React,{useContext, useState, useEffect} from 'react'




import classNames from 'classnames/bind'
import styles from './Avatar.module.scss';
import { Button } from 'react-bootstrap';
import {AiOutlineFileImage} from 'react-icons/ai';
import { AuthContext } from '../../../context/AuthContext';
import { MessageContext } from '../../../context/MessageContext';

const cx = classNames.bind(styles);


const Avatar = () => {
    const {authState: {user}, showUpdateAvatar, setShowUpdateAvatar , updateImage} = useContext(AuthContext);
    const {setInforMessage, setShowToast} = useContext(MessageContext)

    const handleShowUpdate = () => {
        setShowUpdateAvatar(true);
    }
    
    const handleCloseUpdate = () => {
        setShowUpdateAvatar(false);
    }
    // co the xoa
    const [ avatarDefault, setAvatarDefault] = useState(); 
    const [file, setFile] = useState(null)

    const handleDeleteImage = () => {

      handleCloseUpdate();
      setFile(null);
      setAvatarDefault(null)
    }
   
    useEffect(() => {
        
      
        return () => {
            avatarDefault &&  URL.revokeObjectURL(avatarDefault.preview)
          }
    }, [avatarDefault])
     const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        file.preview = URL.createObjectURL(file);
        // console.log(file.preview)
        setAvatarDefault(file.preview);
        setFile(e.target.files[0])
    }
    const handleUpdateImage = async (e) => {
        e.preventDefault();
        setShowUpdateAvatar(false);
        try {
                const formData = new FormData();
                formData.append('image',file);
                if(!file) {
                  console.log('xu ly loi tai day');
                  setShowToast(true);
                  setInforMessage({
                    type: 'info',
                    description: 'Không có gì để cập nhật !',
                    title: 'Cập nhật ảnh đại diện'
                  })
                  
                 
                  return ;
                }
                
                const response = await updateImage(formData)
                console.log(response);
                if (response.success) {
                   console.log('ok')
                   setShowToast(true);
                   setInforMessage({
                     type: 'success',
                     description: 'Đã cập thành công !',
                     title: 'Cập nhật ảnh đại diện !'
                   })
                }
            } catch (error) {
                console.log(error)
            }
        
    }

    const btnUpdate = (
        <div className={cx('btn-update-info')}>
          <Button onClick={handleShowUpdate} variant='primary' >Chỉnh sửa hình đại diện</Button>
        </div>
    
    )
    const btnDone = (
      <div>
          <form encType='multipart/form-data'>
          <div>
            <label htmlFor='image'>
             <AiOutlineFileImage className={cx('icon-update')} />
            </label>
            <input type='file' id='image' className={cx('input-file')} name='image' onChange={handleChangeAvatar} />
          </div>
          
         
          <div className={cx('btn-update-done')}>
            <button onClick={handleDeleteImage} className={cx('btn-cancel')} >Hủy</button>
            <button onClick={handleUpdateImage} className={cx('btn-done')} type='submit' >Xong</button>
          </div>
          </form>
      </div>
    
      
    )
  return (
    <div className={cx('layout-avatar')}>
        <div className={cx('title-avatar')}>AVATAR</div>
        <div className={cx('avatar-center')}>
          <img
             className={cx('layout-image')}
             alt='avatar'
             src={avatarDefault ? avatarDefault : user.image}
          
          />
        </div>
       
       {showUpdateAvatar ? btnDone : btnUpdate }
       <div>
           
        </div>
    </div>
  
  )
}

export default Avatar
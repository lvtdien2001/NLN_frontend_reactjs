import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './AddProduct.module.scss';
import { AiFillDelete, AiOutlineFileImage } from 'react-icons/ai';

import request from '../../../utils/request';
import { ProductContext } from '../../../context/ProductContext';
import { MessageContext } from '../../../context/MessageContext';
import CustomSpinner from '../../CustomSpinner';


const cx = classNames.bind(styles);
function AddProduct() {
    const {createNewProduct} = useContext(ProductContext);
    const {setShowToast, setInforMessage} = useContext(MessageContext);
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState([]);
    const [productor, setProductor] = useState([]);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        categoryID:'',
        productorID:''
    })
    const {name, categoryID, productorID} = formData;
    const handleChangeData = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
       
        
      }
    useEffect(() => {
        const getCategory = async () => {
                await request
                        .get(`/category`)
                        .then((res) =>{
                            if (res.data.success){
                                setCategory(res.data.allCategory)
                            }
                        })
        }
        const getProductor = async () => {
            await request
                    .get(`/productor`)
                    .then((res) =>{
                        if (res.data.success){
                            setProductor(res.data.allProductor)
                        }
                    })
    }
        getCategory();
        getProductor();
    }, [])
    const [ avatarDefault, setAvatarDefault] = useState(); 
    const [file, setFile] = useState(null)
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        file.preview = URL.createObjectURL(file);
        // console.log(file.preview)
        setAvatarDefault(file.preview);
        setFile(e.target.files[0])
      }
      useEffect(() => {
          
        
          return () => {
              avatarDefault &&  URL.revokeObjectURL(avatarDefault.preview)
            }
      }, [avatarDefault])
      const handleDeleteImage = () => {
        setAvatarDefault(null);
        setFile(null)
      }

    const categoryLists = category.map((item) => (
        <option key={item._id} value={item._id}>{item.category}</option>
    ) )
    const productorLists = productor.map((item) => (
        <option key={item._id} value={item._id}>{item.name}</option>
    ) )
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit =  async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
                if (form.checkValidity() === false) {
                    
                    e.stopPropagation();
                    setValidated(true);
                    return;
                }
        try {
            const formData = new FormData();
            formData.append('image',file);
            formData.append('name',name);
            if(!file) {
                setShowToast(true);
                setInforMessage({
                  type: 'warning',
                  description: 'Không có ảnh !',
                  title: 'Hình ảnh chi tiết'
                })
                return ;
              }
              setLoading(true)
              const res = await createNewProduct(formData, categoryID, productorID);
              if(res.success) {
                setShowToast(true);
                setInforMessage({
                  type: 'success',
                  description: 'Thành công !',
                  title: 'Thêm sản phẩm'
                })
                setFormData({
                    name:'',
                    categoryID:'',
                    productorID:''
                });
                setAvatarDefault(null);
                setFile(null);
                handleClose();
                setLoading(false)
              }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm sản phẩm mới
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Tên sản phẩm:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập tên sản phẩm" 
                            autoFocus
                            name='name'
                            value={name}
                            onChange={handleChangeData} 
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" >
                        <Form.Label>Loại sản phẩm</Form.Label>
                        <Form.Select
                            name='categoryID'
                            value={categoryID}
                            onChange={handleChangeData}
                            required
                        >
                            <option value=''>Chọn loại sản phẩm</option>
                            {categoryLists}
                        </Form.Select>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Nhà cung cấp</Form.Label>
                        <Form.Select
                            name='productorID'
                            value={productorID}
                            onChange={handleChangeData}
                            required
                        >
                            <option value=''> Chọn nhà cung cấp</option>
                            {productorLists}
                        </Form.Select>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label className={cx('label-image')} >Chọn hình ảnh: <AiOutlineFileImage className={cx('image-icon')} /></Form.Label>
                        <Form.Control 
                            // className={cx('input-image')} 
                            type="file" 
                            placeholder="Nhập tên sản phẩm"
                            name='image'
                            onChange={handleChangeAvatar} 
                            required/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        
                    </Form.Group>
                    <Form.Group>
                      
                    {avatarDefault && <div>
                      <img style={{width:'200px',height:'200px'}} src={avatarDefault} alt='detail' />
                      <Button onClick={handleDeleteImage} variant='outline-danger'><AiFillDelete /></Button>
                    </div> }
                    
                    </Form.Group>
                    <Form.Group style={{textAlign:'right'}}>

                        <Button style={{marginRight: '10px'}} variant="outline-secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        {
                            loading ? <CustomSpinner /> : 
                            <Button variant="primary" type='submit'>
                                Thêm
                            </Button>
                        }
                    </Form.Group>
                </Form>
                </Modal.Body>
              
            </Modal>
        </>
    )
}

export default AddProduct

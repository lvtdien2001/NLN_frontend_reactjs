
import ProductItem from '../ProductItem';

import classNames from 'classnames/bind';
import styles from './GetAllProducts.module.scss';


const cx = classNames.bind(styles)
function GetAllProducts({listProducts}) {
   

    const renderLists = listProducts.map((product) => 
    <div key={product._id} className={`col-sm-12 col-md-6 col-lg-3 ${cx('layout')}`}>
        <ProductItem  product={product} />
    </div>
        
                  
       
     )
    return(      
        <div className='row'> 
              {renderLists}
        </div>
    ) 
       
}

export default GetAllProducts
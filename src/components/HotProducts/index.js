import classNames from 'classnames/bind';

import hotItem1 from '../../public/images/hotItem1.png';
import hotItem2 from '../../public/images/hotItem2.png';
import hotItem3 from '../../public/images/hotItem1.png';
import hotItem4 from '../../public/images/hotItem4.png';
import styles from './HotProducts.module.scss';

const cx = classNames.bind(styles);

function HotProducts() {
    return (
        <div className={`${cx('wrapper')}`}>
            <b className={cx('title')}>SẢN PHẨM NỔI BẬT</b>
            <div as='div' className='row justify-content-around'>
                <div as='div' className={`${cx('items')} col-sm-5 col-xl-2`} >
                    <img src={hotItem1} alt='img' width='230px' height='200px' />
                </div>
                <div as='div' className={`${cx('items')} col-sm-5 col-xl-2`} >
                    <img src={hotItem2} alt='img' width='230px' height='200px' />
                </div>
                <div as='div' className={`${cx('items')} col-sm-5 col-xl-2`} >
                    <img src={hotItem3} alt='img' width='230px' height='200px' />
                </div>
                <div as='div' className={`${cx('items')} col-sm-5 col-xl-2`} >
                    <img src={hotItem4} alt='img' width='230px' height='200px' />
                </div>
            </div>
        </div>
    )
}

export default HotProducts

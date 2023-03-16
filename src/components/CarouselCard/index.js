import { Carousel } from 'react-bootstrap';
import item1 from '../../public/images/item1.png';
import item2 from '../../public/images/item2.png';
import item3 from '../../public/images/item3.png';
import item4 from '../../public/images/item4.png';
import item5 from '../../public/images/item5.png';
import item6 from '../../public/images/item6.png';

function CarouselCard() {
    return (
        <Carousel variant='dark' indicators={false}>
            <Carousel.Item>
                <div className='row'>
                    <div className='col-sm-6'>
                        <img
                        className="d-block w-100"
                        src={item1}
                        alt="First slide"
                        />
                    </div>
                    <div className='col-sm-6'>
                        <img
                        className="d-block w-100"
                        src={item2}
                        alt="First slide"
                        />
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='row'>
                    <div className='col-sm-6'>
                        <img
                        className="d-block w-100"
                        src={item3}
                        alt="First slide"
                        />
                    </div>
                    <div className='col-sm-6'>
                        <img
                        className="d-block w-100"
                        src={item4}
                        alt="First slide"
                        />
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='row'>
                    <div className='col-sm-6'>
                        <img
                        className="d-block w-100"
                        src={item5}
                        alt="First slide"
                        />
                    </div>
                    <div className='col-sm-6'>
                        <img
                        className="d-block w-100"
                        src={item6}
                        alt="First slide"
                        />
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselCard

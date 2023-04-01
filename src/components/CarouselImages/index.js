import Carousel from 'react-bootstrap/Carousel';

function CarouselImages({images}) {
 
  console.log(images)
  const body = (
    <Carousel variant="dark">
        {images.map((item) => (
        
        
             <Carousel.Item key={item?._id}>
                <img
                    style={{minHeight: "330px", maxHeight:"330px"}}
                    className="d-block w-100"
                    src={item?.image}
                    alt="First slide"
                />
            </Carousel.Item>
           
       
            
        ))}
  </Carousel>
   
  )
  
  return (
    <>
        {body}
        
    </>
    
  );
}

export default CarouselImages
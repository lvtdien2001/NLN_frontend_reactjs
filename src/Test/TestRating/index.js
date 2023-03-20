import React, { useState } from 'react'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
const TestRating = () => {
    const [rated, setRated] = useState(0);
    const handleRate = (id) => {
        setRated(id)
    }
    const rates = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
    ]
    const rateLists = rates.map((rate) =>(
        <div  key={rate.id} onClick={() => handleRate(rate.id)}>
           { rate.id <= rated ? <AiFillStar /> :<AiOutlineStar />}
        </div>
    ))
  return (
    <div className='d-flex'>{rateLists}</div>
  )
}

export default TestRating
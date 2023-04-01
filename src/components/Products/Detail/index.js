import React from 'react'

const Detail = ({detail}) => {
    
    const prices = detail.map(price => price.price)
    const uniquePrice = new Set(prices);

    const backToArray = [...uniquePrice];
    const listPrices = backToArray.map((item) => <div>
        {item}
    </div>)

const colors = detail.map(color => color.color)
const uniqueColor = new Set(colors);

const backToColor = [...uniqueColor];
const listColors = backToColor.map((item) => <div>
    {item}
</div>)
  return (
    <div>
        {listPrices}
        {listColors}
    </div>
  )
}

export default Detail

import ProductItem from '../ProductItem';

function GetAllProducts() {
    const listProducts = [
        {
            id: 1,
            name: 'San pham 1',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 2,
            name: 'San pham 2',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 3,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 4,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 5,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 6,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 7,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 8,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 9,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
        {
            id: 10,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },{
            id: 11,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },{
            id: 12,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },{
            id: 13,
            name: 'San pham 3',
            images: [
                {
                    id: 1,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg"
                },
                {
                    id: 2,
                    image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/263714/oppo-reno8-5g-den-thumb-600x600.jpg",
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
    ]

    const renderLists = listProducts.map((product) => 
        <ProductItem key={product.id} product={product} />
                  
       
     )
    return(      
        <div className='row'> 
              {renderLists}
        </div>
    ) 
       
}

export default GetAllProducts
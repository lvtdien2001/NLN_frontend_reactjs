
import hinh from '../../assets/images/hinh1.jpg';
import GetAllProducts from "../../components/Products/GetAllProducts";

function Search() {

    const searchProducts = [
        {
            id: 1,
            name: 'San pham 1',
            images: [
                {
                    id: 1,
                    image: hinh
                },
                {
                    id: 2,
                    image: hinh,
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
                    image: hinh
                },
                {
                    id: 2,
                    image: hinh,
                },
            ],
            price: 500,
            description: 'abc xyz',
            quantity: 100
        },
    ]
    return(
        <div>
            <GetAllProducts listProducts={searchProducts} />
        </div>
    )
}

export default Search
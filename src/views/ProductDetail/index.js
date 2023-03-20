import { useParams } from "react-router-dom"
function ProductDetail() {
    const {id} = useParams();
    return (
        <div>
            Id cua san pham la {id}
        </div>
    )
}

export default ProductDetail
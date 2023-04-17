import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div>
            <h2>404 Not Found</h2>
            Oops, không thể tìm thấy trang. Trở về <Link to='/'>trang chủ</Link>
        </div>
    )
}

export default NotFound

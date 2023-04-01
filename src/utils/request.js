import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME } from "../context/constanst";

const request = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {'Authorization': `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`}
})

export default request

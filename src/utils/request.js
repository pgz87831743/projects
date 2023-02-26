import axios from "axios";
const http = axios.create({
    baseURL: 'http://localhost:9001/'
})
export default http;

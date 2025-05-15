import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
});

export default AxiosInstance;
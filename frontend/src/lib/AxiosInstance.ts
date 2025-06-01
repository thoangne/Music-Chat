import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
});

export default AxiosInstance;
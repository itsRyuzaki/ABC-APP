import axios from "axios";
import { BASE_PATH } from "../config/endpoints";

const axiosInstance = axios.create({
  baseURL: BASE_PATH,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

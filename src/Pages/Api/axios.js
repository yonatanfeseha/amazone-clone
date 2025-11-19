import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: " http://localhost:3000",
  baseURL: " https://amazone-api-r7t4.onrender.com/",
});
export { axiosInstance };

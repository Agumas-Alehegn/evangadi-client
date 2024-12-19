import axios from "axios";
const axiosBase = axios.create({
  baseURL: "http://localhost:2323/api",
});
export default axiosBase;

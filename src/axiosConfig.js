import axios from "axios";
const axiosBase = axios.create({
  baseURL: "https://evangadi-api-1.onrender.com/api",
});
export default axiosBase;

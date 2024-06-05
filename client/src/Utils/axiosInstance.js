import axios from "axios";

const PRO_BASE_URL = "https://devskillz.onrender.com/api/v1";

const DEV_BASE_URL = "http://localhost:3098/api/v1";

const axiosInstance = axios.create({
  baseURL: PRO_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;

import axios from "axios";
import env from "@/config/env";

const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

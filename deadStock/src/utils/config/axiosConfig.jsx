import axios from "axios";

const hostname = window.location.hostname;

let BASE_DOMAIN;

if (hostname === "localhost" || hostname === "127.0.0.1") {
  BASE_DOMAIN = "http://localhost:8000";
} else if (hostname === "mcvtc.org.np" || hostname === "www.mcvtc.org.np") {
  BASE_DOMAIN = "https://mcvtc.org.np";
} else {
  BASE_DOMAIN = "https://mcvtc.org.np"; // fallback
}

const BASE_API_URL = BASE_DOMAIN;

const apiClient = axios.create({
  baseURL: `${BASE_API_URL}/mcvtcapi`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    config.baseURL = `${BASE_API_URL}/mcvtcapi`;

    const token = localStorage.getItem("login_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { BASE_API_URL };
export default apiClient;
import axios from "axios";
import {getToken, removeToken} from "../../utilities/token";
import {toast} from "react-toastify";
import {API_BASE_URL} from "../endpoints";
import {getTenant} from "../../utilities/tenant";


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        'X-domain': getTenant()
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            removeToken();
            toast.error("Session expired. Please log in again.");
            // Redirect to login page
            // As you are using `useNavigate` in a functional component, we can't directly use it here.
            // Instead, we can use window.location to force a redirect.
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

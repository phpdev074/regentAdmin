import axios from "axios";
import { ShowToast } from "../helpers/ToastService";

// Create Axios instances
export const apiClient = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const apiClientUpload = axios.create({
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

// Request interceptor for common API client
apiClient.interceptors.request.use(
    (config) => {
      
        const token = localStorage.getItem('token'); 
        const isNetworkConnected = navigator.onLine;  // Check if the user is online

        // console.log(token,'==>token')

        // Handle no network connectivity
        if (!isNetworkConnected) {
            ShowToast("Please check your internet connection.");
            return Promise.reject(new Error("No network connection"));
        }

        if (token) {
            config.headers["Authorization"] = `${token}`;
        }

        return config;
    },
    (error) => {
        ShowToast("Request error: Please try again.");
        return Promise.reject(error);
    }
);

// Response interceptor for common API client
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { response } = error;

        if (response) {
            const errorMessage = response.data.message || "An error occurred";
            ShowToast(errorMessage);
        } else {
            ShowToast("Network error. Please try again.");
        }

        return Promise.reject(error);
    }
);

// Request interceptor for upload API client
apiClientUpload.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers["Authorization"] = `${token}`;
        }
        return config;
    },
    (error) => {
        ShowToast("Upload error: Please try again.");
        return Promise.reject(error);
    }
);

// Response interceptor for upload API client
apiClientUpload.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { response } = error;

        if (response) {
            const errorMessage = response.data.message || "An error occurred during upload";
            ShowToast(errorMessage);
        } else {
            ShowToast("Network error during upload. Please try again.");
        }

        return Promise.reject(error);
    }
);

// Check for network connection and speed
export const NetWorkCheckInit = () => {
    const isNetworkConnected = navigator.onLine;  // Check if the user is online
    let networkSpeed = "not supported";

    if (isNetworkConnected) {
        // Optionally, check network speed here
        networkSpeed = navigator.connection ? navigator.connection.downlink : "not supported";
    }

    // Listen for network state changes (if using browser)
    window.addEventListener('offline', () => {
        ShowToast("You are offline. Please check your internet connection.");
    });

    window.addEventListener('online', () => {
        ShowToast("You are online. Your connection is restored.");
    });

    return { isNetworkConnected, networkSpeed };
};


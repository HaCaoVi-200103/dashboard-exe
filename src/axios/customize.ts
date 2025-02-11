import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    withCredentials: true
})

// Add a request interceptor
instance.interceptors.request.use(async function (config) {
    // Do something before request is sent
    //  config.headers["delay"] = 3000 
    const token = Cookies.get("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response) return response
    return response;
}, function (error) {
    if (error?.response) return error?.response;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;
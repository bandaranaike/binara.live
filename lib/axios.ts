import axios from 'axios';

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    withCredentials: true,
    headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_BINARA_API_KEY,
        'Content-Type': 'application/json',
        'Referer': "http://localhost:3001"
    },
});

export default axiosInstance;

// import axios from 'axios';
//
// const api = axios.create({
//     baseURL: 'http://localhost:8000/api',
//     withCredentials: true,
// });
//
// // ⬇️ Add this interceptor to attach JWT from localStorage
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token'); // make sure it's saved as 'token'
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
//
// export default api;
import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`, // 👈 uses the .env value
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

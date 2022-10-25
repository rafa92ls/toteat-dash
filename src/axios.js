import axios from 'axios'
import router from './router/index'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('Token')}`

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        router.push('/')
    }
    return Promise.reject(error);
});

export default axios
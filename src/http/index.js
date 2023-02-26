import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://47.115.53.1:8090',
    baseURL: '',
    timeout: 3000,
    headers: { 
        'Content-Type': 'application/json',
        vary: 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
    }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('user_token')
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    const { data } = response
    if (data.code != '200') {
        return Promise.reject(data)
    }

    return data;
}, function (error) {
    return Promise.reject(error);
});

window.$http = instance

export default instance

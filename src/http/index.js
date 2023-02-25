import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://47.115.53.1:8090',
    baseURL: '/api',
    timeout: 1000,
    headers: { 
        'Content-Type': 'application/json',
        vary: 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
    }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


window.$http = instance

export default instance

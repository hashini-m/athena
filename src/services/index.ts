import axios from 'axios';
import {APP_CONFIGS} from "../utilities/constants";
import {exceptionHandler} from "../core/index"

axios.defaults.baseURL = APP_CONFIGS.API_BASE;

// Request interceptor to manage authorization & headers
axios.interceptors.request.use(async (request) => {
    console.log('Req interceptor Triggered', request)
    return request;
}, (error) => {
    console.log('Req interceptor Error', error)
})

// Response interceptor to manage responses & errors
axios.interceptors.response.use(async (response) => {
    console.log('response interceptor Triggered', response)
    return response;
}, async (error) => {
    return Promise.reject(await exceptionHandler(error.response));
});

export * from "./user.service"
